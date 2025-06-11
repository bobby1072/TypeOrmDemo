import { FindOptionsRelations, In, Repository } from "typeorm";
import BaseRuntimeModel from "../../models/BaseRuntimeModel";
import BaseEntity from "../entities/BaseEntity";

export default abstract class BaseRepository<
  TRuntime extends BaseRuntimeModel,
  TEntity extends BaseEntity<TRuntime>
> {
  protected readonly _repo: Repository<TEntity>;
  constructor(repo: Repository<TEntity>) {
    this._repo = repo;
    return this;
  }
  protected abstract RuntimeToEntity(ent: TRuntime): TEntity;

  public async GetOneAsync<TPropertyType>(
    val: TPropertyType,
    propertyName: keyof TEntity,
    relations?: FindOptionsRelations<TEntity>
  ): Promise<TRuntime | undefined | null> {
    return (
      await this._repo.findOne({
        where: {
          [propertyName]: In(val as any),
        } as any,
        relations,
      })
    )?.ToRuntimeType();
  }
  public async GetManyAsync<TPropertyType>(
    val: TPropertyType,
    propertyName: keyof TEntity,
    relations?: FindOptionsRelations<TEntity>
  ): Promise<TRuntime[]> {
    return (
      (
        await this._repo.find({
          where: {
            [propertyName]: In(val as any),
          } as any,
          relations,
        })
      )?.map((x) => x.ToRuntimeType()) || []
    );
  }

  public GetAllAsync(): Promise<TRuntime[]> {
    return this._repo
      .createQueryBuilder()
      .getMany()
      .then((x) => x.map((y) => y.ToRuntimeType() as any));
  }

  public CountAsync(): Promise<number> {
    return this._repo.createQueryBuilder().getCount();
  }

  public async SaveAsync(run: TRuntime): Promise<TRuntime | null | undefined> {
    const ent = this.RuntimeToEntity(run);

    return (await this._repo.save(ent))?.ToRuntimeType();
  }

  public async DeleteAsync(
    run: TRuntime
  ): Promise<TRuntime | null | undefined> {
    const ent = this.RuntimeToEntity(run);

    return (await this._repo.remove(ent))?.ToRuntimeType();
  }
}

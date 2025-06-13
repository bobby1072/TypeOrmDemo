import { AnyZodObject } from "zod";

export default abstract class BaseRuntimeModel {
  protected abstract readonly _schema: AnyZodObject;
  public Validate(): boolean {
    return this._schema.safeParse(this).success;
  }

  public Serialise(): string {
    return JSON.stringify({ ...this, _schema: undefined });
  }
}

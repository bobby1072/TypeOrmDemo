import { readdirSync } from "fs";
import { SqlReader } from "node-sql-reader";
import path from "path";
import { EntityManager, QueryFailedError } from "typeorm";

export default class MigrationService {
  private readonly _entityManager: EntityManager;
  constructor(entManager: EntityManager) {
    this._entityManager = entManager;
    return this;
  }
  public async RunMigrationsAsync() {
    const migrationsDir = path.join(__dirname, "../persistence/sql");
    const files = readdirSync(migrationsDir)
      .filter((file) => /^V\d+__.*\.sql$/.test(file))
      .sort((a, b) => {
        const getCount = (name: string) =>
          parseInt(name.match(/^V(\d+)__/)!.at(1)!, 10);
        return getCount(a) - getCount(b);
      });

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      try {
        const queries = SqlReader.readSqlFile(filePath);
        for (const query of queries) {
          try {
            await this._entityManager.query(query);
          } catch (e) {
            if (e instanceof QueryFailedError) {
              //You can ignore duplicate errors as no tracking on what have already been added
              console.error(`Query error in ${file}:`, e.message);
            } else {
              console.error(`Unexpected error in ${file}:`, e);
            }
          }
        }
      } catch (e) {
        console.error(`Failed to read file ${file}:`, e);
      }
    }

    return true;
  }
}

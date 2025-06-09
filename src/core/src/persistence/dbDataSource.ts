import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import StudentEntity from "./entities/StudentEntity";

export const dbPublicContextSource = new DataSource({
  type: "postgres",
  database: "fs",
  synchronize: process.env.NODE_ENV === "development",
  schema: "public",
  username: process.env.MAINDBUSER || "postgres",
  password: process.env.MAINDBPASSWORD || "postgres",
  ssl: false,
  port: Number(process.env.POSTGRESPORT) || 5560,
  host: process.env.POSTGRESHOST || "localhost",
  entities: [StudentEntity],
  namingStrategy: new SnakeNamingStrategy(),
});

import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const dbPublicContextSource = new DataSource({
  type: "postgres",
  database: "fs",
  synchronize: true,
  schema: "public",
  username: process.env.MAINDBUSER ?? "postgres",
  password: process.env.MAINDBPASSWORD ?? "postgres",
  ssl: false,
  port: Number(process.env.POSTGRESPORT) || 5560,
  host: process.env.POSTGRESHOST ?? "localhost",
  namingStrategy: new SnakeNamingStrategy(),
});

import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import StudentEntity from "./entities/StudentEntity";
import ClassroomEntity from "./entities/ClassroomEntity";
import ClassroomMemberEntity from "./entities/ClassroomMemberEntity";

export const dbPublicContextSource = new DataSource({
  type: "postgres",
  database: "type_orm_demo",
  synchronize: process.env.NODE_ENV === "development",
  schema: "public",
  username: process.env.MAINDBUSER || "postgres",
  password: process.env.MAINDBPASSWORD || "postgres",
  ssl: false,
  port: Number(process.env.POSTGRESPORT) || 5560,
  host: process.env.POSTGRESHOST || "localhost",
  entities: [StudentEntity, ClassroomEntity, ClassroomMemberEntity],
  namingStrategy: new SnakeNamingStrategy(),
});

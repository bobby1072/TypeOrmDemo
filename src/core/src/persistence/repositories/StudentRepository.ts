import Student from "../../models/Student";
import StudentEntity from "../entities/StudentEntity";
import BaseRepository from "./BaseRepository";

export default class StudentRepository extends BaseRepository<
  Student,
  StudentEntity
> {
  protected override RuntimeToEntity(runtime: Student): StudentEntity {
    const ent = new StudentEntity();
    ent.id = runtime.id.ToString();
    ent.name = runtime.name;
    ent.email = runtime.email;
    ent.age = runtime.age;
    ent.dateCreated = runtime.dateCreated;
    ent.dateModified = runtime.dateModified;

    return ent;
  }
}

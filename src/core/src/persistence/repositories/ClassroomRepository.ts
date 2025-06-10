import { Classroom } from "../../models/Classroom";
import ClassroomEntity from "../entities/ClassroomEntity";
import BaseRepository from "./BaseRepository";

export default class ClassroomRepository extends BaseRepository<
  Classroom,
  ClassroomEntity
> {
  protected override RuntimeToEntity(runtime: Classroom): ClassroomEntity {
    const ent = new ClassroomEntity();
    ent.id = runtime.id.ToString();
    ent.name = runtime.name;
    ent.keyStage = runtime.keyStage;
    ent.subject = runtime.subject;

    return ent;
  }
}

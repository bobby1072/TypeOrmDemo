import ClassroomMember from "../../models/ClassroomMember";
import ClassroomMemberEntity from "../entities/ClassroomMemberEntity";
import BaseRepository from "./BaseRepository";

export default class ClassroomMemberRepository extends BaseRepository<
  ClassroomMember,
  ClassroomMemberEntity
> {
  protected override RuntimeToEntity(
    runtime: ClassroomMember
  ): ClassroomMemberEntity {
    const ent = new ClassroomMemberEntity();
    if (runtime.id) {
      ent.id = runtime.id;
    }
    ent.classroomId = runtime.classroomId.toString();
    ent.studentId = runtime.studentId.toString();

    return ent;
  }
}

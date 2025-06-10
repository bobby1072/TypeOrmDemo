import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import ClassroomMember from "../../models/ClassroomMember";
import BaseEntity from "./BaseEntity";
import Guid from "../../Utils/Guid";
import ClassroomEntity from "./ClassroomEntity";
import StudentEntity from "./StudentEntity";

@Entity({ name: "classroom_member" })
export default class ClassroomMemberEntity extends BaseEntity<ClassroomMember> {
  @PrimaryGeneratedColumn({ type: "bigint" })
  public id!: number;
  @Column({ type: "uuid" })
  public classroomId!: string;
  @ManyToOne(() => ClassroomEntity, (cl) => cl.classMembers)
  public classroom?: ClassroomEntity | null;

  @Column({ type: "uuid" })
  public studentId!: string;
  @OneToOne(() => StudentEntity)
  public student?: StudentEntity | null;

  public override ToRuntimeType(): ClassroomMember {
    return new ClassroomMember(
      this.id,
      Guid.Parse(this.studentId),
      Guid.Parse(this.classroomId),
      this.student?.ToRuntimeType()
    );
  }
}

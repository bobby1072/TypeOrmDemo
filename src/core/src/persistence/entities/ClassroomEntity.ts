import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import {
  Classroom,
  ClassroomKeyStageEnum,
  ClassroomSubjectEnum,
} from "../../models/Classroom";
import BaseEntity from "./BaseEntity";
import Guid from "../../utils/Guid";
import ClassroomMemberEntity from "./ClassroomMemberEntity";

@Entity({ name: "classroom" })
export default class ClassroomEntity extends BaseEntity<Classroom> {
  @PrimaryColumn({ type: "uuid" })
  public id!: string;
  @Column({ type: "text" })
  public name!: string;
  @Column({ type: "text" })
  public keyStage!: string;
  @Column({ type: "text" })
  public subject!: string;

  @OneToMany(() => ClassroomMemberEntity, (mem) => mem.classroom)
  public classMembers?: ClassroomMemberEntity[] | null;

  public override ToRuntimeType(): Classroom {
    return new Classroom(
      Guid.Parse(this.id),
      this.name,
      ClassroomKeyStageEnum[
        this.keyStage as keyof typeof ClassroomKeyStageEnum
      ],
      ClassroomSubjectEnum[this.subject as keyof typeof ClassroomSubjectEnum],
      this.classMembers?.map((x) => x.ToRuntimeType())
    );
  }
}

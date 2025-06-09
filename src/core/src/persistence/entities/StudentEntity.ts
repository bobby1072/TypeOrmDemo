import { Column, Entity, PrimaryColumn } from "typeorm";
import Student from "../../models/Student";
import BaseEntity from "./BaseEntity";
import Guid from "../../Utils/Guid";

@Entity({ name: "student" })
export default class StudentEntity extends BaseEntity<Student> {
  @PrimaryColumn({ type: "uuid" })
  public id!: string;
  @Column({ type: "text" })
  public email!: string;
  @Column({ type: "name" })
  public name!: string;
  @Column({ type: "integer" })
  public age!: number;
  @Column({ type: "timestamp without time zone" })
  public dateCreated!: Date;
  @Column({ type: "timestamp without time zone" })
  public dateModified!: Date;

  public override ToRuntimeType(): Student {
    return new Student(
      Guid.Parse(this.id),
      this.email,
      this.name,
      this.age,
      this.dateCreated,
      this.dateModified
    );
  }
}

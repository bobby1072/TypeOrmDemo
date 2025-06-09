import { z } from "zod";
import { ZodGuid } from "../Utils/ZodGuid";
import BaseRuntimeModel from "./BaseRuntimeModel";
import Guid from "../Utils/Guid";
import Student from "./Student";

const classroomMemberSchema = z.object({
  id: z.number().int(),
  classroomId: ZodGuid(),
  studentId: ZodGuid(),
});

export type ClassroomMemberType = z.infer<typeof classroomMemberSchema>;

export default class ClassroomMember
  extends BaseRuntimeModel
  implements ClassroomMemberType
{
  protected override readonly _schema: z.AnyZodObject = classroomMemberSchema;

  public id: number;
  public studentId: Guid;
  public classroomId: Guid;
  public student?: Student | null;
  public constructor(
    id: number,
    studentId: Guid,
    classroomId: Guid,
    student?: Student | null
  ) {
    super();
    this.id = id;
    this.studentId = studentId;
    this.classroomId = classroomId;
  }
}

import { z } from "zod";
import { ZodGuid } from "../Utils/ZodGuid";
import BaseRuntimeModel from "./BaseRuntimeModel";
import Guid from "../Utils/Guid";
import Student from "./Student";

export const classroomMemberCreateInputSchema = z.object({
  classroomId: ZodGuid(),
  studentId: ZodGuid(),
});

const classroomMemberSchema = classroomMemberCreateInputSchema.extend({
  id: z.number().int().optional().nullable(),
});

export type ClassroomMemberType = z.infer<typeof classroomMemberSchema>;

export default class ClassroomMember
  extends BaseRuntimeModel
  implements ClassroomMemberType
{
  protected override readonly _schema: z.AnyZodObject = classroomMemberSchema;

  public id?: number | null;
  public studentId: Guid;
  public classroomId: Guid;
  public student?: Student | null;
  public constructor(
    id: number | null | undefined,
    studentId: Guid,
    classroomId: Guid,
    student?: Student | null
  ) {
    super();
    this.id = id;
    this.studentId = studentId;
    this.classroomId = classroomId;
    this.student = student;
  }
}

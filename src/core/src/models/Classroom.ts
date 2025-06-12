import { AnyZodObject, z } from "zod";
import { ZodGuid } from "../Utils/ZodGuid";
import BaseRuntimeModel from "./BaseRuntimeModel";
import Guid from "../Utils/Guid";
import ClassroomMember from "./ClassroomMember";

export enum ClassroomKeyStageEnum {
  KS1 = "KS1",
  KS2 = "KS2",
  KS3 = "KS3",
  KS4 = "KS4",
}

export enum ClassroomSubjectEnum {
  English = "ENGLISH",
  Maths = "MATHS",
  Science = "SCIENCE",
  Geography = "GEOGRAPHY",
}

export const classRoomCreateInputSchema = z.object({
  name: z.string(),
  keyStage: z.nativeEnum(ClassroomKeyStageEnum),
  subject: z.nativeEnum(ClassroomSubjectEnum),
});

export type ClassRoomCreateInputType = z.infer<
  typeof classRoomCreateInputSchema
>;

const classroomSchema = classRoomCreateInputSchema.extend({
  id: ZodGuid(),
});

export type ClassroomType = z.infer<typeof classroomSchema>;

export class Classroom extends BaseRuntimeModel implements ClassroomType {
  protected override readonly _schema: AnyZodObject = classroomSchema;

  public id: Guid;
  public name: string;
  public keyStage: ClassroomKeyStageEnum;
  public subject: ClassroomSubjectEnum;
  public classMembers?: ClassroomMember[] | null;

  public constructor(
    id: Guid,
    name: string,
    keyStage: ClassroomKeyStageEnum,
    subject: ClassroomSubjectEnum,
    classMembers?: ClassroomMember[] | null
  ) {
    super();
    this.id = id;
    this.name = name;
    this.keyStage = keyStage;
    this.subject = subject;
    this.classMembers = classMembers;
  }
}

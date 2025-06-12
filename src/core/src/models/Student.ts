import { AnyZodObject, z } from "zod";
import BaseRuntimeModel from "./BaseRuntimeModel";
import { ZodGuid } from "../utils/ZodGuid";
import Guid from "../utils/Guid";

export const registerStudentInputSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  age: z.number().int(),
});

export type RegisterStudentInputType = z.infer<
  typeof registerStudentInputSchema
>;

export const updateStudentInputSchema = registerStudentInputSchema.extend({
  id: ZodGuid(),
  email: z.string().email(),
  name: z.string(),
  age: z.number().int(),
});

export type UpdateStudentInputType = z.infer<typeof updateStudentInputSchema>;

export const studentSchema = updateStudentInputSchema.extend({
  dateCreated: z.date(),
  dateModified: z.date(),
});

export type StudentType = z.infer<typeof studentSchema>;

export default class Student extends BaseRuntimeModel implements StudentType {
  protected override readonly _schema: AnyZodObject = studentSchema;

  public id: Guid;
  public email: string;
  public name: string;
  public age: number;
  public dateCreated: Date;
  public dateModified: Date;

  public constructor(
    id: Guid,
    email: string,
    name: string,
    age: number,
    dateCreated: Date,
    dateModified: Date
  ) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.age = age;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
  }
}

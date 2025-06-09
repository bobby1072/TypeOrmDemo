import { AnyZodObject, z, ZodAny } from "zod";
import BaseRuntimeModel from "./BaseRuntimeModel";
import { ZodGuid } from "../Utils/ZodGuid";
import Guid from "../Utils/Guid";

const studentSchema = z.object({
  id: ZodGuid(),
  email: z.string().email(),
  name: z.string(),
  age: z.number().int(),
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
    date_created: Date,
    date_modified: Date
  ) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.age = age;
    this.dateCreated = date_created;
    this.dateModified = date_modified;
  }
}

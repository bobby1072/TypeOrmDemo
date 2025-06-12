import { Application } from "express";
import BaseController from "./BaseController";
import StudentRepository from "../../persistence/repositories/StudentRepository";
import Student, {
  registerStudentInputSchema,
  updateStudentInputSchema,
} from "../../models/Student";
import { Outcome, OutcomeBase } from "../../models/Outcome";
import Guid from "../../Utils/Guid";

export default class StudentController extends BaseController {
  private readonly _studentRepository: StudentRepository;

  public constructor(app: Application, studentRepo: StudentRepository) {
    super(app);
    this._studentRepository = studentRepo;
  }
  private RegisterStudent() {
    return this._application.post(
      `/api/${Student.name}/Register`,
      async (req, resp) => {
        try {
          const parsedInput = registerStudentInputSchema.safeParse(req.body);

          if (!parsedInput.success || !parsedInput.data) {
            resp.status(400).send({
              isSuccess: false,
              exceptionMessage: "Invalid input",
            } as OutcomeBase);

            return;
          }
          const rightNow = new Date();
          const registeredUser = await this._studentRepository.SaveAsync(
            new Student(
              Guid.NewGuid(),
              parsedInput.data!.email,
              parsedInput.data!.name,
              parsedInput.data!.age,
              rightNow,
              rightNow
            )
          );

          resp.status(200).send({
            data: registeredUser,
          } as Outcome<Student>);
        } catch (e) {
          resp.status(500).send({
            isSuccess: false,
            exceptionMessage: "Failed to register user",
          } as OutcomeBase);
        }
      }
    );
  }
  private UpdateStudent() {
    return this._application.post(
      `/api/${Student.name}/Update`,
      async (req, resp) => {
        try {
          const parsedInput = updateStudentInputSchema.safeParse(req.body);

          if (!parsedInput.success || !parsedInput.data) {
            resp.status(400).send({
              isSuccess: false,
              exceptionMessage: "Invalid input",
            } as OutcomeBase);

            return;
          }
          const foundStudent = await this._studentRepository.GetOneAsync({
            id: parsedInput.data.id.toString(),
          });

          if (!foundStudent) {
            resp.status(400).send({
              isSuccess: false,
              exceptionMessage: "Invalid input",
            } as OutcomeBase);

            return;
          }

          const rightNow = new Date();
          const updatedUser = await this._studentRepository.SaveAsync(
            new Student(
              parsedInput.data!.id,
              parsedInput.data!.email,
              parsedInput.data!.name,
              parsedInput.data!.age,
              foundStudent.dateCreated,
              rightNow
            )
          );

          resp.status(200).send({
            data: updatedUser,
          } as Outcome<Student>);
        } catch (e) {
          resp.status(500).send({
            isSuccess: false,
            exceptionMessage: "Failed to update user",
          } as OutcomeBase);
        }
      }
    );
  }

  private DeleteStudent() {
    return this._application.post(
      `/api/${Student.name}/Delete`,
      async (req, resp) => {
        try {
          const parsedInput = Guid.TryParse(req.body?.id);

          if (!parsedInput) {
            resp.status(400).send({
              isSuccess: false,
              exceptionMessage: "Invalid input",
            } as OutcomeBase);

            return;
          }
          const foundStudent = await this._studentRepository.GetOneAsync({
            id: parsedInput.toString(),
          });

          if (!foundStudent) {
            resp.status(400).send({
              isSuccess: false,
              exceptionMessage: "Invalid input",
            } as OutcomeBase);

            return;
          }
          const deletedStudent = await this._studentRepository.DeleteAsync(
            foundStudent
          );
          resp.status(200).send({
            data: deletedStudent?.id.toString(),
          } as Outcome<string>);
        } catch (e) {
          resp.status(500).send({
            isSuccess: false,
            exceptionMessage: "Failed to update user",
          } as OutcomeBase);
        }
      }
    );
  }
  public override InvokeRoutes(): void {
    this.RegisterStudent();
    this.UpdateStudent();
    this.DeleteStudent();
  }
}

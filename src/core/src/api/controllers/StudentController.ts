import { Application } from "express";
import BaseController from "./BaseController";
import StudentRepository from "../../persistence/repositories/StudentRepository";
import Student, {
  studentInputSchema,
  StudentInputType,
  StudentType,
} from "../../models/Student";
import { OutcomeBase } from "../../models/Outcome";
import Guid from "../../Utils/Guid";
import { ReturningResultsEntityUpdator } from "typeorm/query-builder/ReturningResultsEntityUpdator.js";

export default class StudentController extends BaseController {
  private readonly _studentRepository: StudentRepository;

  public constructor(app: Application, studentRepo: StudentRepository) {
    super(app);
    this._studentRepository = studentRepo;
  }
  private RegisterUser() {
    return this._application.post(
      `/api/${Student.name}/Register`,
      async (req, resp) => {
        try {
          const parsedInput = studentInputSchema.safeParse(req.body);

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
        } catch (e) {}
      }
    );
  }

  public override InvokeRoutes(): void {
    this.RegisterUser();
  }
}

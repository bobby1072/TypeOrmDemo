import { Application } from "express";
import ClassroomMemberRepository from "../../persistence/repositories/ClassroomMemberRepository";
import ClassroomRepository from "../../persistence/repositories/ClassroomRepository";
import StudentRepository from "../../persistence/repositories/StudentRepository";
import BaseController from "./BaseController";
import { Classroom, classRoomCreateInputSchema } from "../../models/Classroom";
import { Outcome, OutcomeBase } from "../../models/Outcome";
import Guid from "../../Utils/Guid";
import ClassroomMember, {
  classroomMemberCreateInputSchema,
} from "../../models/ClassroomMember";

export default class ClassroomController extends BaseController {
  private readonly _studentRepository: StudentRepository;
  private readonly _classroomRepository: ClassroomRepository;
  private readonly _classroomMembersRepository: ClassroomMemberRepository;

  public constructor(
    app: Application,
    studentRepo: StudentRepository,
    classroomRepository: ClassroomRepository,
    classroomMembersRepository: ClassroomMemberRepository
  ) {
    super(app);
    this._studentRepository = studentRepo;
    this._classroomRepository = classroomRepository;
    this._classroomMembersRepository = classroomMembersRepository;
  }
  private CreateClassroom() {
    return this._application.post(
      `/api/${Classroom.name}/Create`,
      async (req, resp) => {
        try {
          const parsedInput = classRoomCreateInputSchema.safeParse(req.body);

          if (!parsedInput.success || !parsedInput.data) {
            resp.status(400).send({
              isSuccess: false,
              exceptionMessage: "Invalid input",
            } as OutcomeBase);

            return;
          }
          const registeredClass = await this._classroomRepository.SaveAsync(
            new Classroom(
              Guid.NewGuid(),
              parsedInput.data!.name,
              parsedInput.data!.keyStage,
              parsedInput.data!.subject
            )
          );

          resp.status(200).send({
            data: registeredClass,
          } as Outcome<Classroom>);
        } catch (e) {
          resp.status(500).send({
            isSuccess: false,
            exceptionMessage: "Failed to register user",
          } as OutcomeBase);
        }
      }
    );
  }
  private DeleteClassroom() {
    return this._application.post(
      `/api/${Classroom.name}/Delete`,
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
          const foundClass = await this._classroomRepository.GetOneAsync({
            id: parsedInput.toString(),
          });

          if (!foundClass) {
            resp.status(400).send({
              isSuccess: false,
              exceptionMessage: "Invalid input",
            } as OutcomeBase);

            return;
          }
          const deletedClass = await this._classroomRepository.DeleteAsync(
            foundClass
          );
          resp.status(200).send({
            data: deletedClass?.id.toString(),
          } as Outcome<string>);
        } catch (e) {
          resp.status(500).send({
            isSuccess: false,
            exceptionMessage: "Failed to register user",
          } as OutcomeBase);
        }
      }
    );
  }
  private CreateClassroomMember() {
    return this._application.post(
      `/api/${Classroom.name}/addstudent`,
      async (req, resp) => {
        try {
          const parsedInput = classroomMemberCreateInputSchema.safeParse(
            req.body
          );

          if (!parsedInput.success || !parsedInput.data) {
            resp.status(400).send({
              isSuccess: false,
              exceptionMessage: "Invalid input",
            } as OutcomeBase);

            return;
          }
          const [foundClass, foundStudent] = await Promise.all([
            this._classroomRepository.GetOneAsync({
              id: parsedInput.data.classroomId.toString(),
            }),
            this._studentRepository.GetOneAsync({
              id: parsedInput.data.studentId.toString(),
            }),
          ]);

          if (!foundClass || !foundStudent) {
            resp.status(400).send({
              isSuccess: false,
              exceptionMessage: "Invalid input",
            } as OutcomeBase);

            return;
          }

          const registeredClassMember =
            await this._classroomMembersRepository.SaveAsync(
              new ClassroomMember(
                null,
                parsedInput.data!.studentId,
                parsedInput.data!.classroomId
              )
            );

          resp.status(200).send({
            data: registeredClassMember,
          } as Outcome<Classroom>);
        } catch (e) {
          resp.status(500).send({
            isSuccess: false,
            exceptionMessage: "Failed to register user",
          } as OutcomeBase);
        }
      }
    );
  }

  public override InvokeRoutes(): void {
    this.CreateClassroom();
    this.DeleteClassroom();
    this.CreateClassroomMember();
  }
}

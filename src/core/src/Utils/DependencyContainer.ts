import { DataSource } from "typeorm";
import MigrationService from "../persistence/MigrationService";
import StudentRepository from "../persistence/repositories/StudentRepository";
import ClassroomMemberRepository from "../persistence/repositories/ClassroomMemberRepository";
import ClassroomRepository from "../persistence/repositories/ClassroomRepository";
import { Application } from "express";
import StudentController from "../api/controllers/StudentController";
import { DIContainer } from "rsdi";
import StudentEntity from "../persistence/entities/StudentEntity";
import ClassroomEntity from "../persistence/entities/ClassroomEntity";
import ClassroomMemberEntity from "../persistence/entities/ClassroomMemberEntity";

export default class DependencyContainer extends DIContainer<{
  [DataSource.name]: DataSource;
  [MigrationService.name]: MigrationService;
  [StudentRepository.name]: StudentRepository;
  [ClassroomMemberRepository.name]: ClassroomMemberRepository;
  [ClassroomRepository.name]: ClassroomRepository;
  ["Application"]: Application;
  [StudentController.name]: StudentController;
}> {
  public constructor(dSource: DataSource, app: Application) {
    super();

    this.Configure(dSource, app);
  }

  private Configure(dSource: DataSource, app: Application) {
    this.add(DataSource.name as never, () => dSource);

    this.add(
      MigrationService.name as never,
      ({ [DataSource.name]: dbClient }) =>
        new MigrationService((dbClient as DataSource).manager)
    );
    this.add(
      StudentRepository.name as never,
      ({ [DataSource.name]: dbClient }) => {
        return new StudentRepository(
          (dbClient as DataSource)!.getRepository(StudentEntity)!
        );
      }
    );
    this.add(
      ClassroomRepository.name as never,
      ({ [DataSource.name]: dbClient }) => {
        return new ClassroomRepository(
          (dbClient as DataSource)!.getRepository(ClassroomEntity)!
        );
      }
    );
    this.add(
      ClassroomMemberRepository.name as never,
      ({ [DataSource.name]: dbClient }) => {
        return new ClassroomMemberRepository(
          (dbClient as DataSource)!.getRepository(ClassroomMemberEntity)!
        );
      }
    );
    this.add("Application" as never, () => app);

    this.add(
      StudentController.name as never,
      ({ Application, [StudentRepository.name]: studentRepo }) => {
        return new StudentController(
          Application,
          studentRepo as StudentRepository
        );
      }
    );
  }
}

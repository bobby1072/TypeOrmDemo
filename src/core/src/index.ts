import StudentRepository from "./persistence/repositories/StudentRepository";
import { dbPublicContextSource } from "./persistence/dbDataSource";
import { DataSource, EntityManager } from "typeorm";
import { DIContainer } from "rsdi";
import StudentEntity from "./persistence/entities/StudentEntity";
import ClassroomRepository from "./persistence/repositories/ClassroomRepository";
import ClassroomEntity from "./persistence/entities/ClassroomEntity";
import ClassroomMemberRepository from "./persistence/repositories/ClassroomMemberRepository";
import ClassroomMemberEntity from "./persistence/entities/ClassroomMemberEntity";
import MigrationService from "./persistence/MigrationService";

abstract class Program {
  public static async Main() {
    const diContainer = await Program.ConfigureDi();

    await (
      diContainer.get(MigrationService.name as never) as MigrationService
    ).RunMigrationsAsync();

    const studentRepo = diContainer.get(
      StudentRepository.name as never
    ) as StudentRepository;
    const foundStudents = await studentRepo.GetAllAsync();

    console.log(JSON.stringify(foundStudents));
  }

  private static async ConfigureDi(): Promise<DIContainer> {
    const container = new DIContainer<{
      [DataSource.name]: DataSource;
      [MigrationService.name]: MigrationService;
      [StudentRepository.name]: StudentRepository;
      [ClassroomMemberRepository.name]: ClassroomMemberRepository;
      [ClassroomRepository.name]: ClassroomRepository;
    }>();

    const dbClient = await dbPublicContextSource.initialize().then((x) => {
      console.log("\n\nDatabase connection initialized...");
      return x;
    });

    container.add(DataSource.name as never, () => dbClient);

    container.add(
      MigrationService.name as never,
      ({ [DataSource.name]: dbClient }) =>
        new MigrationService((dbClient as DataSource).manager)
    );

    container.add(
      StudentRepository.name as never,
      ({ [DataSource.name]: dbClient }) => {
        return new StudentRepository(
          (dbClient as DataSource)!.getRepository(StudentEntity)!
        );
      }
    );
    container.add(
      ClassroomRepository.name as never,
      ({ [DataSource.name]: dbClient }) => {
        return new ClassroomRepository(
          (dbClient as DataSource)!.getRepository(ClassroomEntity)!
        );
      }
    );
    container.add(
      ClassroomMemberRepository.name as never,
      ({ [DataSource.name]: dbClient }) => {
        return new ClassroomMemberRepository(
          (dbClient as DataSource)!.getRepository(ClassroomMemberEntity)!
        );
      }
    );

    return container;
  }
}

Program.Main();

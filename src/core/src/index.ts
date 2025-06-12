import { dbPublicContextSource } from "./persistence/dbPublicContextSource";
import MigrationService from "./persistence/MigrationService";
import express, { Application as ExpressApplication } from "express";
import DependencyContainer from "./utils/DependencyContainer";
import StudentController from "./api/controllers/StudentController";
import compression from "compression";
import bodyParser from "body-parser";
import BaseController from "./api/controllers/BaseController";
import ClassroomController from "./api/controllers/ClassroomController";

abstract class Program {
  private static readonly _application: ExpressApplication = express();

  public static async Main() {
    const dbClient = await dbPublicContextSource.initialize().then((x) => {
      console.log("\n\nDatabase connection initialized...");
      return x;
    });

    const diContainer = new DependencyContainer(dbClient, this._application);

    await (
      diContainer.get(MigrationService.name as never) as MigrationService
    ).RunMigrationsAsync();

    this._application.use(compression());
    this._application.use(bodyParser.json());
    this._application.use(bodyParser.urlencoded({ extended: true }));

    const controllerArray: BaseController[] = [
      diContainer.get(StudentController.name as never) as StudentController,
      diContainer.get(ClassroomController.name as never) as ClassroomController,
    ];

    controllerArray.forEach((x) => {
      x.InvokeRoutes();
    });

    const port = Number(process.env.PORT) || 5000;
    this._application.listen(port, () => {
      console.log("\n\nServer running on port: ", port);
    });
  }
}

Program.Main();

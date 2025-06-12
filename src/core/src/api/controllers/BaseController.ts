import { Application } from "express";

export default abstract class BaseController {
  protected readonly _application: Application;

  public constructor(app: Application) {
    this._application = app;
  }

  public abstract InvokeRoutes(): void;
}

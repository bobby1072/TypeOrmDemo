import BaseRuntimeModel from "../../models/BaseRuntimeModel";

export default abstract class BaseEntity<TRuntime extends BaseRuntimeModel> {
  public abstract ToRuntimeType(): TRuntime;
}

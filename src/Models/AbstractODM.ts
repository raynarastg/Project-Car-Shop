import { Model } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
}
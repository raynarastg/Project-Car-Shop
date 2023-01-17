import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    
    try {
      const newMotorcycle = await this.service.create(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  async getAll() {
    try {
      const motorcycles = await this.service.getAll();
      return this.res.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  async getById() {
    const { id } = this.req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
    const carsById = await this.service.getById(id);
    if (!carsById) {
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    }
    return this.res.status(200).json(carsById);
  }
}
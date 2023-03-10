import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    
    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  async getAll() {
    try {
      const cars = await this.service.getAll();
      return this.res.status(200).json(cars);
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
      return this.res.status(404).json({ message: 'Car not found' });
    }
    return this.res.status(200).json(carsById);
  }

  async updatedCar() {
    const { id } = this.req.params;
    const car = this.req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
    const updatedById = await this.service.updatedCar(id, car);
    if (!updatedById) {
      return this.res.status(404).json({ message: 'Car not found' });
    }
    return this.res.status(200).json(updatedById);
  }
}

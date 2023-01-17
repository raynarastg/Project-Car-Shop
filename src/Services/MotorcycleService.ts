import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  createMotorcycleDomain(motorcycle: IMotorcycle) {
    const newMotorcycle = new Motorcycle(motorcycle);
    return newMotorcycle;
  }

  async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const resultMotorcycle = await motorcycleODM.create(motorcycle);
    const newmotorcycle = this.createMotorcycleDomain(resultMotorcycle);
    return newmotorcycle;
  }

  async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.getAll();
    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleById = await motorcycleODM.getById(id);
    if (motorcycleById) {
      return this.createMotorcycleDomain(motorcycleById);
    }
  }

  async updatedMotorcycle(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleId = await motorcycleODM.updatedMotorcycle(id, motorcycle);
    if (motorcycleId) {
      return this.createMotorcycleDomain(motorcycleId);
    }
  }
}
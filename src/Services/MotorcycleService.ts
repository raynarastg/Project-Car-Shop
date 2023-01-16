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
}
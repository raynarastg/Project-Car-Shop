import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  createCarDomain(car: ICar) {
    const newCar = new Car(car);
    return newCar;
  }

  async create(car: ICar) {
    const carODM = new CarODM();
    const resultCar = await carODM.create(car);
    const newCar = this.createCarDomain(resultCar);
    return newCar;
  }
}
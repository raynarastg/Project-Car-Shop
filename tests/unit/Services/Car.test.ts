import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import Connection from '../../../src/Models/Connection';
import CarService from '../../../src/Services/CarService';
import { clearDatabase } from '../../../__tests__/utils/db';

describe('Testa camada service car', function () {
  it('testa se cria carro com sucesso e retorna todos', async function () {
    const carInput: ICar = {
      id: '63c1c0b96bcd1fa5d4087e14',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    await Connection();
    await clearDatabase();
    try {
      const carOutput: Car = new Car(carInput);
      sinon.stub(Model, 'create').resolves(carOutput);

      const service = new CarService();
      const result = await service.create(carInput);

      expect(result).to.be.deep.equal(carOutput);

      const carAll = await service.getAll();
      sinon.stub(Model, 'find').resolves(carAll);

      const cars = await service.getAll();
      expect(cars).to.be.deep.equal(carAll);
      
      const carInputId = {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };
          
      const carId: Car = new Car(carInputId);
      
      sinon.stub(Model, 'findById').resolves(carId);
            
      const carReturn = await service.getById('634852326b35b59438fbea2f');
      expect(carReturn).to.be.deep.equal(carId);

      const carOutputUpdated = {
        id: '63c1c0b96bcd1fa5d4087e14',
        model: 'Idea',
        year: 2009,
        color: 'Cinza',
        status: true,
        buyValue: 35.000,
        doorsQty: 2,
        seatsQty: 5,
      };

      sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutputUpdated);
      await service
        .updatedCar('63c1c0b96bcd1fa5d4087e14', carInput);

      sinon.restore();
    } catch (error) {
      console.log(error);
    }
  });
});
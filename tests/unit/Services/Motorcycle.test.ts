import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Connection from '../../../src/Models/Connection';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { clearDatabase } from '../../../__tests__/utils/db';

describe('Testa camada service motorcycle', function () {
  it('testa se cria moto com sucesso e retorna todas', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    await Connection();
    await clearDatabase();
    try {
      const motorcycleOutput: Motorcycle = new Motorcycle(motorcycleInput);
      sinon.stub(Model, 'create').resolves(motorcycleOutput);
  
      const service = new MotorcycleService();
      const result = await service.create(motorcycleInput); 
      expect(result).to.be.deep.equal(motorcycleOutput);
      
      const motorcycleAll = await service.getAll();
      sinon.stub(Model, 'find').resolves(motorcycleAll);
      
      const motorcycle = await service.getAll();
      expect(motorcycle).to.be.deep.equal(motorcycleAll);
      
      const motorcycleInputId = {
        id: '6348513f34c397abcad040b2',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      const motorcycleId: Motorcycle = new Motorcycle(motorcycleInputId);

      sinon.stub(Model, 'findById').resolves(motorcycleId);
      
      const motorcycleReturn = await service.getById('6348513f34c397abcad040b2');
      expect(motorcycleReturn).to.be.deep.equal(motorcycleId);

      const motorcycleOutputUpdated = {
        id: '63c1c0b96bcd1fa5d4087e15',
        model: 'Biz',
        year: 2007,
        color: 'Blue',
        status: true,
        buyValue: 20.000,
        category: 'Custom',
        engineCapacity: 400,
      };

      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutputUpdated);
      const motorcyclesService = new MotorcycleService();
      const resultUpdated = await motorcyclesService
        .updatedMotorcycle('63c1c0b96bcd1fa5d4087e15', motorcycleInput);
      expect(resultUpdated).to.be.deep.equal(motorcycleOutput);
  
      sinon.restore();
    } catch (error) {
      console.log(error);
    }
  });
});
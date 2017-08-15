import angular from 'angular';
import { filter, reject } from 'lodash';
import flowerResource from './flower.resource';

let service;

describe('flowerResource', ()=> {

  beforeEach(()=> {
    service = new flowerResource();
  });

  it('should have service defined', ()=> {
    expect(service).toBeDefined();
  });

  it('should have functions getBouquets, getSingleQuantityBouquets, getShippingOptions', ()=> {
    expect(angular.isFunction(service.getBouquets)).toBe(true);
    expect(angular.isFunction(service.getSingleQuantityBouquets)).toBe(true);
    expect(angular.isFunction(service.getShippingOptions)).toBe(true);
  });

  describe('method getBouquets', ()=> {
    it('response should be defined', ()=> {
      expect(service.getBouquets()).toBeDefined();
    });

    it('response should have bouquets collection', ()=> {
      expect(service.getBouquets().collections[0].skus).toBeDefined();
    });
  });

  describe('method getShippingOptions()', ()=> {
    it('response should be defined', ()=> {
      expect(service.getShippingOptions()).toBeDefined();
    });
  });

  describe('method getSingleQuantityBouquets()', ()=> {
    it('response should be defined', ()=> {
      expect(service.getSingleQuantityBouquets()).toBeDefined();
    });

    it('bouquet quantity should not be 0', ()=> {
      //arrange
      let getSingleQuantityBouquets = service.getSingleQuantityBouquets();
      //act
      let bouquetsWithZeroQuantity = filter(getSingleQuantityBouquets, { pricings: [{ quantity: 0 }] });
      //assert
      expect(bouquetsWithZeroQuantity.length).toBe(0);
    });

    it('bouquet pricing object should not be null', ()=> {
      //arrange
      let getSingleQuantityBouquets = service.getSingleQuantityBouquets();
      //act
      let bouquetsWithNullPricingInfo = filter(getSingleQuantityBouquets, { pricings: null });
      //assert
      expect(bouquetsWithNullPricingInfo.length).toBe(0);
    });

    it('bouquet quantity should not be greater than 1', ()=> {
      //arrange
      let getSingleQuantityBouquets = service.getSingleQuantityBouquets();
      //act
      let bouquetsWithQuantityGreaterThanOne = filter(getSingleQuantityBouquets, { pricings: [{ quantity: 2 }] });
      //assert
      expect(bouquetsWithQuantityGreaterThanOne.length).toBe(0);
    });
  });
});

import angular from 'angular';
import routing from './checkout.route';
import component from './checkout.component';
import bouquet from './bouquet/_bouquet.module';
import flowerResourceModule from 'RESOURCES/flower/_flower.resource.module';

angular
  .module('checkout', [flowerResourceModule, 'bouquet'])
  .component('checkout', component)
  .config(routing);

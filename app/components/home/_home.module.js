import angular from 'angular';
import routing from './home.route';
import component from './home.component';

angular
  .module('home', [])
  .component('home', component)
  .config(routing);

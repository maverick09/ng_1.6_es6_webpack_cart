/*
 * @class app
 * @classdesc This defines app module and dependencies to be run on application boot.
 * 1. Define app dependencies
 * 2. Config of external modules
 * */

// Import angular modules
import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import 'angular-ui-bootstrap';
import mainRoute from './main.route';

// Import components
import home from 'COMPONENTS/home/_home.module';
import checkout from 'COMPONENTS/checkout/_checkout.module';

// Import configuration files
import config from './app.config';
import calendarConfig from './calendar.config';

//Import required stylesheets
import 'bootstrap/dist/css/bootstrap.css';
import 'angular-material/angular-material.min.css';
require('./stylesheets/main.scss');

// Run application
var dependencies = [
  uirouter,
  'ui.bootstrap',
  mainRoute,
  ngMaterial,

  'home',
  'checkout'
];

angular.module('app', dependencies)
.config(config)
.config(calendarConfig);

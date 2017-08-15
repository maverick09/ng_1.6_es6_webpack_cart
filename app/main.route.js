/*
 * @class app.main
 * @classdesc app.main abstract view for loading other pages.
 * */

import angular from 'angular';
import uirouter from 'angular-ui-router';

export default angular.module('main', [ uirouter ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/checkout');
    $urlRouterProvider.when('/', '/checkout');

    $stateProvider
      .state('app', {
        abstract: true,
        template: '<ui-view></ui-view>'
      });
  }]).name;

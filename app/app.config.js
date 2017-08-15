/*
 * @class routing
 * @classdesc Defines application level configurations
 * 1. support html5 mode ( i.e. remove # from url )
 * */

routing.$inject = ['$httpProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$sceDelegateProvider'];

export default function routing($httpProvider,
  $urlRouterProvider,
  $locationProvider,
  $sceDelegateProvider) {
  //TODO: enable html5 mode to remove the # from url
  //$locationProvider.html5Mode(true);
}

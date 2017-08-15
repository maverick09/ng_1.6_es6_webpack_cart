function homeRoutes($stateProvider) {

  $stateProvider
    .state('app.home', {
      url: '/home',
      component: 'home'
    })
}

export default homeRoutes;

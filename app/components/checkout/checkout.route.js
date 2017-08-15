function checkoutRoutes($stateProvider) {

  $stateProvider
    .state('app.checkout', {
      url: '/checkout',
      component: 'checkout'
    })
}

export default checkoutRoutes;


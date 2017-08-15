import flower from './flower.resource';


export default angular.module('flowerResourceModule', [])
.service('flowerResource', flower).name;

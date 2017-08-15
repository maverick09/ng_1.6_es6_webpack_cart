import angular from 'angular';
import component from './bouquet.component';
import pagination from 'COMPONENTS/checkout/pagination/_pagination.module';
import filter from './filter/start.form.filter';

angular
.module('bouquet', ['pagination'])
.component('bouquet', component)
.filter('startFrom', filter);

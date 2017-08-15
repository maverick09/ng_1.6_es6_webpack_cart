import moment from 'moment/moment';
import calendar from './constants/calendar.constants';
/*
 * @class routing
 * @classdesc calendar default date format
 * */

dateConfig.$inject = ['$mdDateLocaleProvider'];

export default function dateConfig($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format(calendar.dateFormat.LONG);
  };
}

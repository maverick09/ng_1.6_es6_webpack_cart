import paginationHtml from './pagination.html';
import './pagination.scss';

class paginationCtrl {
  constructor() {
    //Pagination config
    this.numberOfPages = ()=> {
      return Math.ceil(this.bouquetsLength / this.pageSize);
    };
  }
}

paginationCtrl.$inject = [];

let paginationComponent = {
  template: paginationHtml,
  controller: paginationCtrl,
  bindings: {
    bouquetsLength: '<',
    pageSize: '<',
    currentPage: '='
  }
};

export default paginationComponent;

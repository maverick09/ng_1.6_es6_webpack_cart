import bouquetHtml from './bouquet.html';
import defaultProductImage from 'ASSETS/images/default-placeholder.jpg';
import './bouquet.scss';
import checkoutConst from 'CONSTANTS/checkout.constants';

class bouquetCtrl {
  constructor() {
    this.defaultProductImage = defaultProductImage;
    this.pageSize = checkoutConst.DEFAULT_PAGE_SIZE;
    this.currentPage = 0;
  }

  onClick(id, price) {
    let item = {
      id: id,
      price: Number(price)
    };
    this.addToBasket(item);
  }
}

bouquetCtrl.$inject = [];

let bouquetComponent = {
  template: bouquetHtml,
  controller: bouquetCtrl,
  bindings: {
    bouquets: '<',
    addToBasket: '&'
  }
};

export default bouquetComponent;

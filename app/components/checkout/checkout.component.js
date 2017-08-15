import checkoutHtml from './checkout.html';
import { find } from 'lodash';
import moment from 'moment/moment';
import './checkout.scss';
import calendar from 'CONSTANTS/calendar.constants';
import checkoutConst from 'CONSTANTS/checkout.constants';

class checkoutCtrl {
  constructor(flowerResource) {
    this.bouquets = flowerResource.getSingleQuantityBouquets();
    this.shippingOptions = flowerResource.getShippingOptions();
    this.emptyCart = {
      totalPrice: 0,
      shipping: { id: 0, cost: 0, isSpecialDelivery: false },
      items: [{ id: 0, itemCost: 0 }]
    };
    this.cart = angular.copy(this.emptyCart);

    // Configure min & max for date picker
    let today = new Date();
    this.datePickerConfig = {
      minDate: new Date(),
      maxDate: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    };
  }

  addToBasket(id, price) {
    this.__resetCart();

    //1. ShippingPrice at this point will be always 0 as its only in next step customer can select the shipping method.
    //2. Ignoring quantity part considering I was asked to show items with quantity 1.
    this.cart.items.push({ id: id, itemCost: price });
    this.__updateTotalCost(price, true);
  }

  addShippingCostToBasket() {
    //first deduct the amount added for previous shipping method, if any.
    if (this.cart.shipping && this.cart.shipping.cost > 0) {
      this.__updateTotalCost(this.cart.shipping.cost, false);
    }

    this.__resetShipping();

    if (this.selectedShipping) {
      this.cart.shipping.cost = this.selectedShipping.price;
      this.cart.shipping.id = this.selectedShipping.id;
      this.__updateTotalCost(this.cart.shipping.cost, true);
    }
  }

  setDeliveryDate() {
    //Check if previous selected date was christmas delivery then first deduct special delivery charges
    if (this.cart.shipping.isSpecialDelivery) {
      this.__updateTotalCost(checkoutConst.CHRISTMAS.DELIVERY_CHARGE, false);
      this.cart.shipping.isSpecialDelivery = false;
    }

    // If christmas delivery then add special delivery charges
    if (this.__isChristmasDelivery(this.selectedDeliveryDate)) {
      this.cart.shipping.isSpecialDelivery = true;
      this.__updateTotalCost(checkoutConst.CHRISTMAS.DELIVERY_CHARGE, true);
    }
  }

  __isChristmasDelivery(date) {
    //TODO: convert this into $filter
    let currentYear = new Date().getFullYear(),
      startDay    = checkoutConst.CHRISTMAS.START_DATE.DAY,
      startMonth  = checkoutConst.CHRISTMAS.START_DATE.MONTH,
      endDay      = checkoutConst.CHRISTMAS.END_DATE.DAY,
      endMonth    = checkoutConst.CHRISTMAS.END_DATE.MONTH;

    let startDate    = moment([currentYear, startMonth, startDay]).format(calendar.dateFormat.ISO),
      endDate      = moment([currentYear + 1, endMonth, endDay]).format(calendar.dateFormat.ISO),
      selectedDate = moment(date).format(calendar.dateFormat.ISO);

    return moment(selectedDate).isBetween(startDate, endDate);
  }

  __updateTotalCost(cost, isAddition) {
    //TODO: If in future, more than one type of bouquet items need to be delivered then we need to add up cost of all the items in [this.cart.item] array
    if (isAddition) {
      this.cart.totalPrice += cost;
    } else {
      this.cart.totalPrice -= cost;
    }
  }

  __resetCart() {
    this.cart = angular.copy(this.emptyCart);
    this.selectedShipping = this.shippingOptions[0];
  }

  __resetShipping() {
    this.cart.shipping = angular.copy(this.emptyCart.shipping);
  }
}

checkoutCtrl.$inject = ['flowerResource'];

let checkoutComponent = {
  template: checkoutHtml,
  controller: checkoutCtrl
};

export default checkoutComponent;

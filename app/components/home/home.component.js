import homeHtml from './home.html';

class homeCtrl {
  constructor() {
    this.title = 'Bloom & Wild Home';
  }
}

let homeComponent = {
  template: homeHtml,
  controller: homeCtrl
};

export default homeComponent;

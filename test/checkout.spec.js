describe('Checkout Page', function() {

  beforeAll(function() {
    browser.get(browser.baseUrl);
  });

  it('should land on Checkout Screen', function () {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'checkout');
  });

});

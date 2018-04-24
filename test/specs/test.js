describe('a tunnelled site', function () {
    it('should look like the apache page', function () {
        browser.url('/');
        browser.getText('h1').should.be.equal('It werks!');
    });
})

describe('my awesome website', function () {
    it('should do some chai assertions', function () {
        browser.url('http://webdriver.io');
        browser.getTitle().should.be.equal('WebdriverIO - WebDriver bindings for Node.js');
    });
});
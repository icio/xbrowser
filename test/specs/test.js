// describe('my awesome website', function () {
//     it('should do some chai assertions', function () {
//         browser.url('http://webdriver.io');
//         browser.getTitle().should.be.equal('WebdriverIO - WebDriver bindings for Node.js');
//     });
// });

describe('script tag', function() {
    it('should get a global, synchronous function', function() {
        browser.url('/pages/scripttag/');
        browser.setValue('#name', 'John');
        browser.click('#update');
        browser.getValue('#output').should.not.equal('');
    });
});

// describe('my awesome website', function () {
//     it('should do some chai assertions', function () {
//         browser.url('http://webdriver.io');
//         browser.getTitle().should.be.equal('WebdriverIO - WebDriver bindings for Node.js');
//     });
// });

describe('script tag', function() {
    it('should get a global, synchronous function', function() {
        browser.on('error', function() {
            console.log('ERROR', arguments);
        });

        browser.url('/pages/scripttag/');
        browser.setValue('#name', 'John');
        browser.click('input[type=submit]');
        browser.waitUntil(() => ~browser.getUrl().indexOf('?'), 1000, 'Timed out waiting for form to submit.');

        browser.waitForQueryParam('output', 'Hello, John');
    });
});

describe('ravelinjs', function() {
    it('can be used with a script tag', function() {
        browser.url('/pages/scripttag/index.html');
        suite(browser);
    });

    it('can be used with requirejs', function() {
        browser.url('/pages/amd/index.html');
        suite(browser);
    });

    it('can be used with webpack', function() {
        browser.url('/pages/webpack/index.html');
        suite(browser);
    });
});

function suite(browser) {
    browser.setValue('#name', 'John');
    browser.click('#update');
    browser.getValue('#output').should.not.equal('');
}

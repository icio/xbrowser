describe('ravelinjs', function() {
    const cap = browser.desiredCapabilities;

    it('can be used with a script tag', function() {
        browser.url('/pages/scripttag/index.html');
        suite(browser);
    });

    usuallyIt(!cap.requireJSTestDisabled, 'can be used with requirejs', function() {
        browser.url('/pages/amd/index.html');
        suite(browser);
    });

    usuallyIt(!cap.webpackTestDisabled, 'can be used with webpack', function() {
        browser.url('/pages/webpack/index.html');
        suite(browser);
    });
});

function suite(browser) {
    browser.setValue('#name', 'John');
    browser.click('#update');

    // Throw a little user entropy in there.
    browser.moveToObject('input[type=submit]');
    browser.pause(Math.floor(1000 * Math.random()));
    browser.keys(["Tab"]);

    var output = browser.getValue('#output');
    if (output.indexOf && output.indexOf('ERROR:') === 0) {
        throw new Error(output);
    }

    output.should.not.equal('');
}

function usuallyIt(itDoes) {
    return (itDoes ? it : it.skip).apply(this, Array.prototype.slice.call(arguments, 1));
}
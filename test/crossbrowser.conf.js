const request = require('request');
const cbt = require('cbt_tunnels');

const user = process.env.CROSSBROWSERTESTING_USER;
const key = process.env.CROSSBROWSERTESTING_KEY;

if (!user || !key) {
    throw new Error('Set the CROSSBROWSERTESTING_USER and CROSSBROWSERTESTING_KEY envvars.');
}

const base = require('./base.conf').config;
exports.config = Object.assign(base, {
    // Appium desktop defaults.
    host: 'hub.crossbrowsertesting.com',
    port: 80,
    user: user,
    key: key,

    // Picked up by cbt_tunnels.
    baseUrl: 'http://local',

    capabilities: [
        {
            name: 'Ravelin JS Windows 10 Firefox 45',
            build: '1.0',
            browser_api_name: "FF45",
            os_api_name: "Win10",
            browserName: 'firefox',
            record_video: 'false',
            record_network: 'false'
        },
        {
            name: 'Ravelin JS Windows Vista IE8',
            build: '1.0',
            browserName: 'Internet Explorer',
            version: '8',
            platform: 'Windows Vista',
            screenResolution: '1366x768',
            record_video: 'true'
        },
    ],

    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    after: function (result, capabilities, specs) {
        var sessionId = browser.requestHandler.sessionID;
        var score = result ? 'fail' : 'pass';
        request(
            {
                method: 'PUT',
                uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + encodeURIComponent(sessionId),
                body: { 'action': 'set_score', 'score': score },
                json: true,
            },
            function(error, response, body) {
                if (error) {
                    browser.logger.error('Failed to update session ' + sessionId + ' score to ' + score + ': ' + error);
                } else if (response.statusCode !== 200) {
                    browser.logger.error('Failed to update session ' + sessionId + ' score to ' + score + ': got status code ' + response.statusCode);
                } else {
                    browser.logger.info('Updated session ' + sessionId + ' score to ' + score + '.');
                }
            }
        ).auth(user, key);
    },
});

exports.config.onPrepares.push(function(config, capabilities) {
    return new Promise(function(resolve, reject) {
        cbt.start({username: user, authkey: key, dir: __dirname}, function(err) {
            if (err) {
                return reject('Failed to open CBT tunnel: ' + err);
            }
            resolve();
        });
    });
});

exports.config.onCompletes.push(function () {
    cbt.stop();
});
const proc = require('child_process');
const waitPort = require('wait-port');

const base = require('./base.conf').config;
exports.config = Object.assign(base, {
    host: '127.0.0.1',
    port: 4723,

    capabilities: [
        {
            platformName: 'iOS',
            platformVersion: '10.3',
            browserName: 'Safari',
            deviceName: 'iPhone 6'
        },
    ],
});

exports.config.onPrepares.push(function (config, capabilities) {
    return launchAppium({
        timeout: 20000,
        host: config.host,
        port: config.port,
        log: __dirname + '/appium.log',
    });
});

function launchAppium(args) {
    // Launch appium in the background.
    const appium = proc.spawn(
        process.env.APPIUM || 'appium',
        [
            '--address', args.host,
            '--port', args.port,
            '--log', args.log,
        ],
    );
    console.log('Appium: launching. Logging to', args.log);

    // Kill Appium when node dies.
    process.on('exit', function() {
        appium.kill();
        console.log('Appium: killed.');
    });

    // Wait for Appium to become available.
    return Promise.race([
        new Promise(function (_, reject) {
            appium.on('close', (code) => reject('Appium: Stopped with exit code ' + code));
        }),
        waitPort({
            host: args.host,
            port: args.port,
            timeout: args.timeout || 20000,
        })
        .then(() => appium),
    ]).then(function (a) {
        appium.on('close', function (code) {
            console.log('Appium: Stopped with exit code', code);
        });
        return a;
    });
}
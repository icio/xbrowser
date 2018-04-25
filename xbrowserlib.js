// Universal Module Definition: https://github.com/umdjs/umd/blob/36fd1135ba44e758c7371e7af72295acdebce010/templates/returnExports.js#L40-L60
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.world = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    function world() {
    }
    world.prototype.greet = function(name) {
        if (name) {
            return 'Hello, ' + name;
        }
        return 'Hello, world.';
    }
    return new world();
}));
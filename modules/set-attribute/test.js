var test = require('tape');
var setAttribute = require('./set-attribute');


function getEl() {
    return document.createElement('div');
}

test('amp-set-attribute', function (t) {
    var el = getEl();

    setAttribute(el, 'data-key', 42);
    t.equal(el.outerHTML, '<div data-key="42"></div>');

    setAttribute(el, 'data-key', false);
    t.equal(el.outerHTML, '<div></div>', 'removes property when passed false');

    el = getEl();
    setAttribute(el, {class: 'active', thing: true});
    t.equal(el.outerHTML, '<div class="active" thing=""></div>', 'supports objects');
    setAttribute(el, {class: false, thing: false});
    t.equal(el.outerHTML, '<div></div>', 'allows deletion via objects with false');

    el = getEl();
    setAttribute(el, {class: null, other: undefined, thing: NaN});
    t.equal(el.outerHTML, '<div class="" other="" thing=""></div>', 'does not set attributes to falsy values');

    el = getEl();
    setAttribute(el, {thing: 0, other: 47});
    t.equal(el.outerHTML, '<div thing="0" other="47"></div>', 'handles numbers, including 0');

    input = document.createElement('input');
    setAttribute(input, {value: 'hello'});
    t.equal(input.outerHTML, '<input value="hello">', 'also sets value');
    t.equal(input.value, 'hello', 'also sets value');

    t.end();
});
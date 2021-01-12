const {parse} = require('../../dist/assembler.cjs.js');

test('color property normal', () => {
    const e = parse('color:red');
    expect(e.has('x-color')).toBe(true);
    expect(e.get('x-color').value).toBe('red');
});

test('color property hover', () => {
    const e = parse('color.hover:red');
    expect(e.has('x-color.hover')).toBe(true);
    expect(e.get('x-color.hover').value).toBe('red');
});

test('color property responsive', () => {
    const e = parse('md|color:red');
    expect(e.has('md|x-color')).toBe(true);
    expect(e.get('md|x-color').value).toBe('red');
});

test('color property responsive hover', () => {
    const e = parse('md|color.hover:red');
    expect(e.has('md|x-color.hover')).toBe(true);
    expect(e.get('md|x-color.hover').value).toBe('red');
});

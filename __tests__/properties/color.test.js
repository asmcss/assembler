const {parse} = require('../../dist/assembler.cjs.js');

test('color property normal', () => {
    const e = parse('color:red');
    expect(e.has('color')).toBe(true);
    expect(e.get('color').value).toBe('red');
});

test('color property hover', () => {
    const e = parse('color.hover:red');
    expect(e.has('color.hover')).toBe(true);
    expect(e.get('color.hover').value).toBe('red');
});

test('color property responsive', () => {
    const e = parse('md|color:red');
    expect(e.has('md|color')).toBe(true);
    expect(e.get('md|color').value).toBe('red');
});

test('color property responsive hover', () => {
    const e = parse('md|color.hover:red');
    expect(e.has('md|color.hover')).toBe(true);
    expect(e.get('md|color.hover').value).toBe('red');
});

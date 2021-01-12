import importResolver from 'rollup-plugin-import-resolver';
import ts from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";
import pkg from './package.json';

const NAME = 'Opis.Assembler';
const MAIN = 'src/index.ts';
const GLOBALS = {};
const EXTERNAL = Object.keys(GLOBALS);

const resolver = importResolver(['.js', '.mjs', '.ts']);
const typescript = ts({
    target: "es6"
});

export default [
    {
        input: MAIN,
        output: {
            name: NAME,
            file: pkg.browser,
            format: 'umd',
            globals: GLOBALS
        },
        external: EXTERNAL,
        plugins: [resolver, typescript]
    },
    {
        input: MAIN,
        output: {
            name: NAME,
            file: pkg.browser.replace('.js', '.min.js'),
            format: 'umd',
            globals: GLOBALS
        },
        external: EXTERNAL,
        plugins: [resolver, typescript, terser()]
    },
    {
        input: MAIN,
        output: {
            name: NAME,
            file: pkg.main,
            format: 'cjs',
            globals: GLOBALS
        },
        external: EXTERNAL,
        plugins: [resolver, typescript]
    },
    {
        input: MAIN,
        output: {
            name: NAME,
            file: pkg.module,
            format: 'es',
            globals: GLOBALS
        },
        external: EXTERNAL,
        plugins: [resolver, typescript]
    }
];
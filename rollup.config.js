import importResolver from 'rollup-plugin-import-resolver';
import ts from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";
import pkg from './package.json';

const NAME = 'AssemblerCSS';
const MAIN = 'src/index.ts';
const GLOBALS = {};
const EXTERNAL = Object.keys(GLOBALS);

const production = !process.env.ROLLUP_WATCH;

const resolver = importResolver(['.mjs', '.ts', '.js']);
const typescript = ts({
    target: "es2015"
});

const CONFIG = [
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
    }
];

if (production) {
    CONFIG.push(...[
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
    ]);
}


export default CONFIG;
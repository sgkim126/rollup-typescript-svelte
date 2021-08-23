import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

const dev = !!process.env.ROLLUP_WATCH;
const dest = dev ? "build" : "dist";

const plugins = [
    copy({
        targets: [{ src: "./public/**/*", dest }],
    }),
    svelte({
        preprocess: sveltePreprocess({ sourceMap: dev }),
        compilerOptions: {
            dev,
        },
    }),
    resolve({
        browser: true,
        dedupe: ["svelte"],
    }),
    commonjs(),
    typescript({
        sourceMap: dev,
        inlineSources: dev,
    }),
];

if (dev) {
    plugins.push(
        serve({
            contentBase: "build",
            port: 8888,
        })
    );
} else {
    plugins.push(terser());
}

export default {
    input: "src/main.ts",
    output: {
        name: "app",
        sourcemap: dev,
        file: `${dest}/bundle.js`,
        format: "iife",
    },
    plugins,
};

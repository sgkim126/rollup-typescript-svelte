import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";

const dev = !!process.env.ROLLUP_WATCH;
const dest = dev ? "build" : "dist";

export default {
    input: "src/main.ts",
    output: {
        name: "app",
        sourcemap: dev,
        file: `${dest}/bundle.js`,
        format: "iife",
    },
    plugins: [
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
    ],
};

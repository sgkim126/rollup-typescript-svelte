import typescript from "@rollup/plugin-typescript";

const dev = !!process.env.ROLLUP_WATCH;
const dest = dev ? "build" : "dist";

export default {
    input: "src/main.ts",
    output: {
        file: `${dest}/bundle.js`,
        format: "iife",
    },
    plugins: [typescript()],
};

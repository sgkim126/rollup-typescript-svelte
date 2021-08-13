const dev = !!process.env.ROLLUP_WATCH;
const dest = dev ? "build" : "dist";

export default {
    input: "src/main.js",
    output: {
        file: `${dest}/bundle.js`,
        format: "iife",
    },
};

module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/code/hp2/packages/web/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/73116_9afdf1b0._.js",
  "build/chunks/[root-of-the-server]__d02bb069._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/code/hp2/packages/web/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];
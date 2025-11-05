(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/code/hp2/packages/web/lib/db/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "http://localhost:54321"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/app/actions/data:ef839f [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40fe3ebce1844a9e7c8ef610443e73434ff6a5555b":"getUserTeams"},"code/hp2/packages/web/app/actions/teams.ts",""] */ __turbopack_context__.s([
    "getUserTeams",
    ()=>getUserTeams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getUserTeams = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40fe3ebce1844a9e7c8ef610443e73434ff6a5555b", __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getUserTeams"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdGVhbXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IHN1cGFiYXNlQWRtaW4gfSBmcm9tICdAL2xpYi9kYi9zdXBhYmFzZS1hZG1pbidcbmltcG9ydCB7IHRlYW1DcmVhdGVTY2hlbWEsIHRlYW1VcGRhdGVTY2hlbWEsIHR5cGUgVGVhbUNyZWF0ZUlucHV0IH0gZnJvbSAnQC9saWIvdmFsaWRhdGlvbi90ZWFtLXNjaGVtYXMnXG5cbi8qKlxuICogR2V0IFRlYW0gU3RhdGlzdGljc1xuICogUmV0dXJucyBwbGF5ZXIgY291bnQgYW5kIGdhbWUgY291bnQgZm9yIGEgdGVhbVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VGVhbVN0YXRzKHRlYW1JZDogc3RyaW5nKTogUHJvbWlzZTx7XG4gIHBsYXllckNvdW50OiBudW1iZXJcbiAgZ2FtZUNvdW50OiBudW1iZXJcbiAgZXJyb3I6IHN0cmluZyB8IG51bGxcbn0+IHtcbiAgdHJ5IHtcbiAgICAvLyBHZXQgcGxheWVyIGNvdW50XG4gICAgY29uc3QgeyBjb3VudDogcGxheWVyQ291bnQsIGVycm9yOiBwbGF5ZXJzRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCdwbGF5ZXJzJylcbiAgICAgIC5zZWxlY3QoJyonLCB7IGNvdW50OiAnZXhhY3QnLCBoZWFkOiB0cnVlIH0pXG4gICAgICAuZXEoJ3RlYW1faWQnLCB0ZWFtSWQpXG5cbiAgICBpZiAocGxheWVyc0Vycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjb3VudGluZyBwbGF5ZXJzOicsIHBsYXllcnNFcnJvcilcbiAgICAgIHJldHVybiB7IHBsYXllckNvdW50OiAwLCBnYW1lQ291bnQ6IDAsIGVycm9yOiBwbGF5ZXJzRXJyb3IubWVzc2FnZSB9XG4gICAgfVxuXG4gICAgLy8gR2V0IGdhbWUgY291bnRcbiAgICBjb25zdCB7IGNvdW50OiBnYW1lQ291bnQsIGVycm9yOiBnYW1lc0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluXG4gICAgICAuZnJvbSgnZ2FtZXMnKVxuICAgICAgLnNlbGVjdCgnKicsIHsgY291bnQ6ICdleGFjdCcsIGhlYWQ6IHRydWUgfSlcbiAgICAgIC5lcSgndGVhbV9pZCcsIHRlYW1JZClcblxuICAgIGlmIChnYW1lc0Vycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjb3VudGluZyBnYW1lczonLCBnYW1lc0Vycm9yKVxuICAgICAgcmV0dXJuIHsgcGxheWVyQ291bnQ6IHBsYXllckNvdW50IHx8IDAsIGdhbWVDb3VudDogMCwgZXJyb3I6IGdhbWVzRXJyb3IubWVzc2FnZSB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXllckNvdW50OiBwbGF5ZXJDb3VudCB8fCAwLFxuICAgICAgZ2FtZUNvdW50OiBnYW1lQ291bnQgfHwgMCxcbiAgICAgIGVycm9yOiBudWxsLFxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBnZXR0aW5nIHRlYW0gc3RhdHM6JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgcGxheWVyQ291bnQ6IDAsIGdhbWVDb3VudDogMCwgZXJyb3I6ICdGYWlsZWQgdG8gZ2V0IHRlYW0gc3RhdHMnIH1cbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBUZWFtXG4gKlxuICogQ3JlYXRlIGEgbmV3IHRlYW0gYW5kIGFkZCB0aGUgdXNlciBhcyBoZWFkIGNvYWNoXG4gKlxuICogQHBhcmFtIGlucHV0IC0gVGVhbSBjcmVhdGlvbiBkYXRhXG4gKiBAcGFyYW0gdXNlcklkIC0gVXNlciBJRCB0byBhZGQgYXMgaGVhZCBjb2FjaFxuICogQHJldHVybnMgQ3JlYXRlZCB0ZWFtIGFuZCBtZW1iZXJzaGlwXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVUZWFtKGlucHV0OiBUZWFtQ3JlYXRlSW5wdXQsIHVzZXJJZDogc3RyaW5nKTogUHJvbWlzZTx7XG4gIHN1Y2Nlc3M6IGJvb2xlYW5cbiAgdGVhbT86IHtcbiAgICBpZDogc3RyaW5nXG4gICAgbmFtZTogc3RyaW5nXG4gICAgYWdlX3llYXJzOiBudW1iZXJcbiAgICBsZXZlbDogc3RyaW5nXG4gICAgc2Vhc29uOiBzdHJpbmdcbiAgICByZWdpb246IHN0cmluZ1xuICB9XG4gIG1lbWJlcnNoaXA/OiB7XG4gICAgaWQ6IHN0cmluZ1xuICAgIHJvbGU6IHN0cmluZ1xuICB9XG4gIGVycm9yPzogc3RyaW5nXG4gIHJlcXVpcmVzVmVyaWZpY2F0aW9uPzogYm9vbGVhblxufT4ge1xuICB0cnkge1xuICAgIC8vIENoZWNrIGlmIHVzZXIncyBlbWFpbCBpcyB2ZXJpZmllZCAodXNpbmcgb3VyIGN1c3RvbSBmaWVsZClcbiAgICBjb25zdCB7IGRhdGE6IHByb2ZpbGUsIGVycm9yOiBwcm9maWxlRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCd1c2VyX3Byb2ZpbGVzJylcbiAgICAgIC5zZWxlY3QoJ2VtYWlsX3ZlcmlmaWVkJylcbiAgICAgIC5lcSgnaWQnLCB1c2VySWQpXG4gICAgICAuc2luZ2xlKClcblxuICAgIGlmIChwcm9maWxlRXJyb3IgfHwgIXByb2ZpbGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ1VzZXIgcHJvZmlsZSBub3QgZm91bmQnLFxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcHJvZmlsZS5lbWFpbF92ZXJpZmllZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiAnUGxlYXNlIHZlcmlmeSB5b3VyIGVtYWlsIGFkZHJlc3MgYmVmb3JlIGNyZWF0aW5nIGEgdGVhbScsXG4gICAgICAgIHJlcXVpcmVzVmVyaWZpY2F0aW9uOiB0cnVlLFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGlucHV0XG4gICAgY29uc3QgdmFsaWRhdGVkRGF0YSA9IHRlYW1DcmVhdGVTY2hlbWEucGFyc2UoaW5wdXQpXG5cbiAgICAvLyAxLiBDcmVhdGUgdGVhbVxuICAgIGNvbnN0IHsgZGF0YTogdGVhbSwgZXJyb3I6IHRlYW1FcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ3RlYW1zJylcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICBvcmdhbml6YXRpb25faWQ6IHZhbGlkYXRlZERhdGEub3JnYW5pemF0aW9uX2lkLFxuICAgICAgICBuYW1lOiB2YWxpZGF0ZWREYXRhLm5hbWUsXG4gICAgICAgIGFnZV95ZWFyczogdmFsaWRhdGVkRGF0YS5hZ2VfeWVhcnMsXG4gICAgICAgIGxldmVsOiB2YWxpZGF0ZWREYXRhLmxldmVsLFxuICAgICAgICBzZWFzb246IHZhbGlkYXRlZERhdGEuc2Vhc29uLFxuICAgICAgICByZWdpb246IHZhbGlkYXRlZERhdGEucmVnaW9uLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpXG5cbiAgICBpZiAodGVhbUVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIHRlYW06JywgdGVhbUVycm9yKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiAnRmFpbGVkIHRvIGNyZWF0ZSB0ZWFtJyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAyLiBBZGQgdXNlciBhcyBoZWFkIGNvYWNoXG4gICAgY29uc3QgeyBkYXRhOiBtZW1iZXJzaGlwLCBlcnJvcjogbWVtYmVyc2hpcEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluXG4gICAgICAuZnJvbSgndGVhbV9tZW1iZXJzJylcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0ZWFtX2lkOiB0ZWFtLmlkLFxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgIHJvbGU6ICdoZWFkX2NvYWNoJyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KCdpZCwgcm9sZScpXG4gICAgICAuc2luZ2xlKClcblxuICAgIGlmIChtZW1iZXJzaGlwRXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBhZGQgdXNlciBhcyBoZWFkIGNvYWNoOicsIG1lbWJlcnNoaXBFcnJvcilcbiAgICAgIC8vIFJvbGxiYWNrOiBkZWxldGUgdGhlIHRlYW1cbiAgICAgIGF3YWl0IHN1cGFiYXNlQWRtaW4uZnJvbSgndGVhbXMnKS5kZWxldGUoKS5lcSgnaWQnLCB0ZWFtLmlkKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiAnRmFpbGVkIHRvIGFkZCB1c2VyIGFzIGhlYWQgY29hY2gnLFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgdGVhbSxcbiAgICAgIG1lbWJlcnNoaXAsXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1VuZXhwZWN0ZWQgZXJyb3IgaW4gY3JlYXRlVGVhbTonLCBlcnJvcilcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogJ0FuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQnLFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdldCBVc2VyJ3MgVGVhbXNcbiAqXG4gKiBGZXRjaCBhbGwgdGVhbXMgdGhlIHVzZXIgYmVsb25ncyB0b1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclRlYW1zKHVzZXJJZDogc3RyaW5nKTogUHJvbWlzZTx7XG4gIHN1Y2Nlc3M6IGJvb2xlYW5cbiAgdGVhbXM/OiBBcnJheTx7XG4gICAgaWQ6IHN0cmluZ1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIGFnZV95ZWFyczogbnVtYmVyXG4gICAgYWdlX2dyb3VwX2Rpc3BsYXk6IHN0cmluZ1xuICAgIGxldmVsOiBzdHJpbmdcbiAgICBzZWFzb246IHN0cmluZ1xuICAgIHJlZ2lvbjogc3RyaW5nXG4gICAgb3JnYW5pemF0aW9uX2lkOiBzdHJpbmdcbiAgICByb2xlOiBzdHJpbmdcbiAgfT5cbiAgZXJyb3I/OiBzdHJpbmdcbn0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGRhdGE6IG1lbWJlcnNoaXBzLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ3RlYW1fbWVtYmVycycpXG4gICAgICAuc2VsZWN0KFxuICAgICAgICBgXG4gICAgICAgIHJvbGUsXG4gICAgICAgIHRlYW1zOnRlYW1faWQgKFxuICAgICAgICAgIGlkLFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgYWdlX3llYXJzLFxuICAgICAgICAgIGxldmVsLFxuICAgICAgICAgIHNlYXNvbixcbiAgICAgICAgICByZWdpb24sXG4gICAgICAgICAgb3JnYW5pemF0aW9uX2lkXG4gICAgICAgIClcbiAgICAgIGBcbiAgICAgIClcbiAgICAgIC5lcSgndXNlcl9pZCcsIHVzZXJJZClcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXIgdGVhbXM6JywgZXJyb3IpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggdGVhbXMnLFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFVzZSB0aGUgdGVhbXNfd2l0aF9hZ2VfZGlzcGxheSB2aWV3IGZvciBmb3JtYXR0ZWQgYWdlIGdyb3Vwc1xuICAgIGNvbnN0IHRlYW1JZHMgPSBtZW1iZXJzaGlwcz8ubWFwKChtOiBhbnkpID0+IG0udGVhbXMuaWQpIHx8IFtdXG5cbiAgICBpZiAodGVhbUlkcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIHRlYW1zOiBbXSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IGRhdGE6IHRlYW1zV2l0aERpc3BsYXksIGVycm9yOiBkaXNwbGF5RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCd0ZWFtc193aXRoX2FnZV9kaXNwbGF5JylcbiAgICAgIC5zZWxlY3QoJyonKVxuICAgICAgLmluKCdpZCcsIHRlYW1JZHMpXG5cbiAgICBpZiAoZGlzcGxheUVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggdGVhbXMgd2l0aCBkaXNwbGF5OicsIGRpc3BsYXlFcnJvcilcbiAgICAgIC8vIEZhbGxiYWNrIHRvIGJhc2ljIGRhdGFcbiAgICAgIGNvbnN0IHRlYW1zID1cbiAgICAgICAgbWVtYmVyc2hpcHM/Lm1hcCgobTogYW55KSA9PiAoe1xuICAgICAgICAgIC4uLm0udGVhbXMsXG4gICAgICAgICAgYWdlX2dyb3VwX2Rpc3BsYXk6IGAke20udGVhbXMuYWdlX3llYXJzfWAsIC8vIEZhbGxiYWNrXG4gICAgICAgICAgcm9sZTogbS5yb2xlLFxuICAgICAgICB9KSkgfHwgW11cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgdGVhbXMsXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWVyZ2Ugcm9sZSBpbmZvcm1hdGlvblxuICAgIGNvbnN0IHRlYW1zID0gdGVhbXNXaXRoRGlzcGxheS5tYXAoKHRlYW0pID0+IHtcbiAgICAgIGNvbnN0IG1lbWJlcnNoaXAgPSBtZW1iZXJzaGlwcz8uZmluZCgobTogYW55KSA9PiBtLnRlYW1zLmlkID09PSB0ZWFtLmlkKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4udGVhbSxcbiAgICAgICAgcm9sZTogbWVtYmVyc2hpcD8ucm9sZSB8fCAnbWVtYmVyJyxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICB0ZWFtcyxcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCBlcnJvciBpbiBnZXRVc2VyVGVhbXM6JywgZXJyb3IpXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkJyxcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgVGVhbSBieSBJRFxuICpcbiAqIEZldGNoIGEgc2luZ2xlIHRlYW0gYnkgSUQgKHdpdGggdXNlciBhY2Nlc3MgY2hlY2spXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUZWFtQnlJZChcbiAgdGVhbUlkOiBzdHJpbmcsXG4gIHVzZXJJZDogc3RyaW5nXG4pOiBQcm9taXNlPHtcbiAgc3VjY2VzczogYm9vbGVhblxuICB0ZWFtPzoge1xuICAgIGlkOiBzdHJpbmdcbiAgICBuYW1lOiBzdHJpbmdcbiAgICBhZ2VfeWVhcnM6IG51bWJlclxuICAgIGFnZV9ncm91cF9kaXNwbGF5OiBzdHJpbmdcbiAgICBsZXZlbDogc3RyaW5nXG4gICAgc2Vhc29uOiBzdHJpbmdcbiAgICByZWdpb246IHN0cmluZ1xuICAgIG9yZ2FuaXphdGlvbl9pZDogc3RyaW5nXG4gICAgcm9sZTogc3RyaW5nXG4gIH1cbiAgZXJyb3I/OiBzdHJpbmdcbn0+IHtcbiAgdHJ5IHtcbiAgICAvLyBGaXJzdCB2ZXJpZnkgdGhlIHVzZXIgaGFzIGFjY2VzcyB0byB0aGlzIHRlYW1cbiAgICBjb25zdCB7IGRhdGE6IG1lbWJlcnNoaXAsIGVycm9yOiBtZW1iZXJzaGlwRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCd0ZWFtX21lbWJlcnMnKVxuICAgICAgLnNlbGVjdCgncm9sZScpXG4gICAgICAuZXEoJ3RlYW1faWQnLCB0ZWFtSWQpXG4gICAgICAuZXEoJ3VzZXJfaWQnLCB1c2VySWQpXG4gICAgICAuc2luZ2xlKClcblxuICAgIGlmIChtZW1iZXJzaGlwRXJyb3IgfHwgIW1lbWJlcnNoaXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ1RlYW0gbm90IGZvdW5kIG9yIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MnLFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZldGNoIHRlYW0gd2l0aCBmb3JtYXR0ZWQgYWdlIGdyb3VwXG4gICAgY29uc3QgeyBkYXRhOiB0ZWFtLCBlcnJvcjogdGVhbUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluXG4gICAgICAuZnJvbSgndGVhbXNfd2l0aF9hZ2VfZGlzcGxheScpXG4gICAgICAuc2VsZWN0KCcqJylcbiAgICAgIC5lcSgnaWQnLCB0ZWFtSWQpXG4gICAgICAuc2luZ2xlKClcblxuICAgIGlmICh0ZWFtRXJyb3IgfHwgIXRlYW0pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCB0ZWFtOicsIHRlYW1FcnJvcilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCB0ZWFtIGRldGFpbHMnLFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgdGVhbToge1xuICAgICAgICAuLi50ZWFtLFxuICAgICAgICByb2xlOiBtZW1iZXJzaGlwLnJvbGUsXG4gICAgICB9LFxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdVbmV4cGVjdGVkIGVycm9yIGluIGdldFRlYW1CeUlkOicsIGVycm9yKVxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCcsXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVXBkYXRlIFRlYW1cbiAqXG4gKiBVcGRhdGUgdGVhbSBkZXRhaWxzIChuYW1lLCBsZXZlbCwgc2Vhc29uKVxuICogTm90ZTogYWdlX3llYXJzIGFuZCByZWdpb24gY2Fubm90IGJlIGNoYW5nZWRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRlYW0oXG4gIHRlYW1JZDogc3RyaW5nLFxuICBpbnB1dDogeyBuYW1lPzogc3RyaW5nOyBsZXZlbD86IHN0cmluZzsgc2Vhc29uPzogc3RyaW5nIH1cbik6IFByb21pc2U8e1xuICBzdWNjZXNzOiBib29sZWFuXG4gIHRlYW0/OiBhbnlcbiAgZXJyb3I/OiBzdHJpbmdcbn0+IHtcbiAgdHJ5IHtcbiAgICAvLyBWYWxpZGF0ZSBpbnB1dFxuICAgIGNvbnN0IHZhbGlkYXRlZERhdGEgPSB0ZWFtVXBkYXRlU2NoZW1hLnBhcnNlKGlucHV0KVxuXG4gICAgY29uc3QgeyBkYXRhOiB0ZWFtLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ3RlYW1zJylcbiAgICAgIC51cGRhdGUodmFsaWRhdGVkRGF0YSlcbiAgICAgIC5lcSgnaWQnLCB0ZWFtSWQpXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKVxuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gdXBkYXRlIHRlYW06JywgZXJyb3IpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICdGYWlsZWQgdG8gdXBkYXRlIHRlYW0nLFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgdGVhbSxcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCBlcnJvciBpbiB1cGRhdGVUZWFtOicsIGVycm9yKVxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCcsXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGVsZXRlIFRlYW1cbiAqXG4gKiBEZWxldGUgYSB0ZWFtIChyZXF1aXJlcyBoZWFkX2NvYWNoIHJvbGUpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUZWFtKHRlYW1JZDogc3RyaW5nKTogUHJvbWlzZTx7XG4gIHN1Y2Nlc3M6IGJvb2xlYW5cbiAgZXJyb3I/OiBzdHJpbmdcbn0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluLmZyb20oJ3RlYW1zJykuZGVsZXRlKCkuZXEoJ2lkJywgdGVhbUlkKVxuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZGVsZXRlIHRlYW06JywgZXJyb3IpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICdGYWlsZWQgdG8gZGVsZXRlIHRlYW0nLFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdVbmV4cGVjdGVkIGVycm9yIGluIGRlbGV0ZVRlYW06JywgZXJyb3IpXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkJyxcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgVGVhbSBNZW1iZXJzXG4gKlxuICogRmV0Y2ggYWxsIG1lbWJlcnMgb2YgYSB0ZWFtIHdpdGggdGhlaXIgdXNlciBwcm9maWxlIGluZm9cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRlYW1NZW1iZXJzKHRlYW1JZDogc3RyaW5nKTogUHJvbWlzZTx7XG4gIHN1Y2Nlc3M6IGJvb2xlYW5cbiAgbWVtYmVycz86IEFycmF5PHtcbiAgICBpZDogc3RyaW5nXG4gICAgdXNlcl9pZDogc3RyaW5nXG4gICAgcm9sZTogc3RyaW5nXG4gICAgY3JlYXRlZF9hdDogc3RyaW5nXG4gICAgZW1haWw6IHN0cmluZ1xuICAgIGZ1bGxfbmFtZTogc3RyaW5nIHwgbnVsbFxuICB9PlxuICBlcnJvcj86IHN0cmluZ1xufT4ge1xuICB0cnkge1xuICAgIC8vIEdldCB0ZWFtIG1lbWJlcnNcbiAgICBjb25zdCB7IGRhdGE6IG1lbWJlcnMsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluXG4gICAgICAuZnJvbSgndGVhbV9tZW1iZXJzJylcbiAgICAgIC5zZWxlY3QoJ2lkLCB1c2VyX2lkLCByb2xlLCBjcmVhdGVkX2F0JylcbiAgICAgIC5lcSgndGVhbV9pZCcsIHRlYW1JZClcbiAgICAgIC5vcmRlcignY3JlYXRlZF9hdCcsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCB0ZWFtIG1lbWJlcnM6JywgZXJyb3IpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggdGVhbSBtZW1iZXJzJyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIW1lbWJlcnMgfHwgbWVtYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lbWJlcnM6IFtdLFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdldCB1c2VyIHByb2ZpbGVzIGZvciBhbGwgbWVtYmVyc1xuICAgIGNvbnN0IHVzZXJJZHMgPSBtZW1iZXJzLm1hcCgobSkgPT4gbS51c2VyX2lkKVxuICAgIGNvbnN0IHsgZGF0YTogcHJvZmlsZXMsIGVycm9yOiBwcm9maWxlc0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluXG4gICAgICAuZnJvbSgndXNlcl9wcm9maWxlcycpXG4gICAgICAuc2VsZWN0KCdpZCwgZW1haWwsIGZ1bGxfbmFtZScpXG4gICAgICAuaW4oJ2lkJywgdXNlcklkcylcblxuICAgIGlmIChwcm9maWxlc0Vycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggdXNlciBwcm9maWxlczonLCBwcm9maWxlc0Vycm9yKVxuICAgICAgLy8gQ29udGludWUgd2l0aCBtZW1iZXJzIGRhdGEgYnV0IHdpdGhvdXQgcHJvZmlsZSBpbmZvXG4gICAgfVxuXG4gICAgLy8gTWVyZ2UgbWVtYmVyIGRhdGEgd2l0aCBwcm9maWxlIGRhdGFcbiAgICBjb25zdCBmb3JtYXR0ZWRNZW1iZXJzID0gbWVtYmVycy5tYXAoKG1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgcHJvZmlsZSA9IHByb2ZpbGVzPy5maW5kKChwKSA9PiBwLmlkID09PSBtZW1iZXIudXNlcl9pZClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBtZW1iZXIuaWQsXG4gICAgICAgIHVzZXJfaWQ6IG1lbWJlci51c2VyX2lkLFxuICAgICAgICByb2xlOiBtZW1iZXIucm9sZSxcbiAgICAgICAgY3JlYXRlZF9hdDogbWVtYmVyLmNyZWF0ZWRfYXQsXG4gICAgICAgIGVtYWlsOiBwcm9maWxlPy5lbWFpbCB8fCAnJyxcbiAgICAgICAgZnVsbF9uYW1lOiBwcm9maWxlPy5mdWxsX25hbWUgfHwgbnVsbCxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBtZW1iZXJzOiBmb3JtYXR0ZWRNZW1iZXJzLFxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdVbmV4cGVjdGVkIGVycm9yIGluIGdldFRlYW1NZW1iZXJzOicsIGVycm9yKVxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCcsXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWRkIFRlYW0gTWVtYmVyXG4gKlxuICogQWRkIGEgdXNlciB0byBhIHRlYW0gYnkgZW1haWxcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRlYW1NZW1iZXIoXG4gIHRlYW1JZDogc3RyaW5nLFxuICBlbWFpbDogc3RyaW5nLFxuICByb2xlOiAnaGVhZF9jb2FjaCcgfCAnYXNzaXN0YW50X2NvYWNoJyB8ICdtYW5hZ2VyJyB8ICdzdGF0X3RyYWNrZXInXG4pOiBQcm9taXNlPHtcbiAgc3VjY2VzczogYm9vbGVhblxuICBtZW1iZXI/OiBhbnlcbiAgZXJyb3I/OiBzdHJpbmdcbn0+IHtcbiAgdHJ5IHtcbiAgICAvLyAxLiBGaW5kIHVzZXIgYnkgZW1haWxcbiAgICBjb25zdCB7IGRhdGE6IHByb2ZpbGUsIGVycm9yOiBwcm9maWxlRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCd1c2VyX3Byb2ZpbGVzJylcbiAgICAgIC5zZWxlY3QoJ2lkLCBlbWFpbCcpXG4gICAgICAuZXEoJ2VtYWlsJywgZW1haWwpXG4gICAgICAubWF5YmVTaW5nbGUoKVxuXG4gICAgaWYgKHByb2ZpbGVFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmluZGluZyB1c2VyOicsIHByb2ZpbGVFcnJvcilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ0Vycm9yIGZpbmRpbmcgdXNlcicsXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwcm9maWxlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICdObyB1c2VyIGZvdW5kIHdpdGggdGhpcyBlbWFpbCBhZGRyZXNzJyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAyLiBDaGVjayBpZiBhbHJlYWR5IGEgbWVtYmVyXG4gICAgY29uc3QgeyBkYXRhOiBleGlzdGluZ01lbWJlciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ3RlYW1fbWVtYmVycycpXG4gICAgICAuc2VsZWN0KCdpZCcpXG4gICAgICAuZXEoJ3RlYW1faWQnLCB0ZWFtSWQpXG4gICAgICAuZXEoJ3VzZXJfaWQnLCBwcm9maWxlLmlkKVxuICAgICAgLm1heWJlU2luZ2xlKClcblxuICAgIGlmIChleGlzdGluZ01lbWJlcikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiAnVXNlciBpcyBhbHJlYWR5IGEgbWVtYmVyIG9mIHRoaXMgdGVhbScsXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMy4gQWRkIGFzIHRlYW0gbWVtYmVyXG4gICAgY29uc3QgeyBkYXRhOiBtZW1iZXIsIGVycm9yOiBtZW1iZXJFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ3RlYW1fbWVtYmVycycpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgdGVhbV9pZDogdGVhbUlkLFxuICAgICAgICB1c2VyX2lkOiBwcm9maWxlLmlkLFxuICAgICAgICByb2xlOiByb2xlLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpXG5cbiAgICBpZiAobWVtYmVyRXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBhZGQgdGVhbSBtZW1iZXI6JywgbWVtYmVyRXJyb3IpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICdGYWlsZWQgdG8gYWRkIHRlYW0gbWVtYmVyJyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIG1lbWJlcixcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCBlcnJvciBpbiBhZGRUZWFtTWVtYmVyOicsIGVycm9yKVxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCcsXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIFRlYW0gTWVtYmVyXG4gKlxuICogUmVtb3ZlIGEgdXNlciBmcm9tIGEgdGVhbVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlVGVhbU1lbWJlcihcbiAgdGVhbUlkOiBzdHJpbmcsXG4gIHVzZXJJZDogc3RyaW5nXG4pOiBQcm9taXNlPHtcbiAgc3VjY2VzczogYm9vbGVhblxuICBlcnJvcj86IHN0cmluZ1xufT4ge1xuICB0cnkge1xuICAgIC8vIENoZWNrIGlmIHRoaXMgaXMgdGhlIGxhc3QgaGVhZF9jb2FjaFxuICAgIGNvbnN0IHsgZGF0YTogaGVhZENvYWNoZXMgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCd0ZWFtX21lbWJlcnMnKVxuICAgICAgLnNlbGVjdCgnaWQsIHVzZXJfaWQnKVxuICAgICAgLmVxKCd0ZWFtX2lkJywgdGVhbUlkKVxuICAgICAgLmVxKCdyb2xlJywgJ2hlYWRfY29hY2gnKVxuXG4gICAgaWYgKGhlYWRDb2FjaGVzICYmIGhlYWRDb2FjaGVzLmxlbmd0aCA9PT0gMSAmJiBoZWFkQ29hY2hlc1swXS51c2VyX2lkID09PSB1c2VySWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ0Nhbm5vdCByZW1vdmUgdGhlIGxhc3QgaGVhZCBjb2FjaC4gQXNzaWduIGFub3RoZXIgaGVhZCBjb2FjaCBmaXJzdC4nLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCd0ZWFtX21lbWJlcnMnKVxuICAgICAgLmRlbGV0ZSgpXG4gICAgICAuZXEoJ3RlYW1faWQnLCB0ZWFtSWQpXG4gICAgICAuZXEoJ3VzZXJfaWQnLCB1c2VySWQpXG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byByZW1vdmUgdGVhbSBtZW1iZXI6JywgZXJyb3IpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICdGYWlsZWQgdG8gcmVtb3ZlIHRlYW0gbWVtYmVyJyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCBlcnJvciBpbiByZW1vdmVUZWFtTWVtYmVyOicsIGVycm9yKVxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCcsXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVXBkYXRlIFRlYW0gTWVtYmVyIFJvbGVcbiAqXG4gKiBDaGFuZ2UgYSB0ZWFtIG1lbWJlcidzIHJvbGVcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRlYW1NZW1iZXJSb2xlKFxuICB0ZWFtSWQ6IHN0cmluZyxcbiAgdXNlcklkOiBzdHJpbmcsXG4gIG5ld1JvbGU6ICdoZWFkX2NvYWNoJyB8ICdhc3Npc3RhbnRfY29hY2gnIHwgJ21hbmFnZXInIHwgJ3N0YXRfdHJhY2tlcidcbik6IFByb21pc2U8e1xuICBzdWNjZXNzOiBib29sZWFuXG4gIGVycm9yPzogc3RyaW5nXG59PiB7XG4gIHRyeSB7XG4gICAgLy8gSWYgY2hhbmdpbmcgRlJPTSBoZWFkX2NvYWNoLCBjaGVjayBpZiB0aGVyZSdzIGFub3RoZXIgaGVhZF9jb2FjaFxuICAgIGNvbnN0IHsgZGF0YTogY3VycmVudE1lbWJlciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ3RlYW1fbWVtYmVycycpXG4gICAgICAuc2VsZWN0KCdyb2xlJylcbiAgICAgIC5lcSgndGVhbV9pZCcsIHRlYW1JZClcbiAgICAgIC5lcSgndXNlcl9pZCcsIHVzZXJJZClcbiAgICAgIC5zaW5nbGUoKVxuXG4gICAgaWYgKGN1cnJlbnRNZW1iZXI/LnJvbGUgPT09ICdoZWFkX2NvYWNoJyAmJiBuZXdSb2xlICE9PSAnaGVhZF9jb2FjaCcpIHtcbiAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGFyZSBvdGhlciBoZWFkIGNvYWNoZXNcbiAgICAgIGNvbnN0IHsgZGF0YTogaGVhZENvYWNoZXMgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgICAgLmZyb20oJ3RlYW1fbWVtYmVycycpXG4gICAgICAgIC5zZWxlY3QoJ2lkJylcbiAgICAgICAgLmVxKCd0ZWFtX2lkJywgdGVhbUlkKVxuICAgICAgICAuZXEoJ3JvbGUnLCAnaGVhZF9jb2FjaCcpXG5cbiAgICAgIGlmIChoZWFkQ29hY2hlcyAmJiBoZWFkQ29hY2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogJ0Nhbm5vdCBjaGFuZ2Ugcm9sZS4gVGVhbSBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGhlYWQgY29hY2guJyxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCd0ZWFtX21lbWJlcnMnKVxuICAgICAgLnVwZGF0ZSh7IHJvbGU6IG5ld1JvbGUgfSlcbiAgICAgIC5lcSgndGVhbV9pZCcsIHRlYW1JZClcbiAgICAgIC5lcSgndXNlcl9pZCcsIHVzZXJJZClcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHVwZGF0ZSB0ZWFtIG1lbWJlciByb2xlOicsIGVycm9yKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiAnRmFpbGVkIHRvIHVwZGF0ZSByb2xlJyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCBlcnJvciBpbiB1cGRhdGVUZWFtTWVtYmVyUm9sZTonLCBlcnJvcilcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogJ0FuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQnLFxuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJnVEFrS3NCIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/lib/contexts/team-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamProvider",
    ()=>TeamProvider,
    "useTeam",
    ()=>useTeam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/db/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const TeamContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function TeamProvider(param) {
    let { children, initialTeamId } = param;
    _s();
    const [selectedTeamId, setSelectedTeamId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentTeam, setCurrentTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Get current user on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamProvider.useEffect": ()=>{
            async function getUser() {
                try {
                    const { data: { user }, error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                    if (userError) {
                        setError(userError.message);
                        return;
                    }
                    if (user) {
                        setUserId(user.id);
                    }
                } catch (err) {
                    console.error('Error getting user:', err);
                    setError('Failed to get user');
                }
            }
            getUser();
        }
    }["TeamProvider.useEffect"], []);
    // Initialize selected team from localStorage or initialTeamId
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamProvider.useEffect": ()=>{
            if (!userId) return;
            // Prefer explicit initialTeamId over localStorage
            if (initialTeamId) {
                setSelectedTeamId(initialTeamId);
                return;
            }
            // Load from localStorage
            const stored = localStorage.getItem("current_team_".concat(userId));
            if (stored) {
                setSelectedTeamId(stored);
            }
        }
    }["TeamProvider.useEffect"], [
        userId,
        initialTeamId
    ]);
    // Fetch team data when selectedTeamId changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamProvider.useEffect": ()=>{
            if (!selectedTeamId) {
                setCurrentTeam(null);
                return;
            }
            async function fetchTeam() {
                setIsLoading(true);
                setError(null);
                try {
                    const { data, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('teams_with_age_display').select('*').eq('id', selectedTeamId).single();
                    if (fetchError) {
                        setError(fetchError.message);
                        setCurrentTeam(null);
                    } else {
                        setCurrentTeam(data);
                    }
                } catch (err) {
                    console.error('Error fetching team:', err);
                    setError('Failed to fetch team');
                    setCurrentTeam(null);
                } finally{
                    setIsLoading(false);
                }
            }
            fetchTeam();
        }
    }["TeamProvider.useEffect"], [
        selectedTeamId
    ]);
    // Save to localStorage when selectedTeamId changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamProvider.useEffect": ()=>{
            if (!userId) return;
            if (selectedTeamId) {
                localStorage.setItem("current_team_".concat(userId), selectedTeamId);
            } else {
                localStorage.removeItem("current_team_".concat(userId));
            }
        }
    }["TeamProvider.useEffect"], [
        userId,
        selectedTeamId
    ]);
    const selectTeam = (teamId)=>{
        setSelectedTeamId(teamId);
    };
    const value = {
        selectedTeamId,
        currentTeam,
        selectTeam,
        isLoading,
        error
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TeamContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/code/hp2/packages/web/lib/contexts/team-context.tsx",
        lineNumber: 138,
        columnNumber: 10
    }, this);
}
_s(TeamProvider, "r67UhNHTEZLIozWCx3baZbj7kMw=");
_c = TeamProvider;
function useTeam() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TeamContext);
    if (context === undefined) {
        throw new Error('useTeam must be used within TeamProvider');
    }
    return context;
}
_s1(useTeam, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "TeamProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/components/teams/team-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamSelector",
    ()=>TeamSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function TeamSelector(param) {
    let { teams, selectedTeamId, onTeamChange } = param;
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectedTeam = teams.find((t)=>t.id === selectedTeamId);
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamSelector.useEffect": ()=>{
            function handleClickOutside(event) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }
            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
                return ({
                    "TeamSelector.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
                })["TeamSelector.useEffect"];
            }
        }
    }["TeamSelector.useEffect"], [
        isOpen
    ]);
    // Empty state: no teams
    if (teams.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 mb-4",
                    children: "No teams yet"
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/demo/teams/new",
                    className: "text-blue-600 hover:text-blue-800 font-medium",
                    children: "Create your first team"
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this);
    }
    const handleTeamSelect = (teamId)=>{
        onTeamChange(teamId);
        setIsOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setIsOpen(!isOpen),
                "aria-haspopup": "listbox",
                "aria-expanded": isOpen,
                "aria-label": "Select team",
                className: "w-full min-h-[56px] px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-between",
                children: [
                    selectedTeam ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-gray-900",
                                children: selectedTeam.name
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-500",
                                children: [
                                    selectedTeam.age_group_display,
                                    " • ",
                                    selectedTeam.level.toUpperCase()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-gray-900",
                        children: "Teams"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-5 h-5 text-gray-400 transition-transform ".concat(isOpen ? 'rotate-180' : ''),
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19 9l-7 7-7-7"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "listbox",
                    className: "py-2",
                    children: [
                        teams.map((team)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "option",
                                "aria-selected": team.id === selectedTeamId,
                                onClick: ()=>handleTeamSelect(team.id),
                                className: "w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors ".concat(team.id === selectedTeamId ? 'bg-blue-50 selected' : ''),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium ".concat(team.id === selectedTeamId ? 'text-blue-600' : 'text-gray-900'),
                                                    children: team.name
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-gray-500",
                                                    children: [
                                                        team.age_group_display,
                                                        " • ",
                                                        team.level.toUpperCase(),
                                                        " • ",
                                                        team.season
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                            lineNumber: 109,
                                            columnNumber: 19
                                        }, this),
                                        team.id === selectedTeamId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5 text-blue-600",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M5 13l4 4L19 7"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                                lineNumber: 130,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                            lineNumber: 124,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                    lineNumber: 108,
                                    columnNumber: 17
                                }, this)
                            }, team.id, false, {
                                fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-gray-200 my-2"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                            lineNumber: 143,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/demo/teams",
                            className: "block px-4 py-3 text-left hover:bg-gray-100 transition-colors",
                            onClick: ()=>setIsOpen(false),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 text-gray-600",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                                lineNumber: 158,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                                lineNumber: 164,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                        lineNumber: 152,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-gray-700",
                                        children: "Manage teams"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                lineNumber: 151,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/demo/teams/new",
                            className: "block px-4 py-3 text-left hover:bg-gray-100 transition-colors",
                            onClick: ()=>setIsOpen(false),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 text-blue-600",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M12 4v16m8-8H4"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                            lineNumber: 188,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                        lineNumber: 182,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-blue-600",
                                        children: "Create new team"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                        lineNumber: 195,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                    lineNumber: 96,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/teams/team-selector.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(TeamSelector, "uhOyve9TWk+bvhPJTPlaMsUEQAY=");
_c = TeamSelector;
var _c;
__turbopack_context__.k.register(_c, "TeamSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/app/actions/data:383ae4 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40c52ff0a08abb5ca278b4e1ffa60a8e290de064ef":"resendVerificationEmail"},"code/hp2/packages/web/app/actions/auth.ts",""] */ __turbopack_context__.s([
    "resendVerificationEmail",
    ()=>resendVerificationEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var resendVerificationEmail = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40c52ff0a08abb5ca278b4e1ffa60a8e290de064ef", __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "resendVerificationEmail"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcidcblxuaW1wb3J0IHsgc3VwYWJhc2VBZG1pbiB9IGZyb20gJ0AvbGliL2RiL3N1cGFiYXNlLWFkbWluJ1xuaW1wb3J0IHsgc2VuZEVtYWlsVmVyaWZpY2F0aW9uIH0gZnJvbSAnQC9saWIvZW1haWwvcmVzZW5kJ1xuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nXG5cbi8qKlxuICogQ3JlYXRlIFVzZXIgUHJvZmlsZSBhbmQgT3JnYW5pemF0aW9uXG4gKlxuICogQ2FsbGVkIGFmdGVyIHN1Y2Nlc3NmdWwgc2lnbnVwIHRvIGNyZWF0ZSB1c2VyIHByb2ZpbGUgYW5kIGRlZmF1bHQgb3JnYW5pemF0aW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVVc2VyUHJvZmlsZUFuZE9yZyhcbiAgdXNlcklkOiBzdHJpbmcsXG4gIGVtYWlsOiBzdHJpbmcsXG4gIGZ1bGxOYW1lPzogc3RyaW5nXG4pOiBQcm9taXNlPHtcbiAgc3VjY2VzczogYm9vbGVhblxuICBlcnJvcj86IHN0cmluZ1xufT4ge1xuICB0cnkge1xuICAgIC8vIDEuIENyZWF0ZSB1c2VyIHByb2ZpbGUgKGVtYWlsX3ZlcmlmaWVkIGRlZmF1bHRzIHRvIGZhbHNlKVxuICAgIGNvbnN0IHsgZXJyb3I6IHByb2ZpbGVFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ3VzZXJfcHJvZmlsZXMnKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIGVtYWlsOiBlbWFpbC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICBmdWxsX25hbWU6IGZ1bGxOYW1lIHx8IG51bGwsXG4gICAgICAgIGVtYWlsX3ZlcmlmaWVkOiBmYWxzZSwgLy8gRXhwbGljaXRseSBzZXQgdG8gZmFsc2UgdW50aWwgdGhleSB2ZXJpZnlcbiAgICAgIH0pXG5cbiAgICBpZiAocHJvZmlsZUVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIHVzZXIgcHJvZmlsZTonLCBwcm9maWxlRXJyb3IpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICdGYWlsZWQgdG8gY3JlYXRlIHVzZXIgcHJvZmlsZScsXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi4gQ3JlYXRlIGRlZmF1bHQgb3JnYW5pemF0aW9uXG4gICAgY29uc3Qgb3JnTmFtZSA9IGZ1bGxOYW1lXG4gICAgICA/IGAke2Z1bGxOYW1lfSdzIE9yZ2FuaXphdGlvbmBcbiAgICAgIDogYCR7ZW1haWwuc3BsaXQoJ0AnKVswXX0ncyBPcmdhbml6YXRpb25gXG5cbiAgICBjb25zdCB7IGVycm9yOiBvcmdFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ29yZ2FuaXphdGlvbnMnKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIG5hbWU6IG9yZ05hbWUsXG4gICAgICAgIG93bmVyX2lkOiB1c2VySWQsXG4gICAgICB9KVxuXG4gICAgaWYgKG9yZ0Vycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIG9yZ2FuaXphdGlvbjonLCBvcmdFcnJvcilcbiAgICAgIC8vIERvbid0IGZhaWwgLSBwcm9maWxlIHdhcyBjcmVhdGVkIHN1Y2Nlc3NmdWxseVxuICAgICAgLy8gVXNlciBjYW4gY3JlYXRlIG9yZ2FuaXphdGlvbiBsYXRlclxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdVbmV4cGVjdGVkIGVycm9yIGluIGNyZWF0ZVVzZXJQcm9maWxlQW5kT3JnOicsIGVycm9yKVxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCcsXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogU2VuZCBJbml0aWFsIEVtYWlsIFZlcmlmaWNhdGlvblxuICpcbiAqIENhbGxlZCBhZnRlciBzaWdudXAgdG8gc2VuZCB0aGUgZmlyc3QgdmVyaWZpY2F0aW9uIGVtYWlsXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kSW5pdGlhbFZlcmlmaWNhdGlvbkVtYWlsKFxuICB1c2VySWQ6IHN0cmluZyxcbiAgZW1haWw6IHN0cmluZ1xuKTogUHJvbWlzZTx7XG4gIHN1Y2Nlc3M6IGJvb2xlYW5cbiAgZXJyb3I/OiBzdHJpbmdcbn0+IHtcbiAgdHJ5IHtcbiAgICAvLyAxLiBHZW5lcmF0ZSBzZWN1cmUgdG9rZW5cbiAgICBjb25zdCB0b2tlbiA9IGNyeXB0by5yYW5kb21CeXRlcygzMikudG9TdHJpbmcoJ2hleCcpXG4gICAgY29uc3QgZXhwaXJlc0F0ID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIDI0ICogNjAgKiA2MCAqIDEwMDApIC8vIDI0IGhvdXJzXG5cbiAgICAvLyAyLiBEZWxldGUgYW55IGV4aXN0aW5nIHRva2VucyBmb3IgdGhpcyB1c2VyXG4gICAgYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ2VtYWlsX3ZlcmlmaWNhdGlvbl90b2tlbnMnKVxuICAgICAgLmRlbGV0ZSgpXG4gICAgICAuZXEoJ3VzZXJfaWQnLCB1c2VySWQpXG5cbiAgICAvLyAzLiBDcmVhdGUgbmV3IHZlcmlmaWNhdGlvbiB0b2tlblxuICAgIGNvbnN0IHsgZXJyb3I6IHRva2VuRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCdlbWFpbF92ZXJpZmljYXRpb25fdG9rZW5zJylcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgIHRva2VuLFxuICAgICAgICBleHBpcmVzX2F0OiBleHBpcmVzQXQudG9JU09TdHJpbmcoKSxcbiAgICAgIH0pXG5cbiAgICBpZiAodG9rZW5FcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGNyZWF0ZSB2ZXJpZmljYXRpb24gdG9rZW46JywgdG9rZW5FcnJvcilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ0ZhaWxlZCB0byBnZW5lcmF0ZSB2ZXJpZmljYXRpb24gbGluaycsXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gNC4gU2VuZCBlbWFpbCB2aWEgUmVzZW5kXG4gICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQUF9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcbiAgICBjb25zdCB2ZXJpZmljYXRpb25MaW5rID0gYCR7YmFzZVVybH0vYXV0aC92ZXJpZnktZW1haWw/dG9rZW49JHt0b2tlbn1gXG5cbiAgICBjb25zdCBlbWFpbFJlc3VsdCA9IGF3YWl0IHNlbmRFbWFpbFZlcmlmaWNhdGlvbihlbWFpbCwge1xuICAgICAgZW1haWwsXG4gICAgICB2ZXJpZmljYXRpb25MaW5rLFxuICAgIH0pXG5cbiAgICBpZiAoIWVtYWlsUmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogZW1haWxSZXN1bHQuZXJyb3IgfHwgJ0ZhaWxlZCB0byBzZW5kIHZlcmlmaWNhdGlvbiBlbWFpbCcsXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1VuZXhwZWN0ZWQgZXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWw6JywgZXJyb3IpXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkJyxcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXNlbmQgRW1haWwgVmVyaWZpY2F0aW9uXG4gKlxuICogR2VuZXJhdGVzIGEgbmV3IHZlcmlmaWNhdGlvbiB0b2tlbiBhbmQgc2VuZHMgZW1haWwgdmlhIFJlc2VuZFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzZW5kVmVyaWZpY2F0aW9uRW1haWwoXG4gIGVtYWlsOiBzdHJpbmdcbik6IFByb21pc2U8e1xuICBzdWNjZXNzOiBib29sZWFuXG4gIGVycm9yPzogc3RyaW5nXG59PiB7XG4gIHRyeSB7XG4gICAgLy8gMS4gRmluZCB1c2VyIGJ5IGVtYWlsXG4gICAgY29uc3QgeyBkYXRhOiBwcm9maWxlLCBlcnJvcjogcHJvZmlsZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluXG4gICAgICAuZnJvbSgndXNlcl9wcm9maWxlcycpXG4gICAgICAuc2VsZWN0KCdpZCwgZW1haWxfdmVyaWZpZWQnKVxuICAgICAgLmVxKCdlbWFpbCcsIGVtYWlsLnRvTG93ZXJDYXNlKCkpXG4gICAgICAuc2luZ2xlKClcblxuICAgIGlmIChwcm9maWxlRXJyb3IgfHwgIXByb2ZpbGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ1VzZXIgbm90IGZvdW5kJyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvZmlsZS5lbWFpbF92ZXJpZmllZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiAnRW1haWwgaXMgYWxyZWFkeSB2ZXJpZmllZCcsXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi4gR2VuZXJhdGUgc2VjdXJlIHRva2VuXG4gICAgY29uc3QgdG9rZW4gPSBjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpLnRvU3RyaW5nKCdoZXgnKVxuICAgIGNvbnN0IGV4cGlyZXNBdCA9IG5ldyBEYXRlKERhdGUubm93KCkgKyAyNCAqIDYwICogNjAgKiAxMDAwKSAvLyAyNCBob3Vyc1xuXG4gICAgLy8gMy4gRGVsZXRlIGFueSBleGlzdGluZyB0b2tlbnMgZm9yIHRoaXMgdXNlclxuICAgIGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCdlbWFpbF92ZXJpZmljYXRpb25fdG9rZW5zJylcbiAgICAgIC5kZWxldGUoKVxuICAgICAgLmVxKCd1c2VyX2lkJywgcHJvZmlsZS5pZClcblxuICAgIC8vIDQuIENyZWF0ZSBuZXcgdmVyaWZpY2F0aW9uIHRva2VuXG4gICAgY29uc3QgeyBlcnJvcjogdG9rZW5FcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ2VtYWlsX3ZlcmlmaWNhdGlvbl90b2tlbnMnKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHVzZXJfaWQ6IHByb2ZpbGUuaWQsXG4gICAgICAgIHRva2VuLFxuICAgICAgICBleHBpcmVzX2F0OiBleHBpcmVzQXQudG9JU09TdHJpbmcoKSxcbiAgICAgIH0pXG5cbiAgICBpZiAodG9rZW5FcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGNyZWF0ZSB2ZXJpZmljYXRpb24gdG9rZW46JywgdG9rZW5FcnJvcilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ0ZhaWxlZCB0byBnZW5lcmF0ZSB2ZXJpZmljYXRpb24gbGluaycsXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gNS4gU2VuZCBlbWFpbCB2aWEgUmVzZW5kXG4gICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQUF9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcbiAgICBjb25zdCB2ZXJpZmljYXRpb25MaW5rID0gYCR7YmFzZVVybH0vYXV0aC92ZXJpZnktZW1haWw/dG9rZW49JHt0b2tlbn1gXG5cbiAgICBjb25zdCBlbWFpbFJlc3VsdCA9IGF3YWl0IHNlbmRFbWFpbFZlcmlmaWNhdGlvbihlbWFpbCwge1xuICAgICAgZW1haWwsXG4gICAgICB2ZXJpZmljYXRpb25MaW5rLFxuICAgIH0pXG5cbiAgICBpZiAoIWVtYWlsUmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogZW1haWxSZXN1bHQuZXJyb3IgfHwgJ0ZhaWxlZCB0byBzZW5kIHZlcmlmaWNhdGlvbiBlbWFpbCcsXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1VuZXhwZWN0ZWQgZXJyb3IgcmVzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbDonLCBlcnJvcilcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogJ0FuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQnLFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFZlcmlmeSBFbWFpbCB3aXRoIFRva2VuXG4gKlxuICogVmFsaWRhdGVzIHRoZSB2ZXJpZmljYXRpb24gdG9rZW4gYW5kIG1hcmtzIGVtYWlsIGFzIHZlcmlmaWVkXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlFbWFpbFRva2VuKFxuICB0b2tlbjogc3RyaW5nXG4pOiBQcm9taXNlPHtcbiAgc3VjY2VzczogYm9vbGVhblxuICBlcnJvcj86IHN0cmluZ1xufT4ge1xuICB0cnkge1xuICAgIC8vIDEuIEZpbmQgdG9rZW4gaW4gZGF0YWJhc2VcbiAgICBjb25zdCB7IGRhdGE6IHRva2VuRGF0YSwgZXJyb3I6IHRva2VuRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCdlbWFpbF92ZXJpZmljYXRpb25fdG9rZW5zJylcbiAgICAgIC5zZWxlY3QoJ3VzZXJfaWQsIGV4cGlyZXNfYXQsIHZlcmlmaWVkX2F0JylcbiAgICAgIC5lcSgndG9rZW4nLCB0b2tlbilcbiAgICAgIC5zaW5nbGUoKVxuXG4gICAgaWYgKHRva2VuRXJyb3IgfHwgIXRva2VuRGF0YSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiAnSW52YWxpZCB2ZXJpZmljYXRpb24gbGluaycsXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi4gQ2hlY2sgaWYgYWxyZWFkeSB2ZXJpZmllZFxuICAgIGlmICh0b2tlbkRhdGEudmVyaWZpZWRfYXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ0VtYWlsIGFscmVhZHkgdmVyaWZpZWQnLFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIDMuIENoZWNrIGlmIGV4cGlyZWRcbiAgICBpZiAobmV3IERhdGUodG9rZW5EYXRhLmV4cGlyZXNfYXQpIDwgbmV3IERhdGUoKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiAnVmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWQuIFBsZWFzZSByZXF1ZXN0IGEgbmV3IG9uZS4nLFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIDQuIE1hcmsgdG9rZW4gYXMgdmVyaWZpZWRcbiAgICBhd2FpdCBzdXBhYmFzZUFkbWluXG4gICAgICAuZnJvbSgnZW1haWxfdmVyaWZpY2F0aW9uX3Rva2VucycpXG4gICAgICAudXBkYXRlKHsgdmVyaWZpZWRfYXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9KVxuICAgICAgLmVxKCd0b2tlbicsIHRva2VuKVxuXG4gICAgLy8gNS4gVXBkYXRlIHVzZXIgcHJvZmlsZSB0byBtYXJrIGVtYWlsIGFzIHZlcmlmaWVkXG4gICAgY29uc3QgeyBlcnJvcjogcHJvZmlsZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluXG4gICAgICAuZnJvbSgndXNlcl9wcm9maWxlcycpXG4gICAgICAudXBkYXRlKHsgZW1haWxfdmVyaWZpZWQ6IHRydWUgfSlcbiAgICAgIC5lcSgnaWQnLCB0b2tlbkRhdGEudXNlcl9pZClcblxuICAgIGlmIChwcm9maWxlRXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byB1cGRhdGUgcHJvZmlsZTonLCBwcm9maWxlRXJyb3IpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICdGYWlsZWQgdG8gdmVyaWZ5IGVtYWlsJyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCBlcnJvciB2ZXJpZnlpbmcgZW1haWw6JywgZXJyb3IpXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkJyxcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiMFRBNklzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmailVerificationBanner",
    ()=>EmailVerificationBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$data$3a$383ae4__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/app/actions/data:383ae4 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function EmailVerificationBanner(param) {
    let { email, onDismiss } = param;
    _s();
    const [isResending, setIsResending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resendStatus, setResendStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [isDismissed, setIsDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmailVerificationBanner.useEffect": ()=>{
            console.log('✅ EmailVerificationBanner MOUNTED with email:', email);
        }
    }["EmailVerificationBanner.useEffect"], [
        email
    ]);
    async function handleResend() {
        setIsResending(true);
        setResendStatus('idle');
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$data$3a$383ae4__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["resendVerificationEmail"])(email);
        if (result.success) {
            setResendStatus('success');
        } else {
            setResendStatus('error');
        }
        setIsResending(false);
    }
    function handleDismiss() {
        setIsDismissed(true);
        if (onDismiss) {
            onDismiss();
        }
    }
    if (isDismissed) {
        console.log('⚠️ Banner dismissed, not rendering');
        return null;
    }
    console.log('🎨 Rendering EmailVerificationBanner for:', email);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-amber-50 border-b border-amber-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-5 w-5 text-amber-600",
                                    fill: "none",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-amber-900",
                                        children: "Please verify your email address"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-amber-700",
                                        children: [
                                            "We sent a verification link to ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: email
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                                lineNumber: 72,
                                                columnNumber: 48
                                            }, this),
                                            ". You need to verify your email before you can create teams or invite members."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            resendStatus === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-green-700 font-medium",
                                children: "Email sent!"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, this),
                            resendStatus === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-700 font-medium",
                                children: "Failed to send"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleResend,
                                disabled: isResending || resendStatus === 'success',
                                className: "px-3 py-1.5 text-sm font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                children: isResending ? 'Sending...' : 'Resend Email'
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleDismiss,
                                className: "p-1 text-amber-700 hover:text-amber-900 rounded-md transition-colors",
                                "aria-label": "Dismiss",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-5 w-5",
                                    fill: "none",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M6 18L18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                        lineNumber: 108,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(EmailVerificationBanner, "d01m6ARjujeECVAcX6PTAqggKWY=");
_c = EmailVerificationBanner;
var _c;
__turbopack_context__.k.register(_c, "EmailVerificationBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/components/navigation/user-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserMenu",
    ()=>UserMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/db/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function UserMenu(param) {
    let { userEmail, emailVerified = true, currentPath } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserMenu.useEffect": ()=>{
            function handleClickOutside(event) {
                if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }
            // Close on Escape key
            function handleEscape(event) {
                if (event.key === 'Escape') {
                    var _buttonRef_current;
                    setIsOpen(false);
                    (_buttonRef_current = buttonRef.current) === null || _buttonRef_current === void 0 ? void 0 : _buttonRef_current.focus();
                }
            }
            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
                document.addEventListener('keydown', handleEscape);
                return ({
                    "UserMenu.useEffect": ()=>{
                        document.removeEventListener('mousedown', handleClickOutside);
                        document.removeEventListener('keydown', handleEscape);
                    }
                })["UserMenu.useEffect"];
            }
        }
    }["UserMenu.useEffect"], [
        isOpen
    ]);
    // Get user initials from email
    const getUserInitials = (email)=>{
        if (!email) return 'U';
        const parts = email.split('@')[0].split('.');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return email.slice(0, 2).toUpperCase();
    };
    const handleSignOut = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        router.push('/auth/signin');
    };
    const handleSettingsClick = ()=>{
        setIsOpen(false);
        router.push('/demo/settings');
    };
    const initials = getUserInitials(userEmail);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: buttonRef,
                onClick: ()=>setIsOpen(!isOpen),
                className: "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "aria-expanded": isOpen,
                "aria-haspopup": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold",
                        children: initials
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4 transition-transform ".concat(isOpen ? 'rotate-180' : ''),
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19 9l-7 7-7-7"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: menuRef,
                className: "absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200",
                role: "menu",
                "aria-orientation": "vertical",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-gray-900 truncate",
                                        children: userEmail
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this),
                                    emailVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 text-green-600",
                                        title: "Email verified",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "currentColor",
                                            viewBox: "0 0 20 20",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                                lineNumber: 112,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                            lineNumber: 111,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this),
                            !emailVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-amber-600 mt-1 flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-3 h-3",
                                        fill: "currentColor",
                                        viewBox: "0 0 20 20",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fillRule: "evenodd",
                                            d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                                            clipRule: "evenodd"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                            lineNumber: 124,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                        lineNumber: 123,
                                        columnNumber: 17
                                    }, this),
                                    "Not verified"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSettingsClick,
                        className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors ".concat(currentPath === '/demo/settings' ? 'bg-blue-50 text-blue-700' : ''),
                        role: "menuitem",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            "Settings"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSignOut,
                        className: "w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors border-t border-gray-200 mt-1 pt-2",
                        role: "menuitem",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                    lineNumber: 167,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            "Sign Out"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/navigation/user-menu.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(UserMenu, "X7b1ECXjz+WwdfqNK8wvhmIw3to=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = UserMenu;
var _c;
__turbopack_context__.k.register(_c, "UserMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/app/demo/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DemoLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/db/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$data$3a$ef839f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/app/actions/data:ef839f [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$contexts$2f$team$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/contexts/team-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$teams$2f$team$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/teams/team-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$auth$2f$email$2d$verification$2d$banner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/auth/email-verification-banner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$navigation$2f$user$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/navigation/user-menu.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function DemoLayoutContent(param) {
    let { children } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [teams, setTeams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [userEmail, setUserEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [emailVerified, setEmailVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { selectedTeamId, selectTeam } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$contexts$2f$team$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTeam"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DemoLayoutContent.useEffect": ()=>{
            const loadTeams = {
                "DemoLayoutContent.useEffect.loadTeams": async ()=>{
                    try {
                        // Get current user
                        const { data: { user }, error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                        if (userError || !user) {
                            console.log('Auth error, clearing session:', userError);
                            await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
                            setIsLoading(false);
                            return;
                        }
                        // Get user profile to check custom email_verified field
                        const { data: profile } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('user_profiles').select('email, email_verified').eq('id', user.id).single();
                        const email = (profile === null || profile === void 0 ? void 0 : profile.email) || user.email || null;
                        var _profile_email_verified;
                        const verified = (_profile_email_verified = profile === null || profile === void 0 ? void 0 : profile.email_verified) !== null && _profile_email_verified !== void 0 ? _profile_email_verified : false;
                        setUserEmail(email);
                        setEmailVerified(verified);
                        console.log('🔍 LAYOUT DEBUG:', {
                            email,
                            verified,
                            profileEmailVerified: profile === null || profile === void 0 ? void 0 : profile.email_verified,
                            supabaseEmailConfirmedAt: user.email_confirmed_at,
                            willShowBanner: !verified && !!email
                        });
                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$data$3a$ef839f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getUserTeams"])(user.id);
                        if (result.success && result.teams) {
                            setTeams(result.teams);
                        }
                    } catch (err) {
                        console.error('Error loading teams:', err);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["DemoLayoutContent.useEffect.loadTeams"];
            loadTeams();
        }
    }["DemoLayoutContent.useEffect"], []);
    const handleTeamChange = (teamId)=>{
        selectTeam(teamId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "bg-white border-b border-gray-200 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center h-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push('/demo/teams'),
                                    className: "text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors",
                                    children: "HockeyPilot"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 max-w-md mx-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$teams$2f$team$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TeamSelector"], {
                                    teams: teams,
                                    selectedTeamId: selectedTeamId,
                                    onTeamChange: handleTeamChange
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                                    lineNumber: 103,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    selectedTeamId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>router.push('/demo/game-tracking'),
                                                className: "px-3 py-2 rounded-md text-sm font-medium transition-colors ".concat(pathname === '/demo/game-tracking' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'),
                                                children: "Track Game"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                                                lineNumber: 115,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>router.push('/demo/analytics'),
                                                className: "px-3 py-2 rounded-md text-sm font-medium transition-colors ".concat(pathname === '/demo/analytics' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'),
                                                children: "Analytics"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>router.push('/demo/practice-history'),
                                                className: "px-3 py-2 rounded-md text-sm font-medium transition-colors ".concat(pathname === '/demo/practice-history' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'),
                                                children: "Practices"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                                                lineNumber: 135,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$navigation$2f$user$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserMenu"], {
                                        userEmail: userEmail,
                                        emailVerified: emailVerified,
                                        currentPath: pathname
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            (()=>{
                const shouldShow = !isLoading && userEmail && !emailVerified;
                console.log('🎨 BANNER RENDER CHECK:', {
                    isLoading,
                    userEmail,
                    emailVerified,
                    shouldShow
                });
                return shouldShow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$auth$2f$email$2d$verification$2d$banner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmailVerificationBanner"], {
                    email: userEmail
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                    lineNumber: 168,
                    columnNumber: 29
                }, this) : null;
            })(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: children
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(DemoLayoutContent, "3XwH+oaauQ8rkrGT9l1WvVOuoP0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$contexts$2f$team$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTeam"]
    ];
});
_c = DemoLayoutContent;
function DemoLayout(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$contexts$2f$team$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TeamProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DemoLayoutContent, {
            children: children
        }, void 0, false, {
            fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
            lineNumber: 184,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/hp2/packages/web/app/demo/layout.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
_c1 = DemoLayout;
var _c, _c1;
__turbopack_context__.k.register(_c, "DemoLayoutContent");
__turbopack_context__.k.register(_c1, "DemoLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=code_hp2_packages_web_13e6869f._.js.map
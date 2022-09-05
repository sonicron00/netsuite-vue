/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
define(["require", "exports", "./render", "./response"], function (require, exports, render_1, response_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(render_1, exports);
    __exportStar(response_1, exports);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unformatNumber = exports.formatNumber = void 0;
function formatNumber(num) {
    let amt;
    if (typeof num != "number") {
        amt = Number(num.replace(/[^\d]/g, ""));
    }
    else {
        amt = Number(num);
    }
    return amt;
}
exports.formatNumber = formatNumber;
;
function unformatNumber(num) {
    let value = Number(num / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
    if (value === "NaN") {
        value = "0";
    }
    return value;
}
exports.unformatNumber = unformatNumber;
;
//# sourceMappingURL=moneyUtils.js.map
"use strict";
/**
 * Created by soldi on 31-07-16.
 */
var EnumUtil = (function () {
    function EnumUtil() {
    }
    EnumUtil.getNamesAndValues = function (e) {
        return this.getNames(e).map(function (n) { return { name: n, value: e[n] }; });
    };
    EnumUtil.getNames = function (e) {
        return this.getObjValues(e).filter(function (v) { return typeof v === "string"; });
    };
    EnumUtil.getValues = function (e) {
        return this.getObjValues(e).filter(function (v) { return typeof v === "number"; });
    };
    EnumUtil.getObjValues = function (e) {
        return Object.keys(e).map(function (k) { return e[k]; });
    };
    return EnumUtil;
}());
exports.EnumUtil = EnumUtil;
//# sourceMappingURL=enum-util.class.js.map
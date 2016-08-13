"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by soldi on 31-07-16.
 */
var http_1 = require("@angular/http");
var JsonRequestOptions = (function (_super) {
    __extends(JsonRequestOptions, _super);
    function JsonRequestOptions() {
        _super.call(this, {
            headers: new http_1.Headers({
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            })
        });
    }
    return JsonRequestOptions;
}(http_1.RequestOptions));
exports.JsonRequestOptions = JsonRequestOptions;
//# sourceMappingURL=jsonrequestoptions.class.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bundle"],{

/***/ 0:
/*!*************************************!*\
  !*** multi ./assets/scripts/app.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/scripts/app.js */"UpDF");


/***/ }),

/***/ "AAND":
/*!*******************************!*\
  !*** ./assets/scripts/add.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var add = function add(first, second) {
  return first + second;
};
exports.default = add;

/***/ }),

/***/ "UpDF":
/*!*******************************!*\
  !*** ./assets/scripts/app.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _add = __webpack_require__(/*! ./add */ "AAND");

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var multiply = function multiply(first, second) {
    var result = 0;
    for (var counter = 0; counter < second; counter++) {
        result = (0, _add2.default)(result, first);
    }
    return result;
};

exports.default = multiply;

/***/ })

},[[0,"runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvc2NyaXB0cy9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NjcmlwdHMvYXBwLmpzIl0sIm5hbWVzIjpbImFkZCIsImZpcnN0Iiwic2Vjb25kIiwibXVsdGlwbHkiLCJyZXN1bHQiLCJjb3VudGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU0sQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSO0FBQUEsU0FBbUJELFFBQVFDLE1BQTNCO0FBQUEsQ0FBWjtrQkFDZUYsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRGY7Ozs7OztBQUVBLElBQU1HLFdBQVcsU0FBWEEsUUFBVyxDQUFDRixLQUFELEVBQVFDLE1BQVIsRUFBbUI7QUFDaEMsUUFBSUUsU0FBUyxDQUFiO0FBQ0EsU0FBSyxJQUFJQyxVQUFVLENBQW5CLEVBQXNCQSxVQUFVSCxNQUFoQyxFQUF3Q0csU0FBeEMsRUFBbUQ7QUFDL0NELGlCQUFTLG1CQUFJQSxNQUFKLEVBQVlILEtBQVosQ0FBVDtBQUNIO0FBQ0QsV0FBT0csTUFBUDtBQUNILENBTkQ7O2tCQVFlRCxRIiwiZmlsZSI6ImJ1bmRsZS42MTAwMjExYTA5OTVjZGVjMzk3OS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFkZCA9IChmaXJzdCwgc2Vjb25kKSA9PiBmaXJzdCArIHNlY29uZFxuZXhwb3J0IGRlZmF1bHQgYWRkIiwiaW1wb3J0IGFkZCBmcm9tICcuL2FkZCdcblxuY29uc3QgbXVsdGlwbHkgPSAoZmlyc3QsIHNlY29uZCkgPT4ge1xuICAgIGxldCByZXN1bHQgPSAwXG4gICAgZm9yIChsZXQgY291bnRlciA9IDA7IGNvdW50ZXIgPCBzZWNvbmQ7IGNvdW50ZXIrKykge1xuICAgICAgICByZXN1bHQgPSBhZGQocmVzdWx0LCBmaXJzdClcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZGVmYXVsdCBtdWx0aXBseSJdLCJzb3VyY2VSb290IjoiIn0=
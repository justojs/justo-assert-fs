"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _assert = require("assert");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var 





AssertionError = function (_AssertionError2) {_inherits(AssertionError, _AssertionError2);






  function AssertionError(msg1, msg2) {_classCallCheck(this, AssertionError);

    if (!msg1 && !msg2) throw new Error("Error message expected.");return _possibleConstructorReturn(this, Object.getPrototypeOf(AssertionError).call(this, 


    { message: msg2 || msg1 }));}return AssertionError;}(_assert.AssertionError);exports.default = AssertionError;

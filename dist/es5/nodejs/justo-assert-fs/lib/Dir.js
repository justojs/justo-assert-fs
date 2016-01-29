"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });var _fs = require("fs");var _fs2 = _interopRequireDefault(_fs);var _path = require("path");var _path2 = _interopRequireDefault(_path);var _AssertionError = require("./AssertionError");var _AssertionError2 = _interopRequireDefault(_AssertionError);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 









Dir = function () {



  function Dir(path) {_classCallCheck(this, Dir);
    Object.defineProperty(this, "path", { value: path });
    Object.defineProperty(this, "must", { value: new DirMust(this) });}_createClass(Dir, [{ key: "exists", value: function exists() 







    {
      try {
        return _fs2.default.statSync(this.path).isDirectory();} 
      catch (e) {
        return false;}} }]);return Dir;}();exports.default = Dir;var 









DirMustBase = function () {





  function DirMustBase(dir) {_classCallCheck(this, DirMustBase);
    Object.defineProperty(this, "dir", { value: dir });}_createClass(DirMustBase, [{ key: "dirPath", get: function get() 







    {
      return this.dir.path;} }]);return DirMustBase;}();var 








DirMust = function (_DirMustBase) {_inherits(DirMust, _DirMustBase);





  function DirMust(dir) {_classCallCheck(this, DirMust);return _possibleConstructorReturn(this, Object.getPrototypeOf(DirMust).call(this, 
    dir));}_createClass(DirMust, [{ key: "exist", value: function exist(














    msg) {
      if (!this.dir.exists()) {
        throw new _AssertionError2.default("'" + this.dirPath + "' must exist.", msg);}} }, { key: "have", value: function have(














    entries, msg) {

      if (typeof entries == "string") entries = [entries];


      for (var i = 0; i < entries.length; ++i) {
        var entry = entries[i];

        if (!_fs2.default.existsSync(_path2.default.join(this.dirPath, entry))) {
          throw new _AssertionError2.default("'" + this.dirPath + "' must contain an entry '" + entry + "'.", msg);}}} }, { key: "contain", value: function contain() 








    {
      this.have.apply(this, arguments);} }, { key: "not", get: function get() {return new DirMustNot(this.dir);} }]);return DirMust;}(DirMustBase);var 






DirMustNot = function (_DirMustBase2) {_inherits(DirMustNot, _DirMustBase2);





  function DirMustNot(dir) {_classCallCheck(this, DirMustNot);return _possibleConstructorReturn(this, Object.getPrototypeOf(DirMustNot).call(this, 
    dir));}_createClass(DirMustNot, [{ key: "exist", value: function exist(







    msg) {
      if (this.dir.exists()) {
        throw new _AssertionError2.default("'" + this.dirPath + "' must not exist.", msg);}} }, { key: "have", value: function have(














    entries, msg) {

      if (typeof entries == "string") entries = [entries];


      for (var i = 0; i < entries.length; ++i) {
        var entry = entries[i];

        if (_fs2.default.existsSync(_path2.default.join(this.dirPath, entry))) {
          throw new _AssertionError2.default("'" + this.dirPath + "' must not contain an entry '" + entry + "'.", msg);}}} }, { key: "contain", value: function contain() 








    {
      this.have.apply(this, arguments);} }]);return DirMustNot;}(DirMustBase);

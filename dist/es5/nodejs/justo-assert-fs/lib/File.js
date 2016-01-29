"use strict";var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });var _fs = require("fs");var _fs2 = _interopRequireDefault(_fs);var _jsonfile = require("jsonfile");var _jsonfile2 = _interopRequireDefault(_jsonfile);var _jsYaml = require("js-yaml");var _jsYaml2 = _interopRequireDefault(_jsYaml);var _AssertionError = require("./AssertionError");var _AssertionError2 = _interopRequireDefault(_AssertionError);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 











File = function () {





  function File(path) {_classCallCheck(this, File);
    Object.defineProperty(this, "path", { value: path });
    Object.defineProperty(this, "must", { value: new FileMust(this) });}_createClass(File, [{ key: "exists", value: function exists() 







    {
      try {
        return _fs2.default.statSync(this.path).isFile();} 
      catch (e) {
        return false;}} }, { key: "yaml", get: function get() 








    {
      var con;


      try {
        con = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(this.path, "utf8"));} 
      catch (e) {}



      if ((typeof con === "undefined" ? "undefined" : _typeof(con)) != "object") throw new _AssertionError2.default("'" + this.path + "' must be a YAML file.");


      return con;} }, { key: "yml", get: function get() 





    {
      return this.yaml;} }, { key: "json", get: function get() 







    {
      var con;


      try {
        con = _jsonfile2.default.readFileSync(this.path);} 
      catch (e) {
        throw new _AssertionError2.default("'" + this.path + "' must be a JSON file.");}



      return con;} }, { key: "text", get: function get() 







    {
      return _fs2.default.readFileSync(this.path, "utf8");} }]);return File;}();exports.default = File;var 








FileMustBase = function () {





  function FileMustBase(file) {_classCallCheck(this, FileMustBase);
    Object.defineProperty(this, "file", { value: file });}_createClass(FileMustBase, [{ key: "filePath", get: function get() 







    {
      return this.file.path;} }]);return FileMustBase;}();var 








FileMust = function (_FileMustBase) {_inherits(FileMust, _FileMustBase);





  function FileMust(file) {_classCallCheck(this, FileMust);return _possibleConstructorReturn(this, Object.getPrototypeOf(FileMust).call(this, 
    file));}_createClass(FileMust, [{ key: "contain", value: function contain() 



























    {
      var txts, msg, con;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}


      if (args.length === 0) throw new Error("Text to check expected.");else 
      if (args.length == 1) txts = args[0];else {
        ;txts = args[0];msg = args[1];}

      if (typeof txts == "string") txts = [txts];


      if (!this.file.exists()) {
        throw new _AssertionError2.default("'" + this.filePath + "' must exist.", msg);}



      con = _fs2.default.readFileSync(this.filePath, "utf8");

      for (var i = 0; i < txts.length; ++i) {
        var txt = txts[i];

        if (con.indexOf(txt) < 0) throw new _AssertionError2.default("'" + this.filePath + "' must contain '" + txt + "'.", msg);}} }, { key: "exist", value: function exist(








    msg) {
      if (!this.file.exists()) {
        throw new _AssertionError2.default("'" + this.filePath + "' must exist.", msg);}} }, { key: "not", get: function get() {return new FileMustNot(this.file);} }, { key: "be", get: function get() {return new FileMustBe(this.file);} }]);return FileMust;}(FileMustBase);var 







FileMustNot = function (_FileMustBase2) {_inherits(FileMustNot, _FileMustBase2);





  function FileMustNot(file) {_classCallCheck(this, FileMustNot);return _possibleConstructorReturn(this, Object.getPrototypeOf(FileMustNot).call(this, 
    file));}_createClass(FileMustNot, [{ key: "contain", value: function contain() 




















    {
      var txts, msg;for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}


      if (args.length === 0) throw new Error("Text to check expected.");else 
      if (args.length == 1) txts = args[0];else {
        ;txts = args[0];msg = args[1];}

      if (typeof txts == "string") txts = [txts];


      if (this.file.exists()) {
        var con = _fs2.default.readFileSync(this.filePath, "utf8");

        for (var i = 0; i < txts.length; ++i) {
          var txt = txts[i];

          if (con.indexOf(txt) >= 0) throw new _AssertionError2.default("'" + this.filePath + "' must not contain '" + txt + "'.", msg);}}} }, { key: "exist", value: function exist(









    msg) {
      if (this.file.exists()) {
        throw new _AssertionError2.default("'" + this.filePath + "' must not exist.", msg);}} }, { key: "be", get: function get() {return new MustNotBe(this.file);} }]);return FileMustNot;}(FileMustBase);var 







FileMustBe = function (_FileMustBase3) {_inherits(FileMustBe, _FileMustBase3);





  function FileMustBe(file) {_classCallCheck(this, FileMustBe);return _possibleConstructorReturn(this, Object.getPrototypeOf(FileMustBe).call(this, 
    file));}_createClass(FileMustBe, [{ key: "equal", value: function equal(








    text, msg) {
      var con, check;


      if (!this.file.exists()) {
        throw new _AssertionError2.default("'" + this.filePath + "' must exist.", msg);}



      con = _fs2.default.readFileSync(this.filePath, "utf8");

      if (con != text) {
        throw new _AssertionError2.default("'" + this.filePath + "' content must be equal to '" + text + "'. Read: '" + con + "'.", msg);}} }, { key: "eq", value: function eq() 






    {
      this.equal.apply(this, arguments);} }, { key: "json", value: function json(







    msg) {
      if (!this.file.exists()) {
        throw new _AssertionError2.default("'" + this.filePath + "' must exist.", msg);} else 
      {
        try {
          var con = this.file.json;} 
        catch (e) {
          throw new _AssertionError2.default(e.message, msg);}}} }, { key: "yaml", value: function yaml(









    msg) {
      if (!this.file.exists()) {
        throw new _AssertionError2.default("'" + this.filePath + "' must exist.", msg);} else 
      {
        try {
          var con = this.file.yaml;} 
        catch (e) {
          throw new _AssertionError2.default(e.message, msg);}}} }, { key: "yml", value: function yml() 







    {
      this.yaml.apply(this, arguments);} }]);return FileMustBe;}(FileMustBase);var 






MustNotBe = function (_FileMustBase4) {_inherits(MustNotBe, _FileMustBase4);





  function MustNotBe(file) {_classCallCheck(this, MustNotBe);return _possibleConstructorReturn(this, Object.getPrototypeOf(MustNotBe).call(this, 
    file));}_createClass(MustNotBe, [{ key: "equal", value: function equal(








    text, msg) {
      if (this.file.exists()) {
        if (_fs2.default.readFileSync(this.filePath, "utf8") == text) {
          throw new _AssertionError2.default("'" + this.filePath + "' content must not be equal to '" + text + "'.", msg);}}} }, { key: "eq", value: function eq() 







    {
      this.equal.apply(this, arguments);} }, { key: "json", value: function json(







    msg) {
      var con;

      if (this.file.exists()) {
        try {
          con = this.file.json;} 
        catch (e) {}



        if (con) throw new _AssertionError2.default("'" + this.filePath + "' must not be a JSON file.", msg);}} }, { key: "yaml", value: function yaml(








    msg) {
      var con;

      if (this.file.exists()) {
        try {
          con = this.file.yaml;} 
        catch (e) {}



        if (con) throw new _AssertionError2.default("'" + this.filePath + "' must not be a YAML file.", msg);}} }, { key: "yml", value: function yml() 






    {
      this.yaml.apply(this, arguments);} }]);return MustNotBe;}(FileMustBase);

"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.















file = file;exports.






















dir = dir;var _path = require("path");var _path2 = _interopRequireDefault(_path);var _File = require("./lib/File");var _File2 = _interopRequireDefault(_File);var _Dir = require("./lib/Dir");var _Dir2 = _interopRequireDefault(_Dir);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function file() {var fp;if (arguments.length === 0) throw new Error("File path expected.");else if (arguments.length == 1) fp = arguments.length <= 0 ? undefined : arguments[0];else fp = _path2.default.join.apply(_path2.default, arguments);return new _File2.default(fp);}function dir() {
  var dp;


  if (arguments.length === 0) throw new Error("Directory path expected.");else 
  if (arguments.length == 1) dp = arguments.length <= 0 ? undefined : arguments[0];else 
  dp = _path2.default.join.apply(_path2.default, arguments);


  return new _Dir2.default(dp);}

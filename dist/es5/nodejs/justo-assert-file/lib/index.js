"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Creates a file wrapper for asserting.
 *
 * @overload
 * @param path:string The file path.
 * @return File
 *
 * @overload
 * @param dir:string  The directory path.
 * @param file:string The file name.
 */
exports.file = file;

/**
 * Creates a dir wrapper for asserting.
 *
 * @overload
 * @param path:string   The directory path.
 * @return Dir
 *
 * @overload
 * @param parent:string The parent directory.
 * @param name:string   The directory name.
 */
exports.dir = dir;
//imports
var _AssertionError = require("assert").AssertionError;

/**
 * An assertion error.
 */

var AssertionError = (function (_AssertionError2) {
  /**
   * Initializes the error.
   *
   * @param msg1:string   The default message.
   * @param [msg2]:string The custom message.
   */

  function AssertionError(msg1, msg2) {
    _classCallCheck(this, AssertionError);

    //(1) arguments
    if (!msg1 && !msg2) throw new Error("Error message expected.");

    //(2) superconstructor
    _get(Object.getPrototypeOf(AssertionError.prototype), "constructor", this).call(this, { message: msg2 || msg1 });
  }

  _inherits(AssertionError, _AssertionError2);

  return AssertionError;
})(_AssertionError);

/**
 * A directory wrapper.
 *
 * @readonly path:string  The directory path.
 */

var Dir = (function () {
  /**
   * Constructor.
   */

  function Dir(path) {
    _classCallCheck(this, Dir);

    Object.defineProperty(this, "path", { value: path });
    Object.defineProperty(this, "must", { value: new DirMust(this) });
  }

  _createClass(Dir, [{
    key: "exists",

    /**
     * Returns if the directory exists.
     *
     * @return boolean
     */
    value: function exists() {
      try {
        return fs.statSync(this.path).isDirectory();
      } catch (e) {
        return false;
      }
    }
  }]);

  return Dir;
})();

/**
 * DirMust base.
 *
 * @readonly dir:Dir  The directory.
 */

var DirMustBase = (function () {
  /**
   * Constructor.
   *
   * @param(attr) dir
   */

  function DirMustBase(dir) {
    _classCallCheck(this, DirMustBase);

    Object.defineProperty(this, "dir", { value: dir });
  }

  _createClass(DirMustBase, [{
    key: "dirPath",

    /**
     * The file path.
     *
     * @type string
     */
    get: function () {
      return this.dir.path;
    }
  }]);

  return DirMustBase;
})();

/**
 * A wrapper file for asserting.
 *
 * @readonly dir:Dir  The directory.
 */

var DirMust = (function (_DirMustBase) {
  /**
   * Constructor.
   *
   * @param(attr) dir
   */

  function DirMust(dir) {
    _classCallCheck(this, DirMust);

    _get(Object.getPrototypeOf(DirMust.prototype), "constructor", this).call(this, dir);
  }

  _inherits(DirMust, _DirMustBase);

  _createClass(DirMust, [{
    key: "not",

    /**
     * The must.not.
     */
    get: function () {
      return new DirMustNot(this.dir);
    }
  }, {
    key: "exist",

    /**
     * Checks whether the directory exists.
     *
     * @param [msg]:string  The assertion error.
     */
    value: function exist(msg) {
      if (!this.dir.exists()) {
        throw new AssertionError("'" + this.dirPath + "' must exist.", msg);
      }
    }
  }, {
    key: "contain",

    /**
     * Checks whether the directory contains an entry.
     *
     * @param entry:string  The entry name.
     * @param [msg]:string  The assertion message.
     */
    value: function contain(entry, msg) {
      if (!fs.existsSync(path.join(this.dirPath, entry))) {
        throw new AssertionError("'" + this.dirPath + "' must contain an entry '" + entry + "'.", msg);
      }
    }
  }]);

  return DirMust;
})(DirMustBase);

/**
 * must.not.
 */

var DirMustNot = (function (_DirMustBase2) {
  /**
   * Constructor.
   *
   * @param(attr) dir
   */

  function DirMustNot(dir) {
    _classCallCheck(this, DirMustNot);

    _get(Object.getPrototypeOf(DirMustNot.prototype), "constructor", this).call(this, dir);
  }

  _inherits(DirMustNot, _DirMustBase2);

  _createClass(DirMustNot, [{
    key: "exist",

    /**
     * Checks whether the directory doesn't exist.
     *
     * @param [msg]:string  The assertion error.
     */
    value: function exist(msg) {
      if (this.dir.exists()) {
        throw new AssertionError("'" + this.dirPath + "' must not exist.", msg);
      }
    }
  }, {
    key: "contain",

    /**
     * Checks whether a directory doesn't contain an entry.
     *
     * @param entry:string  The entry name.
     * @param [msg]:string  The assertion message.
     */
    value: function contain(entry, msg) {
      if (fs.existsSync(path.join(this.dirPath, entry))) {
        throw new AssertionError("'" + this.dirPath + "' must not contain an entry '" + entry + "'.", msg);
      }
    }
  }]);

  return DirMustNot;
})(DirMustBase);

//imports
var fs = require("fs");
var jsonfile = require("jsonfile");
var assert = require("assert");

/**
 * A wrapper file.
 *
 * @readonly path:string  The file path.
 * @readonly must:object  The assertion-API object,
 */

var File = (function () {
  /**
   * Constructor.
   *
   * @param(attr) path
   */

  function File(path) {
    _classCallCheck(this, File);

    Object.defineProperty(this, "path", { value: path });
    Object.defineProperty(this, "must", { value: new FileMust(this) });
  }

  _createClass(File, [{
    key: "exists",

    /**
     * Returns if the file exists.
     *
     * @return boolean
     */
    value: function exists() {
      try {
        return fs.statSync(this.path).isFile();
      } catch (e) {
        return false;
      }
    }
  }]);

  return File;
})();

/**
 * FileMust base.
 *
 * @readonly file:File  The file.
 */

var FileMustBase = (function () {
  /**
   * Constructor.
   *
   * @param(attr) file
   */

  function FileMustBase(file) {
    _classCallCheck(this, FileMustBase);

    Object.defineProperty(this, "file", { value: file });
  }

  _createClass(FileMustBase, [{
    key: "filePath",

    /**
     * The file path.
     *
     * @type string
     */
    get: function () {
      return this.file.path;
    }
  }]);

  return FileMustBase;
})();

/**
 * A wrapper file for asserting.
 *
 * @readonly file:File    The file.
 */

var FileMust = (function (_FileMustBase) {
  /**
   * Constructor.
   *
   * @param(attr) file
   */

  function FileMust(file) {
    _classCallCheck(this, FileMust);

    _get(Object.getPrototypeOf(FileMust.prototype), "constructor", this).call(this, file);
  }

  _inherits(FileMust, _FileMustBase);

  _createClass(FileMust, [{
    key: "not",

    /**
     * The must.not.
     */
    get: function () {
      return new FileMustNot(this.file);
    }
  }, {
    key: "be",

    /**
     * must.be.
     */
    get: function () {
      return new FileMustBe(this.file);
    }
  }, {
    key: "contain",

    /**
     * Checks whether the file contains a given text(s).
     *
     * @overload
     * @param txt:string    The text to check.
     * @param [msg]:string  The assertion message.
     *
     * @overload
     * @param txts:string[] The texts to check.
     * @param [msg]:string  The assertion message.
     */
    value: function contain() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var txts, msg, con;

      //(1) arguments
      if (args.length === 0) throw new Error("Text to check expected.");else if (args.length == 1) txts = args[0];else {
        txts = args[0];
        msg = args[1];
      }

      if (typeof txts == "string") txts = [txts];

      //(2) does file exist?
      if (!this.file.exists()) {
        throw new AssertionError("'" + this.filePath + "' must exist.", msg);
      }

      //(3) check
      con = fs.readFileSync(this.filePath, { encoding: "utf8" });

      for (var i = 0; i < txts.length; ++i) {
        var txt = txts[i];

        if (con.indexOf(txt) < 0) throw new AssertionError("'" + this.filePath + "' must contain '" + txt + "'.", msg);
      }
    }
  }, {
    key: "exist",

    /**
     * Checks whether the file exists.
     *
     * @param [msg]:string  The assertion error.
     */
    value: function exist(msg) {
      if (!this.file.exists()) {
        throw new AssertionError("'" + this.filePath + "' must exist.", msg);
      }
    }
  }]);

  return FileMust;
})(FileMustBase);

/**
 * must.not.
 */

var FileMustNot = (function (_FileMustBase2) {
  /**
   * Constructor.
   *
   * @param(attr) file
   */

  function FileMustNot(file) {
    _classCallCheck(this, FileMustNot);

    _get(Object.getPrototypeOf(FileMustNot.prototype), "constructor", this).call(this, file);
  }

  _inherits(FileMustNot, _FileMustBase2);

  _createClass(FileMustNot, [{
    key: "be",

    /**
     * must.not.be.
     */
    get: function () {
      return new MustNotBe(this.file);
    }
  }, {
    key: "contain",

    /**
     * Checks whether the file doesn't contain a given text(s).
     *
     * @overload
     * @param txt:string    The text to check.
     * @param [msg]:string  The assertion message.
     *
     * @overload
     * @param txts:string[] The texts to check.
     * @param [msg]:string  The assertion message.
     */
    value: function contain() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var txts, msg;

      //(1) arguments
      if (args.length === 0) throw new Error("Text to check expected.");else if (args.length == 1) txts = args[0];else {
        txts = args[0];
        msg = args[1];
      }

      if (typeof txts == "string") txts = [txts];

      //(2) check
      if (this.file.exists()) {
        var con = fs.readFileSync(this.filePath, { encoding: "utf8" });

        for (var i = 0; i < txts.length; ++i) {
          var txt = txts[i];

          if (con.indexOf(txt) >= 0) throw new AssertionError("'" + this.filePath + "' must not contain '" + txt + "'.", msg);
        }
      }
    }
  }, {
    key: "exist",

    /**
     * Checks whether the file doesn't exist.
     *
     * @param [msg]:string  The assertion error.
     */
    value: function exist(msg) {
      if (this.file.exists()) {
        throw new AssertionError("'" + this.filePath + "' must not exist.", msg);
      }
    }
  }]);

  return FileMustNot;
})(FileMustBase);

/**
 * must.be.
 */

var FileMustBe = (function (_FileMustBase3) {
  /**
   * Constructor.
   *
   * @param(attr) file
   */

  function FileMustBe(file) {
    _classCallCheck(this, FileMustBe);

    _get(Object.getPrototypeOf(FileMustBe.prototype), "constructor", this).call(this, file);
  }

  _inherits(FileMustBe, _FileMustBase3);

  _createClass(FileMustBe, [{
    key: "equal",

    /**
     * Checks whether the file content is equal to the specified text.
     *
     * @param text:string   The text to check.
     * @param [msg]:string  The assertion message.
     */
    value: function equal(text, msg) {
      var con, check;

      //(1) does file exist?
      if (!this.file.exists()) {
        throw new AssertionError("'" + this.filePath + "' must exist.", msg);
      }

      //(2) check
      con = fs.readFileSync(this.filePath, "utf8");

      if (con != text) {
        throw new AssertionError("'" + this.filePath + "' content must be equal to '" + text + "'. Read: '" + con + "'.", msg);
      }
    }
  }, {
    key: "eq",

    /**
     * @alias equal
     */
    value: function eq() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.equal.apply(this, args);
    }
  }, {
    key: "json",

    /**
     * Checks whether a file is a JSON file.
     *
     * @overload Whether a file is a JSON file.
     * @param [msg]:string  The assertion message.
     *
     * @overload Whether a file is a JSON file and its object is a given one.
     * @param obj:object    The object to check.
     * @param [msg]:string  The assertion message.
     */
    value: function json() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var obj, msg, con;

      //(1) arguments
      if (args.length == 1) {
        if (typeof args[0] == "string") msg = args[0];else obj = args[0];
      } else if (args.length > 1) {
        obj = args[0];
        msg = args[1];
      }

      //(2) does file exist?
      if (!this.file.exists()) {
        throw new AssertionError("'" + this.filePath + "' must exist.", msg);
      }

      //(2) read file
      try {
        con = jsonfile.readFileSync(this.filePath);
      } catch (e) {
        throw new AssertionError("'" + this.filePath + "' must be a JSON file.", msg);
      }

      //(2) check
      if (obj) {
        try {
          assert.deepEqual(con, obj);
        } catch (e) {
          throw new AssertionError("'" + this.filePath + "' must be the JSON object '" + obj + "'.", msg);
        }
      }
    }
  }]);

  return FileMustBe;
})(FileMustBase);

/**
 * must.not.be
 */

var MustNotBe = (function (_FileMustBase4) {
  /**
   * Constructor.
   *
   * @param(attr) file
   */

  function MustNotBe(file) {
    _classCallCheck(this, MustNotBe);

    _get(Object.getPrototypeOf(MustNotBe.prototype), "constructor", this).call(this, file);
  }

  _inherits(MustNotBe, _FileMustBase4);

  _createClass(MustNotBe, [{
    key: "equal",

    /**
     * Checks whether the file content is not equal to the specified text.
     *
     * @param text:string   The text to check.
     * @param [msg]:string  The assertion message.
     */
    value: function equal(text, msg) {
      if (this.file.exists()) {
        if (fs.readFileSync(this.filePath, { encoding: "utf8" }) == text) {
          throw new AssertionError("'" + this.filePath + "' content must not be equal to '" + text + "'.", msg);
        }
      }
    }
  }, {
    key: "eq",

    /**
     * @alias equal
     */
    value: function eq() {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.equal.apply(this, args);
    }
  }, {
    key: "json",

    /**
     * Checks whether a file is not a JSON file.
     *
     * @overload Whether a file is a JSON file.
     * @param [msg]:string  The assertion message.
     *
     * @overload Whether a file is a JSON file and its object is a given one.
     * @param obj:object    The object to check.
     * @param [msg]:string  The assertion message.
     */
    value: function json() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      var obj, msg;

      //(1) arguments
      if (args.length == 1) {
        if (typeof args[0] == "string") msg = args[0];else obj = args[0];
      } else if (args.length > 1) {
        obj = args[0];
        msg = args[1];
      }

      //(2) check
      if (this.file.exists()) {
        var con = undefined;

        try {
          con = jsonfile.readFileSync(this.filePath);

          if (!obj) {
            throw new AssertionError("'" + this.filePath + "' must not be a JSON file.", msg);
          } else {
            try {
              assert.notDeepEqual(con, obj);
            } catch (e) {
              throw new AssertionError("'" + this.filePath + "' must not be a JSON object '" + obj + "'.", msg);
            }
          }
        } catch (e) {
          if (e.name == "AssertionError") throw e;
        }
      }
    }
  }]);

  return MustNotBe;
})(FileMustBase);

//imports
var path = require("path");
function file() {
  for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }

  var fp;

  //(1) arguments
  if (args.length === 0) throw new Error("File path expected.");else if (args.length == 1) fp = args[0];else fp = path.join.apply(path, args);

  //(2) return
  return new File(fp);
}

function dir() {
  for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    args[_key8] = arguments[_key8];
  }

  var dp;

  //(1) arguments
  if (args.length === 0) throw new Error("Directory path expected.");else if (args.length == 1) dp = args[0];else dp = path.join.apply(path, args);

  //(2) return
  return new Dir(dp);
}
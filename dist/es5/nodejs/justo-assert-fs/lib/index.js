//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.file = file;
exports.dir = dir;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require("path");

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

function file() {
  var fp;

  //(1) arguments

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 0) throw new Error("File path expected.");else if (args.length == 1) fp = args[0];else fp = path.join.apply(path, args);

  //(2) return
  return new File(fp);
}

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

function dir() {
  var dp;

  //(1) arguments

  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (args.length === 0) throw new Error("Directory path expected.");else if (args.length == 1) dp = args[0];else dp = path.join.apply(path, args);

  //(2) return
  return new Dir(dp);
}

//imports
var _AssertionError = require("assert").AssertionError;

/**
 * An assertion error.
 */

var AssertionError = (function (_AssertionError2) {
  _inherits(AssertionError, _AssertionError2);

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

  //imports
  return AssertionError;
})(_AssertionError);

var fs = require("fs");
var jsonfile = require("jsonfile");
var jsyaml = require("js-yaml");

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

  /**
   * FileMust base.
   *
   * @readonly file:File  The file.
   */

  /**
   * Returns if the file exists.
   *
   * @return boolean
   */

  _createClass(File, [{
    key: "exists",
    value: function exists() {
      try {
        return fs.statSync(this.path).isFile();
      } catch (e) {
        return false;
      }
    }

    /**
     * The file content when this is a YAML file.
     *
     * @type object
     */
  }, {
    key: "yaml",
    get: function get() {
      var con;

      //(1) get con
      try {
        con = jsyaml.safeLoad(fs.readFileSync(this.path, "utf8"));
      } catch (e) {}

      if (typeof con != "object") throw new AssertionError("'" + this.path + "' must be a YAML file.");

      //(2) return
      return con;
    }

    /**
     * @alias yaml
     */
  }, {
    key: "yml",
    get: function get() {
      return this.yaml;
    }

    /**
     * The file content when this is a JSON file.
     *
     * @type json
     */
  }, {
    key: "json",
    get: function get() {
      var con;

      //(1) get
      try {
        con = jsonfile.readFileSync(this.path);
      } catch (e) {
        throw new AssertionError("'" + this.path + "' must be a JSON file.");
      }

      //(2) return
      return con;
    }

    /**
     * The file content.
     *
     * @type string
     */
  }, {
    key: "text",
    get: function get() {
      return fs.readFileSync(this.path, "utf8");
    }
  }]);

  return File;
})();

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

  /**
   * A wrapper file for asserting.
   *
   * @readonly file:File    The file.
   */

  /**
   * The file path.
   *
   * @type string
   */

  _createClass(FileMustBase, [{
    key: "filePath",
    get: function get() {
      return this.file.path;
    }
  }]);

  return FileMustBase;
})();

var FileMust = (function (_FileMustBase) {
  _inherits(FileMust, _FileMustBase);

  /**
   * Constructor.
   *
   * @param(attr) file
   */

  function FileMust(file) {
    _classCallCheck(this, FileMust);

    _get(Object.getPrototypeOf(FileMust.prototype), "constructor", this).call(this, file);
  }

  /**
   * must.not.
   */

  /**
   * The must.not.
   */

  _createClass(FileMust, [{
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
      var txts, msg, con;

      //(1) arguments

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length === 0) throw new Error("Text to check expected.");else if (args.length == 1) txts = args[0];else {
        ;

        txts = args[0];
        msg = args[1];
      }if (typeof txts == "string") txts = [txts];

      //(2) does file exist?
      if (!this.file.exists()) {
        throw new AssertionError("'" + this.filePath + "' must exist.", msg);
      }

      //(3) check
      con = fs.readFileSync(this.filePath, "utf8");

      for (var i = 0; i < txts.length; ++i) {
        var txt = txts[i];

        if (con.indexOf(txt) < 0) throw new AssertionError("'" + this.filePath + "' must contain '" + txt + "'.", msg);
      }
    }

    /**
     * Checks whether the file exists.
     *
     * @param [msg]:string  The assertion error.
     */
  }, {
    key: "exist",
    value: function exist(msg) {
      if (!this.file.exists()) {
        throw new AssertionError("'" + this.filePath + "' must exist.", msg);
      }
    }
  }, {
    key: "not",
    get: function get() {
      return new FileMustNot(this.file);
    }

    /**
     * must.be.
     */
  }, {
    key: "be",
    get: function get() {
      return new FileMustBe(this.file);
    }
  }]);

  return FileMust;
})(FileMustBase);

var FileMustNot = (function (_FileMustBase2) {
  _inherits(FileMustNot, _FileMustBase2);

  /**
   * Constructor.
   *
   * @param(attr) file
   */

  function FileMustNot(file) {
    _classCallCheck(this, FileMustNot);

    _get(Object.getPrototypeOf(FileMustNot.prototype), "constructor", this).call(this, file);
  }

  /**
   * must.be.
   */

  /**
   * must.not.be.
   */

  _createClass(FileMustNot, [{
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
      var txts, msg;

      //(1) arguments

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      if (args.length === 0) throw new Error("Text to check expected.");else if (args.length == 1) txts = args[0];else {
        ;

        txts = args[0];
        msg = args[1];
      }if (typeof txts == "string") txts = [txts];

      //(2) check
      if (this.file.exists()) {
        var con = fs.readFileSync(this.filePath, "utf8");

        for (var i = 0; i < txts.length; ++i) {
          var txt = txts[i];

          if (con.indexOf(txt) >= 0) throw new AssertionError("'" + this.filePath + "' must not contain '" + txt + "'.", msg);
        }
      }
    }

    /**
     * Checks whether the file doesn't exist.
     *
     * @param [msg]:string  The assertion error.
     */
  }, {
    key: "exist",
    value: function exist(msg) {
      if (this.file.exists()) {
        throw new AssertionError("'" + this.filePath + "' must not exist.", msg);
      }
    }
  }, {
    key: "be",
    get: function get() {
      return new MustNotBe(this.file);
    }
  }]);

  return FileMustNot;
})(FileMustBase);

var FileMustBe = (function (_FileMustBase3) {
  _inherits(FileMustBe, _FileMustBase3);

  /**
   * Constructor.
   *
   * @param(attr) file
   */

  function FileMustBe(file) {
    _classCallCheck(this, FileMustBe);

    _get(Object.getPrototypeOf(FileMustBe.prototype), "constructor", this).call(this, file);
  }

  /**
   * must.not.be
   */

  /**
   * Checks whether the file content is equal to the specified text.
   *
   * @param text:string   The text to check.
   * @param [msg]:string  The assertion message.
   */

  _createClass(FileMustBe, [{
    key: "equal",
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

    /**
     * @alias equal
     */
  }, {
    key: "eq",
    value: function eq() {
      this.equal.apply(this, arguments);
    }

    /**
     * Checks whether a file is a JSON file.
     *
     * @param [msg]:string  The assertion message.
     */
  }, {
    key: "json",
    value: function json(msg) {
      if (!this.file.exists()) {
        throw new AssertionError("'" + this.filePath + "' must exist.", msg);
      } else {
        try {
          var con = this.file.json;
        } catch (e) {
          throw new AssertionError(e.message, msg);
        }
      }
    }

    /**
     * Checks whether a file is a YAML file.
     *
     * @param [msg]:string  The assertion message.
     */
  }, {
    key: "yaml",
    value: function yaml(msg) {
      if (!this.file.exists()) {
        throw new AssertionError("'" + this.filePath + "' must exist.", msg);
      } else {
        try {
          var con = this.file.yaml;
        } catch (e) {
          throw new AssertionError(e.message, msg);
        }
      }
    }

    /**
     * @alias yaml()
     */
  }, {
    key: "yml",
    value: function yml() {
      this.yaml.apply(this, arguments);
    }
  }]);

  return FileMustBe;
})(FileMustBase);

var MustNotBe = (function (_FileMustBase4) {
  _inherits(MustNotBe, _FileMustBase4);

  /**
   * Constructor.
   *
   * @param(attr) file
   */

  function MustNotBe(file) {
    _classCallCheck(this, MustNotBe);

    _get(Object.getPrototypeOf(MustNotBe.prototype), "constructor", this).call(this, file);
  }

  /**
   * A directory wrapper.
   *
   * @readonly path:string  The directory path.
   */

  /**
   * Checks whether the file content is not equal to the specified text.
   *
   * @param text:string   The text to check.
   * @param [msg]:string  The assertion message.
   */

  _createClass(MustNotBe, [{
    key: "equal",
    value: function equal(text, msg) {
      if (this.file.exists()) {
        if (fs.readFileSync(this.filePath, "utf8") == text) {
          throw new AssertionError("'" + this.filePath + "' content must not be equal to '" + text + "'.", msg);
        }
      }
    }

    /**
     * @alias equal
     */
  }, {
    key: "eq",
    value: function eq() {
      this.equal.apply(this, arguments);
    }

    /**
     * Checks whether a file is not a JSON file.
     *
     * @param [msg]:string  The assertion message.
     */
  }, {
    key: "json",
    value: function json(msg) {
      var con;

      if (this.file.exists()) {
        try {
          con = this.file.json;
        } catch (e) {}

        if (con) throw new AssertionError("'" + this.filePath + "' must not be a JSON file.", msg);
      }
    }

    /**
     * Checks whether a file is not a YAML file.
     *
     * @param [msg]:string  The assertion message.
     */
  }, {
    key: "yaml",
    value: function yaml(msg) {
      var con;

      if (this.file.exists()) {
        try {
          con = this.file.yaml;
        } catch (e) {}

        if (con) throw new AssertionError("'" + this.filePath + "' must not be a YAML file.", msg);
      }
    }

    /**
     * @alias yaml()
     */
  }, {
    key: "yml",
    value: function yml() {
      this.yaml.apply(this, arguments);
    }
  }]);

  return MustNotBe;
})(FileMustBase);

var Dir = (function () {
  /**
   * Constructor.
   */

  function Dir(path) {
    _classCallCheck(this, Dir);

    Object.defineProperty(this, "path", { value: path });
    Object.defineProperty(this, "must", { value: new DirMust(this) });
  }

  /**
   * DirMust base.
   *
   * @readonly dir:Dir  The directory.
   */

  /**
   * Returns if the directory exists.
   *
   * @return boolean
   */

  _createClass(Dir, [{
    key: "exists",
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

  /**
   * A wrapper file for asserting.
   *
   * @readonly dir:Dir  The directory.
   */

  /**
   * The file path.
   *
   * @type string
   */

  _createClass(DirMustBase, [{
    key: "dirPath",
    get: function get() {
      return this.dir.path;
    }
  }]);

  return DirMustBase;
})();

var DirMust = (function (_DirMustBase) {
  _inherits(DirMust, _DirMustBase);

  /**
   * Constructor.
   *
   * @param(attr) dir
   */

  function DirMust(dir) {
    _classCallCheck(this, DirMust);

    _get(Object.getPrototypeOf(DirMust.prototype), "constructor", this).call(this, dir);
  }

  /**
   * must.not.
   */

  /**
   * The must.not.
   */

  _createClass(DirMust, [{
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

    /**
     * Checks whether the directory contains an entry.
     *
     * @overload An entry.
     * @param entry:string  The entry name.
     * @param [msg]:string  The assertion message.
     *
     * @overload Several entries.
     * @param entries:string[]  The entry names.
     * @param [msg]:string      The assertion message.
     */
  }, {
    key: "have",
    value: function have(entries, msg) {
      //(1) arguments
      if (typeof entries == "string") entries = [entries];

      //(2) check
      for (var i = 0; i < entries.length; ++i) {
        var entry = entries[i];

        if (!fs.existsSync(path.join(this.dirPath, entry))) {
          throw new AssertionError("'" + this.dirPath + "' must contain an entry '" + entry + "'.", msg);
        }
      }
    }

    /**
     * @alias have
     * @deprecated
     */
  }, {
    key: "contain",
    value: function contain() {
      this.have.apply(this, arguments);
    }
  }, {
    key: "not",
    get: function get() {
      return new DirMustNot(this.dir);
    }
  }]);

  return DirMust;
})(DirMustBase);

var DirMustNot = (function (_DirMustBase2) {
  _inherits(DirMustNot, _DirMustBase2);

  /**
   * Constructor.
   *
   * @param(attr) dir
   */

  function DirMustNot(dir) {
    _classCallCheck(this, DirMustNot);

    _get(Object.getPrototypeOf(DirMustNot.prototype), "constructor", this).call(this, dir);
  }

  /**
   * Checks whether the directory doesn't exist.
   *
   * @param [msg]:string  The assertion error.
   */

  _createClass(DirMustNot, [{
    key: "exist",
    value: function exist(msg) {
      if (this.dir.exists()) {
        throw new AssertionError("'" + this.dirPath + "' must not exist.", msg);
      }
    }

    /**
     * Checks whether a directory doesn't contain an entry.
     *
     * @overload An entry.
     * @param entry:string  The entry name.
     * @param [msg]:string  The assertion message.
     *
     * @overload Several entries.
     * @param entries:string[]  The entry names.
     * @param [msg]:string      The assertion message.
     */
  }, {
    key: "have",
    value: function have(entries, msg) {
      //(1) arguments
      if (typeof entries == "string") entries = [entries];

      //(2) check
      for (var i = 0; i < entries.length; ++i) {
        var entry = entries[i];

        if (fs.existsSync(path.join(this.dirPath, entry))) {
          throw new AssertionError("'" + this.dirPath + "' must not contain an entry '" + entry + "'.", msg);
        }
      }
    }

    /**
     * @alias have
     * @deprecated
     */
  }, {
    key: "contain",
    value: function contain() {
      this.have.apply(this, arguments);
    }
  }]);

  return DirMustNot;
})(DirMustBase);

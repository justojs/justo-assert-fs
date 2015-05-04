//imports
const fs = require("fs");
const jsonfile = require("jsonfile");
const assert = require("assert");

/**
 * A wrapper file.
 *
 * @readonly path:string  The file path.
 * @readonly must:object  The assertion-API object,
 */
class File {
  /**
   * Constructor.
   *
   * @param(attr) path
   */
  constructor(path) {
    Object.defineProperty(this, "path", {value: path});
    Object.defineProperty(this, "must", {value: new FileMust(this)});
  }

  /**
   * Returns if the file exists.
   *
   * @return boolean
   */
  exists() {
    try {
      return fs.statSync(this.path).isFile();
    } catch (e) {
      return false;
    }
  }
}

/**
 * FileMust base.
 *
 * @readonly file:File  The file.
 */
class FileMustBase {
  /**
   * Constructor.
   *
   * @param(attr) file
   */
  constructor(file) {
    Object.defineProperty(this, "file", {value: file});
  }

  /**
   * The file path.
   *
   * @type string
   */
  get filePath() {
    return this.file.path;
  }
}

/**
 * A wrapper file for asserting.
 *
 * @readonly file:File    The file.
 */
class FileMust extends FileMustBase {
  /**
   * Constructor.
   *
   * @param(attr) file
   */
  constructor(file) {
    super(file);
  }

  /**
   * The must.not.
   */
  get not() {
    return new FileMustNot(this.file);
  }

  /**
   * must.be.
   */
  get be() {
    return new FileMustBe(this.file);
  }

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
  contain(...args) {
    var txts, msg, con;

    //(1) arguments
    if (args.length === 0) throw new Error("Text to check expected.");
    else if (args.length == 1) txts = args[0];
    else [txts, msg] = args;

    if (typeof(txts) == "string") txts = [txts];

    //(2) does file exist?
    if (!this.file.exists()) {
      throw new AssertionError(`'${this.filePath}' must exist.`, msg);
    }

    //(3) check
    con = fs.readFileSync(this.filePath, {encoding: "utf8"});

    for (let i = 0; i < txts.length; ++i) {
      let txt = txts[i];

      if (con.indexOf(txt) < 0) throw new AssertionError(`'${this.filePath}' must contain '${txt}'.`, msg);
    }
  }

  /**
   * Checks whether the file exists.
   *
   * @param [msg]:string  The assertion error.
   */
  exist(msg) {
    if (!this.file.exists()) {
      throw new AssertionError(`'${this.filePath}' must exist.`, msg);
    }
  }
}

/**
 * must.not.
 */
class FileMustNot extends FileMustBase {
  /**
   * Constructor.
   *
   * @param(attr) file
   */
  constructor(file) {
    super(file);
  }

  /**
   * must.not.be.
   */
  get be() {
    return new MustNotBe(this.file);
  }

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
  contain(...args) {
    var txts, msg;

    //(1) arguments
    if (args.length === 0) throw new Error("Text to check expected.");
    else if (args.length == 1) txts = args[0];
    else [txts, msg] = args;

    if (typeof(txts) == "string") txts = [txts];

    //(2) check
    if (this.file.exists()) {
      let con = fs.readFileSync(this.filePath, {encoding: "utf8"});

      for (let i = 0; i < txts.length; ++i) {
        let txt = txts[i];

        if (con.indexOf(txt) >= 0) throw new AssertionError(`'${this.filePath}' must not contain '${txt}'.`, msg);
      }
    }
  }

  /**
   * Checks whether the file doesn't exist.
   *
   * @param [msg]:string  The assertion error.
   */
  exist(msg) {
    if (this.file.exists()) {
      throw new AssertionError(`'${this.filePath}' must not exist.`, msg);
    }
  }
}

/**
 * must.be.
 */
class FileMustBe extends FileMustBase {
  /**
   * Constructor.
   *
   * @param(attr) file
   */
  constructor(file) {
    super(file);
  }

  /**
   * Checks whether the file content is equal to the specified text.
   *
   * @param text:string   The text to check.
   * @param [msg]:string  The assertion message.
   */
  equal(text, msg) {
    var con, check;

    //(1) does file exist?
    if (!this.file.exists()) {
      throw new AssertionError(`'${this.filePath}' must exist.`, msg);
    }

    //(2) check
    con = fs.readFileSync(this.filePath, "utf8");

    if (con != text) {
      throw new AssertionError(`'${this.filePath}' content must be equal to '${text}'. Read: '${con}'.`, msg);
    }
  }

  /**
   * @alias equal
   */
  eq(...args) {
    this.equal(...args);
  }

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
  json(...args) {
    var obj, msg, con;

    //(1) arguments
    if (args.length == 1) {
      if (typeof(args[0]) == "string") msg = args[0];
      else obj = args[0];
    } else if (args.length > 1) {
      [obj, msg] = args;
    }

    //(2) does file exist?
    if (!this.file.exists()) {
      throw new AssertionError(`'${this.filePath}' must exist.`, msg);
    }

    //(2) read file
    try {
      con = jsonfile.readFileSync(this.filePath);
    } catch (e) {
      throw new AssertionError(`'${this.filePath}' must be a JSON file.`, msg);
    }

    //(2) check
    if (obj) {
      try {
        assert.deepEqual(con, obj);
      } catch (e) {
        throw new AssertionError(`'${this.filePath}' must be the JSON object '${obj}'.`, msg);
      }
    }
  }
}

/**
 * must.not.be
 */
class MustNotBe extends FileMustBase {
  /**
   * Constructor.
   *
   * @param(attr) file
   */
  constructor(file) {
    super(file);
  }

  /**
   * Checks whether the file content is not equal to the specified text.
   *
   * @param text:string   The text to check.
   * @param [msg]:string  The assertion message.
   */
  equal(text, msg) {
    if (this.file.exists()) {
      if (fs.readFileSync(this.filePath, {encoding: "utf8"}) == text) {
        throw new AssertionError(`'${this.filePath}' content must not be equal to '${text}'.`, msg);
      }
    }
  }

  /**
   * @alias equal
   */
  eq(...args) {
    this.equal(...args);
  }

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
  json(...args) {
    var obj, msg;

    //(1) arguments
    if (args.length == 1) {
      if (typeof(args[0]) == "string") msg = args[0];
      else obj = args[0];
    } else if (args.length > 1) {
      [obj, msg] = args;
    }

    //(2) check
    if (this.file.exists()) {
      let con;

      try {
        con = jsonfile.readFileSync(this.filePath);

        if (!obj) {
          throw new AssertionError(`'${this.filePath}' must not be a JSON file.`, msg);
        } else {
          try {
            assert.notDeepEqual(con, obj);
          } catch (e) {
            throw new AssertionError(`'${this.filePath}' must not be a JSON object '${obj}'.`, msg);
          }
        }
      } catch (e) {
        if (e.name == "AssertionError") throw e;
      }
    }
  }
}

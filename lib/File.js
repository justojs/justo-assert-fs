//imports
const fs = require("fs");
const jsonfile = require("jsonfile");
const jsyaml = require("js-yaml");

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

  /**
   * The file content when this is a YAML file.
   *
   * @type object
   */
  get yaml() {
    var con;

    //(1) get con
    try {
      con = jsyaml.safeLoad(fs.readFileSync(this.path, "utf8"));
    } catch (e) {

    }

    if (typeof(con) != "object") throw new AssertionError(`'${this.path}' must be a YAML file.`);

    //(2) return
    return con;
  }

  /**
   * @alias yaml
   */
  get yml() {
    return this.yaml;
  }

  /**
   * The file content when this is a JSON file.
   *
   * @type json
   */
  get json() {
    var con;

    //(1) get
    try {
      con = jsonfile.readFileSync(this.path);
    } catch (e) {
      throw new AssertionError(`'${this.path}' must be a JSON file.`);
    }

    //(2) return
    return con;
  }

  /**
   * The file content.
   *
   * @type string
   */
  get text() {
    return fs.readFileSync(this.path, "utf8");
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
    con = fs.readFileSync(this.filePath, "utf8");

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
      let con = fs.readFileSync(this.filePath, "utf8");

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
   * @param [msg]:string  The assertion message.
   */
  json(msg) {
    if (!this.file.exists()) {
      throw new AssertionError(`'${this.filePath}' must exist.`, msg);
    } else {
      try {
        let con = this.file.json;
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
  yaml(msg) {
    if (!this.file.exists()) {
      throw new AssertionError(`'${this.filePath}' must exist.`, msg);
    } else {
      try {
        let con = this.file.yaml;
      } catch (e) {
        throw new AssertionError(e.message, msg);
      }
    }
  }

  /**
   * @alias yaml()
   */
  yml(...args) {
    this.yaml(...args);
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
      if (fs.readFileSync(this.filePath, "utf8") == text) {
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
   * @param [msg]:string  The assertion message.
   */
  json(msg) {
    var con;

    if (this.file.exists()) {
      try {
        con = this.file.json;
      } catch (e) {

      }

      if (con) throw new AssertionError(`'${this.filePath}' must not be a JSON file.`, msg);
    }
  }

  /**
   * Checks whether a file is not a YAML file.
   *
   * @param [msg]:string  The assertion message.
   */
  yaml(msg) {
    var con;

    if (this.file.exists()) {
      try {
        con = this.file.yaml;
      } catch (e) {

      }

      if (con) throw new AssertionError(`'${this.filePath}' must not be a YAML file.`, msg);
    }
  }

  /**
   * @alias yaml()
   */
  yml(...args) {
    this.yaml(...args);
  }
}

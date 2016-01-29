//imports
import fs from "fs";
import path from "path";
import AssertionError from "./AssertionError";

/**
 * A directory wrapper.
 *
 * @readonly path:string  The directory path.
 */
export default class Dir {
  /**
   * Constructor.
   */
  constructor(path) {
    Object.defineProperty(this, "path", {value: path});
    Object.defineProperty(this, "must", {value: new DirMust(this)});
  }

  /**
   * Returns if the directory exists.
   *
   * @return boolean
   */
  exists() {
    try {
      return fs.statSync(this.path).isDirectory();
    } catch (e) {
      return false;
    }
  }
}

/**
 * DirMust base.
 *
 * @readonly dir:Dir  The directory.
 */
class DirMustBase {
  /**
   * Constructor.
   *
   * @param(attr) dir
   */
  constructor(dir) {
    Object.defineProperty(this, "dir", {value: dir});
  }

  /**
   * The file path.
   *
   * @type string
   */
  get dirPath() {
    return this.dir.path;
  }
}

/**
 * A wrapper file for asserting.
 *
 * @readonly dir:Dir  The directory.
 */
class DirMust extends DirMustBase {
  /**
   * Constructor.
   *
   * @param(attr) dir
   */
  constructor(dir) {
    super(dir);
  }

  /**
   * The must.not.
   */
  get not() {
    return new DirMustNot(this.dir);
  }

  /**
   * Checks whether the directory exists.
   *
   * @param [msg]:string  The assertion error.
   */
  exist(msg) {
    if (!this.dir.exists()) {
      throw new AssertionError(`'${this.dirPath}' must exist.`, msg);
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
  have(entries, msg) {
    //(1) arguments
    if (typeof(entries) == "string") entries = [entries];

    //(2) check
    for (let i = 0; i < entries.length; ++i) {
      let entry = entries[i];

      if (!fs.existsSync(path.join(this.dirPath, entry))) {
        throw new AssertionError(`'${this.dirPath}' must contain an entry '${entry}'.`, msg);
      }
    }
  }

  /**
   * @alias have
   * @deprecated
   */
  contain(...args) {
    this.have(...args);
  }
}

/**
 * must.not.
 */
class DirMustNot extends DirMustBase {
  /**
   * Constructor.
   *
   * @param(attr) dir
   */
  constructor(dir) {
    super(dir);
  }

  /**
   * Checks whether the directory doesn't exist.
   *
   * @param [msg]:string  The assertion error.
   */
  exist(msg) {
    if (this.dir.exists()) {
      throw new AssertionError(`'${this.dirPath}' must not exist.`, msg);
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
  have(entries, msg) {
    //(1) arguments
    if (typeof(entries) == "string") entries = [entries];

    //(2) check
    for (let i = 0; i < entries.length; ++i) {
      let entry = entries[i];

      if (fs.existsSync(path.join(this.dirPath, entry))) {
        throw new AssertionError(`'${this.dirPath}' must not contain an entry '${entry}'.`, msg);
      }
    }
  }

  /**
   * @alias have
   * @deprecated
   */
  contain(...args) {
    this.have(...args);
  }
}

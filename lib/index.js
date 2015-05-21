//imports
const path = require("path");

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
export function file(...args) {
  var fp;

  //(1) arguments
  if (args.length === 0) throw new Error("File path expected.");
  else if (args.length == 1) fp = args[0];
  else fp = path.join(...args);

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
export function dir(...args) {
  var dp;

  //(1) arguments
  if (args.length === 0) throw new Error("Directory path expected.");
  else if (args.length == 1) dp = args[0];
  else dp = path.join(...args);

  //(2) return
  return new Dir(dp);
}

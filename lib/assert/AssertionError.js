//imports
const _AssertionError = require("assert").AssertionError;

/**
 * An assertion error.
 */
class AssertionError extends _AssertionError {
  /**
   * Initializes the error.
   *
   * @param msg1:string   The default message.
   * @param [msg2]:string The custom message.
   */
  constructor(msg1, msg2) {
  	//(1) arguments
  	if (!msg1 && !msg2) throw new Error("Error message expected.");

  	//(2) superconstructor
    super({message: msg2 || msg1});
  }
}

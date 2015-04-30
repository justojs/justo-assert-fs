//imports
const justo = require("../../dist/es5/nodejs/justo-assert-file");
const file = justo.file;
const dir = justo.dir;

//suite
describe("#file()", function() {
  describe("Error handling", function() {
    it("file()", function() {
      file.must.raise("File path expected.");
    });
  });

  it("file(path)", function() {
    file("myfile.txt").constructor.name.must.be.eq("File");
  });

  it("file(dir, name)", function() {
    file("/my/dir", "file.txt").constructor.name.must.be.eq("File");
  });
});

describe("#dir()", function() {
  describe("Error handling", function() {
    it("dir()", function() {
      dir.must.raise("Directory path expected.");
    });
  });

  it("dir(path)", function() {
    dir("/my/dir").constructor.name.must.be.eq("Dir");
  });

  it("dir(parent, name)", function() {
    dir("/my/dir", "subdir").constructor.name.must.be.eq("Dir");
  });
});

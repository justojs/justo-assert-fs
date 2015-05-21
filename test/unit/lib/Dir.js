//imports
const fs = require("fs");
const os= require("os");
const path = require("path");
const dir = require("../../../dist/es5/nodejs/justo-assert-fs").dir;

//suite
describe("Dir", function() {
  const DIR = os.tmpdir();
  const DIR_NAME = "mydir";
  const DIR_PATH = path.join(DIR, DIR_NAME);
  const FILE_NAME = "myfile.txt";
  const FILE_PATH = path.join(DIR_PATH, FILE_NAME);
  var d;

  beforeEach(function() {
    fs.mkdirSync(DIR_PATH);
    fs.writeFileSync(FILE_PATH, "");
    d = dir(DIR_PATH);
  });

  afterEach(function() {
    fs.unlinkSync(FILE_PATH);
    fs.rmdirSync(DIR_PATH);
  });

  describe("#constructor()", function() {
    it("constructor(path) from dir(path)", function() {
      dir("/my/dir/subdir").path.must.be.eq("/my/dir/subdir");
    });

    it("constructor(path) from dir(parent, name)", function() {
      var d = dir("/my/dir", "subdir");

      if (/win.*/.test(process.platform)) d.path.must.be.eq("\\my\\dir\\subdir");
      else d.path.must.be.eq("/my/dir/subdir");
    });
  });

  describe("#must.exist()", function() {
    describe("must.exist()", function() {
      it("exist() - pass", function() {
        d.must.exist();
      });

      it("exist() - fail", function() {
        (function() {
          dir(DIR, "unknown").must.exist();
        }).must.raise();
      });

      it("exist() - fail - entry exists, but it is not dir", function() {
        (function() {
          dir(FILE_PATH).must.exist();
        }).must.raise();
      });
    });

    describe("must.exist(msg)", function() {
      it("exist(msg) - pass", function() {
        d.must.exist("Custom message");
      });

      it("exist(msg) - fail", function() {
        (function() {
          dir(DIR, "unknown").must.exist("Custom message");
        }).must.raise("Custom message");
      });

      it("exist() - fail - entry exists, but it is not dir", function() {
        (function() {
          dir(FILE_PATH).must.exist("Custom message");
        }).must.raise("Custom message");
      });
    });
  });

  describe("#must.not.exist()", function() {
    describe("must.not.exist()", function() {
      it("not.exist() - pass", function() {
        dir(DIR, "unknown").must.not.exist();
      });

      it("not.exist() - pass - entry exists, but it is not dir", function() {
        dir(FILE_PATH).must.not.exist();
      });

      it("not.exist() - fail", function() {
        (function() {
          d.must.not.exist();
        }).must.raise();
      });
    });

    describe("must.not.exist(msg)", function() {
      it("not.exist(msg) - pass", function() {
        dir(DIR, "unknown").must.not.exist("Custom message");
      });

      it("not.exist() - pass - entry exists, but it is not dir", function() {
        dir(FILE_PATH).must.not.exist("Custom message");
      });

      it("not.exist(msg) - fail", function() {
        (function() {
          d.must.not.exist("Custom message");
        }).must.raise("Custom message");
      });
    });
  });

  describe("#must.have()", function() {
    var d;

    before(function() {
      d = dir("test/unit/data");
    });

    describe("must.have(entry, msg)", function() {
      it("have(entry) - pass", function() {
        d.must.have("myfile.json");
      });

      it("have(entry) - fail", function() {
        (function() {
          d.must.have("unknown.txt");
        }).must.raise();
      });

      it("have(entry, msg) - pass", function() {
        d.must.have("myfile.json", "Custom message");
      });

      it("have(entry, msg) - fail", function() {
        (function() {
          d.must.have("unknown.txt", "Custom message");
        }).must.raise("Custom message");
      });
    });

    describe("must.have(entries, msg)", function() {
      it("have(entries) - pass", function() {
        d.must.have(["myfile.json", "myfile.yml"]);
      });

      it("have(entries) - fail", function() {
        (function() {
          d.must.have(["myfile.json", "unknown.txt"]);
        }).must.raise();
      });

      it("have(entries, msg) - pass", function() {
        d.must.have(["myfile.json", "myfile.yml"], "Custom message");
      });

      it("have(entries, msg) - fail", function() {
        (function() {
          d.must.have(["myfile.json", "unknown.txt"], "Custom message");
        }).must.raise("Custom message");
      });
    });
  });

  describe("#must.not.have()", function() {
    var d;

    before(function() {
      d = dir("test/unit/data");
    });

    describe("not.have(entry, msg)", function() {
      it("not.have(entry) - pass", function() {
        d.must.not.have("unknown.txt");
      });

      it("not.have(entry) - fail", function() {
        (function() {
          d.must.not.have("myfile.json");
        }).must.raise();
      });

      it("not.have(entry, msg) - pass", function() {
        d.must.not.have("unknown.txt", "Custom message");
      });

      it("not.have(entry, msg) - fail", function() {
        (function() {
          d.must.not.have("myfile.json", "Custom message");
        }).must.raise("Custom message");
      });
    });

    describe("not.have(entries, msg)", function() {
      it("not.have(entries) - pass", function() {
        d.must.not.have(["unknown.txt", "unknown.json"]);
      });

      it("not.have(entries) - fail", function() {
        (function() {
          d.must.not.have(["unknown.txt", "myfile.txt"]);
        }).must.raise();
      });

      it("not.have(entries, msg) - pass", function() {
        d.must.not.have(["unknown.txt", "unknown.json"], "Custom message");
      });

      it("not.have(entries, msg) - fail", function() {
        (function() {
          d.must.not.have(["unknown.txt", "myfile.txt"], "Custom message");
        }).must.raise("Custom message");
      });
    });
  });
});

//imports
const fs = require("fs");
const os = require("os");
const path = require("path");
const file = require("justo-assert-file").file;

//suite
describe("File", function() {
  const DIR = os.tmpdir();
  const FILE_NAME = "myfile.txt";
  const JSON_FILE_NAME = "myfile.json";
  const FILE_PATH = path.join(DIR, FILE_NAME);
  const JSON_FILE_PATH = path.join(DIR, JSON_FILE_NAME);
  const SUBDIR_NAME = "subdir";
  const SUBDIR_PATH = path.join(DIR, SUBDIR_NAME);
  const CONTENT = "En un lugar de la Mancha,\n" +
                  "de cuyo nombre no quiero acordarme,\n" +
                  "no hace mucho tiempo que vivía un hidalgo de los de lanza en astillero," +
                  "adarga antigua,\n" +
                  "rocín flaco y galgo corredor.";
  const JSON_OBJECT = {x: 1, y: 1};
  const JSON_CONTENT = JSON.stringify(JSON_OBJECT);
  var f, jf;

  beforeEach(function() {
    fs.writeFileSync(FILE_PATH, CONTENT, {encoding: "utf8"});
    fs.writeFileSync(JSON_FILE_PATH, JSON_CONTENT, {encoding: "utf8"});
    fs.mkdirSync(SUBDIR_PATH);
    f = file(DIR, FILE_NAME);
    jf = file(DIR, JSON_FILE_NAME);
  });

  afterEach(function() {
    fs.unlinkSync(FILE_PATH);
    fs.unlinkSync(JSON_FILE_PATH);
    fs.rmdirSync(SUBDIR_PATH);
  });

  describe("#constructor()", function() {
    it("constructor(path) from file(path)", function() {
      var f = file("/my/dir/file.txt");
      f.path.must.be.eq("/my/dir/file.txt");
    });

    it("constructor(path) from file(dir, name)", function() {
      var f = file("/my/dir", "file.txt");

      if (/win.*/.test(process.platform)) f.path.must.be.eq("\\my\\dir\\file.txt");
      else f.path.must.be.eq("/my/dir/file.txt");
    });
  });

  describe("#must.exist()", function() {
    describe("must.exist()", function() {
      it("exist() - pass", function() {
        f.must.exist();
      });

      it("exist() - fail", function() {
        (function() {
          file(DIR, "unknown").must.exist();
        }).must.raise();
      });

      it("exist() - fail - entry exists, but it is not file", function() {
        (function() {
          file(SUBDIR_PATH).must.exist();
        }).must.raise();
      });
    });

    describe("must.exist(msg)", function() {
      it("exist(msg) - pass", function() {
        f.must.exist("Custom message");
      });

      it("exist(msg) - fail", function() {
        (function() {
          file(DIR, "unknown.txt").must.exist("Custom message");
        }).must.raise("Custom message");
      });

      it("exist(msg) - fail - entry exists, but it is not file", function() {
        (function() {
          file(SUBDIR_PATH).must.exist("Custom message");
        }).must.raise("Custom message");
      });
    });
  });

  describe("#must.not.exist()", function() {
    describe("must.not.exist()", function() {
      it("not.exist() - pass", function() {
        file(DIR, "unknown.txt").must.not.exist();
      });

      it("not.exist() - pass - entry exists, but it is not file", function() {
        file(SUBDIR_PATH).must.not.exist();
      });

      it("not.exist() - fail", function() {
        (function() {
          f.must.not.exist();
        }).must.raise();
      });
    });

    describe("must.not.exist(msg)", function() {
      it("not.exist(msg) - pass", function() {
        file(DIR, "unknown.txt").must.not.exist("Custom message");
      });

      it("not.exist() - pass - entry exists, but it is not file", function() {
        file(SUBDIR_PATH).must.not.exist("Custom message");
      });

      it("not.exist(msg) - fail", function() {
        (function() {
          f.must.not.exist("Custom message");
        }).must.raise("Custom message");
      });
    });
  });

  describe("#must.contain()", function() {
    describe("contain(txt)", function() {
      it("contain(txt) - pass", function() {
        f.must.contain("adarga antigua");
      });

      it("contain(txt) - fail", function() {
        f.must.contain.must.raise(["Don Quijote"]);
      });
    });

    describe("contain(txt, msg)", function() {
      it("contain(txt, msg) - pass", function() {
        f.must.contain("adarga antigua", "Custom message");
      });

      it("contain(txt, msg) - fail", function() {
        (function() {
          f.must.contain("Don Quijote", "Custom message");
        }).must.raise("Custom message");
      });
    });

    describe("contain(txts)", function() {
      it("contain(txts) - pass", function() {
        f.must.contain(["de la Mancha", "nombre"]);
      });

      it("contain(txts) - fail", function() {
        f.must.contain.must.raise(["de la Mancha", "nombre2"]);
      });
    });

    describe("contain(txts, msg)", function() {
      it("contain(txts, msg) - pass", function() {
        f.must.contain(["de la Mancha", "nombre"], "Custom message");
      });

      it("contain(txts, msg) - fail", function() {
        (function() {
          f.must.contain(["de la Mancha", "nombre2"], "Custom message");
        }).must.raise("Custom message");
      });
    });
  });

  describe("#must.not.contain()", function() {
    describe("not.contain(txt)", function() {
      it("not.contain(txt) - pass", function() {
        f.must.not.contain("Don Quijote");
      });

      it("not.contain(txt) - fail", function() {
        (function() {
          f.must.not.contain("Mancha");
        }).must.raise();
      });
    });

    describe("not.contain(txt, msg)", function() {
      it("not.contain(txt, msg) - pass", function() {
        f.must.not.contain("Don Quijote", "Custom message");
      });

      it("not.contain(txt, msg) - fail", function() {
        (function() {
          f.must.not.contain("Mancha", "Custom message");
        }).must.raise("Custom message");
      });
    });

    describe("not.contain(txts)", function() {
      it("not.contain(txts) - pass", function() {
        f.must.not.contain(["Don", "Quijote"]);
      });

      it("not.contain(txts) - fail", function() {
        (function() {
          f.must.not.contain(["de", "la", "Mancha"]);
        }).must.raise();
      });
    });

    describe("not.contain(txts, msg)", function() {
      it("not.contain(txts, msg) - pass", function() {
        f.must.not.contain(["Don", "Quijote"], "Custom message");
      });

      it("not.contain(txts, msg) - fail", function() {
        (function() {
          f.must.not.contain(["de", "la", "Mancha"], "Custom message");
        }).must.raise("Custom message");
      });
    });
  });

  describe("#must.be.eq()", function() {
    describe("be.eq(txt)", function() {
      it("be.eq(txt) - pass", function() {
        f.must.be.eq(CONTENT);
      });

      it("be.eq(txt) - fail", function() {
        f.must.be.eq.must.raise([""]);
      });
    });

    describe("be.eq(txt, msg)", function() {
      it("be.eq(txt, msg) - pass", function() {
        f.must.be.eq(CONTENT, "Custom message");
      });

      it("be.eq(txt, msg) - fail", function() {
        (function() {
          f.must.be.eq("", "Custom message");
        }).must.raise("Custom message");
      });
    });
  });

  describe("#must.not.be.eq()", function() {
    describe("not.be.eq(txt)", function() {
      it("not.be.eq(txt) - pass", function() {
        f.must.not.be.eq("");
      });

      it("not.be.eq(txt) - fail", function() {
        f.must.not.be.eq.must.raise([""]);
      });
    });

    describe("not.be.eq(txt, msg)", function() {
      it("not.be.eq(txt, msg) - pass", function() {
        f.must.not.be.eq("", "Custom message");
      });

      it("not.be.eq(txt, msg) - fail", function() {
        (function() {
          f.must.not.be.eq(CONTENT, "Custom message");
        }).must.raise("Custom message");
      });
    });
  });

  describe("#must.be.json()", function() {
    describe("be.json()", function() {
      it("be.json() - pass", function() {
        jf.must.be.json();
      });

      it("be.json() - fail", function() {
        f.must.be.json.must.raise();
      });
    });

    describe("be.json(msg)", function() {
      it("be.json(msg) - pass", function() {
        jf.must.be.json("Custom message");
      });

      it("be.json(msg) - fail", function() {
        (function() {
          f.must.be.json("Custom message");
        }).must.raise("Custom message");
      });
    });

    describe("be.json(obj)", function() {
      it("be.json(obj) - pass", function() {
        jf.must.be.json(JSON_OBJECT);
      });

      it("be.json(obj) - fail", function() {
        (function() {
          jf.must.be.json({});
        }).must.raise();
      });
    });

    describe("be.json(obj, msg)", function() {
      it("be.json(obj, msg) - pass", function() {
        jf.must.be.json(JSON_OBJECT, "Custom message");
      });

      it("be.json(obj, msg) - fail", function() {
        (function() {
          jf.must.be.json({}, "Custom message");
        }).must.raise("Custom message");
      });
    });
  });

  describe("#must.not.be.json()", function() {
    describe("not.be.json()", function() {
      it("not.be.json() - pass", function() {
        f.must.not.be.json();
      });

      it("not.be.json() - fail", function() {
        (function() {
          jf.must.not.be.json();
        }).must.raise();
      });
    });

    describe("not.be.json(msg)", function() {
      it("not.be.json(msg) - pass", function() {
        f.must.not.be.json("Custom message");
      });

      it("not.be.json(msg) - fail", function() {
        (function() {
          jf.must.not.be.json("Custom message");
        }).must.raise("Custom message");
      });
    });

    describe("not.be.json(obj)", function() {
      it("not.be.json(obj) - pass", function() {
        jf.must.not.be.json({});
      });

      it("not.be.json(obj) - fail", function() {
        (function() {
          jf.must.not.be.json(JSON_OBJECT);
        }).must.raise();
      });
    });

    describe("not.be.json(obj, msg)", function() {
      it("not.be.json(obj, msg) - pass", function() {
        jf.must.not.be.json({}, "Custom message");
      });

      it("not.be.json(obj, msg) - fail", function() {
        (function() {
          jf.must.not.be.json(JSON_OBJECT, "Custom message");
        }).must.raise("Custom message");
      });
    });
  });
});

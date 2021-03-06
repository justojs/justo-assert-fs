//imports
const path = require("path");
const file = require("../../../dist/es5/nodejs/justo-assert-fs").file;

//suite
describe("File", function() {
  const DIR = "test/unit/data";
  const FILE_NAME = "myfile.txt";
  const JSON_FILE_NAME = "myfile.json";
  const YAML_FILE_NAME = "myfile.yml";
  const SUBDIR_NAME = "subdir";
  const SUBDIR_PATH = path.join(DIR, SUBDIR_NAME);
  const CONTENT = "En un lugar de la Mancha,\n" +
                  "de cuyo nombre no quiero acordarme,\n" +
                  "no hace mucho tiempo que vivía un hidalgo de los de lanza en astillero,\n" +
                  "adarga antigua,\n" +
                  "rocín flaco y galgo corredor.\n";
  const JSON_OBJECT = {x: 1, y: 1};
  const YAML_OBJECT = {
    language: "node_js",
    node_js: ["0.11", "0.12"],
    sudo: false,
    before_install: "npm install -g grunt-cli",
    install: "npm install",
    before_script: "grunt buildes5"
  };
  var f, jf, yf;

  beforeEach(function() {
    f = file(DIR, FILE_NAME);
    jf = file(DIR, JSON_FILE_NAME);
    yf = file(DIR, YAML_FILE_NAME);
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

  describe("#yaml", function() {
    it("yaml - pass", function() {
      yf.yaml.must.be.eq(YAML_OBJECT);
    });

    it("yaml - fail", function() {
      (function() {
        var con = f.yaml;
      }).must.raise();
    });
  });

  describe("#json", function() {
    it("json - pass", function() {
      jf.json.must.be.eq(JSON_OBJECT);
    });

    it("json - fail", function() {
      (function() {
        var con = f.json;
      }).must.raise();
    });
  });

  describe("#text", function() {
    it("text - pass", function() {
      f.text.must.be.eq(CONTENT);
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
    it("be.json() - pass", function() {
      jf.must.be.json();
    });

    it("be.json() - fail", function() {
      f.must.be.json.must.raise();
    });

    it("be.json(msg) - pass", function() {
      jf.must.be.json("Custom message");
    });

    it("be.json(msg) - fail", function() {
      (function() {
        f.must.be.json("Custom message");
      }).must.raise("Custom message");
    });
  });

  describe("#must.not.be.json()", function() {
    it("not.be.json() - pass", function() {
      f.must.not.be.json();
    });

    it("not.be.json() - fail", function() {
      (function() {
        jf.must.not.be.json();
      }).must.raise();
    });

    it("not.be.json(msg) - pass", function() {
      f.must.not.be.json("Custom message");
    });

    it("not.be.json(msg) - fail", function() {
      (function() {
        jf.must.not.be.json("Custom message");
      }).must.raise("Custom message");
    });
  });

  describe("#must.be.yaml()", function() {
    it("be.yaml() - pass", function() {
      yf.must.be.yaml();
    });

    it("be.yaml() - fail", function() {
      (function() {
        f.must.be.yaml();
      }).must.raise();
    });

    it("be.yaml(msg) - pass", function() {
      yf.must.be.yaml("Custom message");
    });

    it("be.yaml(msg) - fail", function() {
      (function() {
        f.must.be.yaml("Custom message");
      }).must.raise("Custom message");
    });
  });

  describe("#must.not.be.yaml()", function() {
    it("not.be.yaml() - pass", function() {
      f.must.not.be.yaml();
    });

    it("not.be.yaml() - fail", function() {
      (function() {
        yf.must.not.be.yaml();
      }).must.raise();
    });

    it("not.be.yaml(msg) - pass", function() {
      f.must.not.be.yaml("Custom message");
    });

    it("not.be.yaml(msg) - fail", function() {
      (function() {
        yf.must.not.be.yaml("Custom message");
      }).must.raise("Custom message");
    });
  });
});

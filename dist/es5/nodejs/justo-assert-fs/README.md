[![Build Status](https://travis-ci.org/justojs/justo-assert-fs.svg?branch=master)](https://travis-ci.org/justojs/justo-assert-fs)

An assertion library for files.

*Proudly made with ♥ in Valencia, Spain, EU.*

Features:

- Allow to assert files.
- Allow to access the file content: text, JSON and YAML.
- Allow to assert directories.

## Install

```
npm install justo-assert-fs
```

## Table of contents

1. [File assertions](#file-assertions)
2. [Directory assertions](#directory-assertions)

## File assertions

To assert files, we have to use the `file()` function as starting point:

```
file(path : string)
file(dir : string, file : string)
```

Once created the file object, we have to use the `must` property to assert.

Example:

```
const file = require("justo-assert-fs").file;

file("/my/dir", "file.txt").must.exist()
```

### must.exist() and must.not.exist()

Checks whether the file exists:

```
must.exist()
must.exist(msg : string)

must.not.exist()
must.not.exist(msg : string)
```

###  must.contain() and must.not.contain()

Checks whether the file contains a text or several texts:

```
must.contain(txt : string)
must.contain(txt : string, msg : string)
must.contain(txts : string[])
must.contain(txts : string[], msg : string)

must.not.contain(txt : string)
must.not.contain(txt : string, msg : string)
must.not.contain(txt : string[])
must.not.contain(txt : string[], msg : string)
```

### must.be.equal(), must.be.eq(), must.not.be.equal() and must.not.be.eq()

Checks whether the file content is equal to a given text:

```
must.be.eq(txt : string)
must.be.eq(txt : string, msg : string)

must.not.be.eq(txt : string)
must.not.be.eq(txt : string, msg : string)
```

### Asserting JSON files

#### must.be.json() and must.not.be.json()

Checks whether the file content is a JSON object:

```
must.be.json()
must.be.json(msg : string)

must.not.be.json()
must.not.be.json(msg : string)
```

#### json property

The file object contains a `json` property for returning the content as an object.
We can use, for example, `justo-assert` to check the content:

```
file("myfile.json").json.must.be.eq({...});
```

### Asserting YAML files

#### must.be.yaml() and must.not.be.yaml()

Checks whether the file is a YAML file:

```
must.be.yaml()
must.be.yaml(msg : string)

must.not.be.yaml()
must.not.be.yaml(msg : string)
```

#### yaml property

Similarly to `json`, the file object has a `yaml` property for returning the content
as an object:

```
file("myfile.yml").yaml.must.be.eq({...});
```

### Asserting text files

#### text property

Similarly to `json` and `yaml`, we also have the `text` property:

```
file("myfile.txt").text.must.be.eq({...});
```

## Directory assertions

To assert directories, we have to use the `dir()` function as starting point:

```
dir(path : string)
dir(parent : string, name : string)
```

Once created the direcory object, we have to use the `must` property to assert.

Example:

```
const dir = require("justo-assert-fs").dir;

dir("/my/dir", "subdir").must.exist()
```

### must.exist() and must.not.exist()

Checks whether the directory exists:

```
must.exist()
must.exist(msg : string)

must.not.exist()
must.not.exist(msg : string)
```

###  must.have() and must.not.have()

Checks whether the directory contains a specified entry set (file, directories...):

```
must.have(entry : string)
must.have(entry : string, msg : string)
must.have(entries : string[])
must.have(entries : string[], msg : string)

must.not.have(entry : string)
must.not.have(entry : string, msg : string)
must.not.have(entries : string[])
must.not.have(entries : string[], msg : string);
```

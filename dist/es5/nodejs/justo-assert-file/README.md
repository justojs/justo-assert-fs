# justo-assert-file

An assertion library for files.

Proudly made in Valencia, Spain, EU.

Features:

- Allow to assert files.
- Allow to assert directories.

## Install

```
npm install justo-assert-file
```

## Assertions
`justo-assert-file` allows to assert files and directories.

### File assertions

To assert files, we have to use the `file()` function as starting point:

```
file(path : string)
file(dir : string, file : string)
```

Once created the file object, we have to use the `must` property to assert.

Example:

```
const file = require("justo-assert-file").file;

file("/my/dir", "file.txt").must.exist()
```

#### must.exist()

Checks whether the file exists:

```
must.exist()
must.exist(msg : string)
```

#### must.not.exist()

Checks whether the file doesn't exist:

```
must.not.exist()
must.not.exist(msg : string)
```

####  must.contain()

Checks whether the file contains a text or several texts:

```
must.contain(txt : string)
must.contain(txt : string, msg : string)
must.contain(txts : string[])
must.contain(txts : string[], msg : string)
```

#### must.not.contain()

Checks whether the file doesn't contain a text or several texts:

```
must.not.contain(txt : string)
must.not.contain(txt : string, msg : string)
must.not.contain(txt : string[])
must.not.contain(txt : string[], msg : string)
```

#### must.be.equal() or must.be.eq()

Checks whether the file content is equal to a given text:

```
must.be.eq(txt : string)
must.be.eq(txt : string, msg : string)
```

#### must.not.be.equal() or must.not.be.eq()

Checks whether the file content is not equal to a given text:

```
must.not.be.eq(txt : string)
must.not.be.eq(txt : string, msg : string)
```

#### must.be.json()

Checks whether the file content is a JSON object:

```
must.be.json()
must.be.json(msg : string)
```

If needed, we can specify the concrete object:

```
must.be.json(obj : object)
must.be.json(obj : object, msg : string)
```

### Directory assertions

To assert directories, we have to use the `dir()` function as starting point:

```
dir(path : string)
dir(parent : string, name : string)
```

Once created the direcory object, we have to use the `must` property to assert.

Example:

```
const dir = require("justo-assert-file").dir;

dir("/my/dir", "subdir").must.exist()
```

#### must.exist()

Checks whether the directory exists:

```
must.exist()
must.exist(msg : string)
```

#### must.not.exist()

Checks whether the directory doesn't exist:

```
must.not.exist()
must.not.exist(msg : string)
```

####  must.contain()

Checks whether the directory contains an entry (file, link or directory):

```
must.contain(entry : string)
must.contain(entry : string, msg : string)
```

#### must.not.contain()

Checks whether the directory doesn't contain an entry (file, link or directory):

```
must.not.contain(entry : string)
must.not.contain(entry : string, msg : string)
```

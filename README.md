# kabutils

My personal library with some helper stuff in it.

## How to use

```
npm i kabutils
```

This library is ES6 only.

```javascript
import * as kabutils from 'kabutils'
// or if you want only particular helpers
import { parseFromJsonL } from 'kabutils'
```

## Helpers

Waiting for some better docs, here is a list of the available helpers

- [Big Query and JSONL files](#big-query-and-jsonl-files)
  - [parseFromJsonL](#parsefromjsonl)
  - [parseToJsonL](#parsetojsonl)
  - [readFromJsonL](#readfromjsonl)
  - [writeToJsonL](#writetojsonl)

### Big Query and JSONL files

#### parseFromJsonL

- This function parses a string (for instance from a .jsonl file) you'd want as an array of JS objects.
- `@param {string} jsonl` the json (new line delimited) string you want to parse
- `@returns {any[]}` An array of javascript objects

#### parseToJsonL

- This function parses a string (for instance from a .jsonl file) you'd want as an array of JS objects.
- `@param {string} jsonl` the json (new line delimited) string you want to parse
- `@returns {any[]}` An array of javascript objects

#### readFromJsonL

- This function reads from an input `.jsonl` file and returns an array of JS objects from it
- `@param {string} path` path of the jsonl file you want to read and parse.
- `@returns {any[]}` an array of JS objects parsed from the input file.

#### writeToJsonL

- Writes a file as per [JSONL](https://jsonlines.org/) specs, useful for Big Query
- `@param {string} path` the output path and filename you want for the data. JSONL files' extension should (but don't have to) be `.jsonl`.
- `@param {any[]}` data An array of JS objects you want to store in a .jsonl file.

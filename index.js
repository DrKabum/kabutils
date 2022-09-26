import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { parse } from 'node:path'

/**
 * Parses an array of objects and returns a [JSONL string](https://jsonlines.org/) as used in Big Query.
 * You can have nested objects in it but no arrays. See [limitations](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-json).
 * @param {Object[]} object
 * @returns {string} returns a JSON (new line delimited) string.
 */
export function parseToJsonL(object) {
  return object.map((item) => JSON.stringify(item)).join('\n')
}

/**
 * This function reads from an input `.jsonl` file and returns an array of JS objects from it
 * @param {string} path path of the jsonl file you want to read and parse.
 * @returns {any[]} an array of JS objects parsed from the input file.
 */
export function readFromJsonL(path) {
  return parseFromJsonL(readFileSync(path, 'utf-8'))
}

/**
 * This function parses a string (for instance from a .jsonl file) you'd want as an array of JS objects.
 * @param {string} jsonl the json (new line delimited) string you want to parse
 * @returns {any[]} An array of javascript objects
 */
export function parseFromJsonL(jsonl) {
  return jsonl.split(`\n`).map((item) => JSON.parse(item))
}

/**
 * Writes a file as per [JSONL](https://jsonlines.org/) specs, useful for Big Query
 * @param {string} path the output path and filename you want for the data. JSONL files' extension should (but don't have to) be `.jsonl`.
 * @param {any[]} data An array of JS objects you want to store in a .jsonl file.
 */
export function writeToJsonL(filepath, data) {
  const { dir } = parse(filepath)

  if (dir && !existsSync(dir)) mkdirSync(dir, { recursive: true })

  writeFileSync(filepath, parseToJsonL(data))
}

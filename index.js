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

/**
 * This function formats a raw byte number into a readable string
 *
 * Adapted from the [function](https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string) from the stackoverflow user [mpen](https://stackoverflow.com/users/65387/mpen).
 *
 * @param {Number} bytes The integer you want to readablise
 * @param {boolean} si `true` to use metric units (power of 1000) or `false` to use binary (IEC, power of 1024)
 * @param {*} dp number of decimal to display
 * @returns A formatted string
 */
export function byteSizeToReadable(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  )

  return bytes.toFixed(dp) + ' ' + units[u]
}

export function logWarning(string) {
  console.log('\x1b[33m%s\x1b[0m', string)
}

export function logError(string) {
  console.log('\x1b[31m%s\x1b[0m', string)
}

export function logInfo(string) {
  console.log('\x1b[34m%s\x1b[0m', string)
}

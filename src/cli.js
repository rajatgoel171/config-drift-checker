#!/usr/bin/env node
import fs from "node:fs/promises";
import { compareConfig } from "./drift.js";

const [expectedPath, actualPath] = process.argv.slice(2);
if (!expectedPath || !actualPath) {
  console.error("Usage: node src/cli.js examples/expected.json examples/actual.json");
  process.exit(1);
}

const expected = JSON.parse(await fs.readFile(expectedPath, "utf8"));
const actual = JSON.parse(await fs.readFile(actualPath, "utf8"));
const report = compareConfig(expected, actual);

console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 2);

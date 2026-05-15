import assert from "node:assert/strict";
import { test } from "node:test";
import { compareConfig } from "../src/drift.js";

test("reports missing, unexpected, and changed config", () => {
  const report = compareConfig(
    { NODE_ENV: "production", LOG_LEVEL: "info", API_URL: "https://api.example.com" },
    { NODE_ENV: "production", LOG_LEVEL: "debug", EXTRA: "true" },
  );

  assert.equal(report.ok, false);
  assert.deepEqual(report.missing, ["API_URL"]);
  assert.deepEqual(report.unexpected, ["EXTRA"]);
  assert.deepEqual(report.changed, [{ key: "LOG_LEVEL", expected: "info", actual: "debug" }]);
});

test("passes matching config", () => {
  assert.deepEqual(compareConfig({ A: "1" }, { A: "1" }), {
    ok: true,
    missing: [],
    unexpected: [],
    changed: [],
  });
});

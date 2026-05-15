export function compareConfig(expected, actual) {
  const missing = [];
  const unexpected = [];
  const changed = [];

  for (const [key, expectedValue] of Object.entries(expected)) {
    if (!(key in actual)) {
      missing.push(key);
    } else if (actual[key] !== expectedValue) {
      changed.push({ key, expected: expectedValue, actual: actual[key] });
    }
  }

  for (const key of Object.keys(actual)) {
    if (!(key in expected)) unexpected.push(key);
  }

  return {
    ok: missing.length === 0 && unexpected.length === 0 && changed.length === 0,
    missing,
    unexpected,
    changed,
  };
}

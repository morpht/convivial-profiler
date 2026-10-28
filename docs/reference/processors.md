# Processors

Processors receive all source values and usually write internal storage. They run in array order and do not normally replace those values. Destinations read the resulting storage paths.

Set the exact `type` and the options described here. Time-to-live values are numeric seconds. See [Storage and expiry](../concepts-and-tools/storage-and-expiry.md) for cleanup timing.

## `accumulation`

Options: `storage_key`.

Adds each input to `accumulators.<storage_key>`. Values are parsed as numbers; zero and non-numeric inputs contribute `1` because of the helper's fallback. Totals have no automatic expiry.

```json
{ "type": "accumulation", "storage_key": "value" }
```

## `dimension`

Options: `storage_key`, `normalize`.

Increments `dimensions.<storage_key>.<input-value>`. With `normalize: false`, each input adds `1`. With `normalize: true`, each adds `1 / values.length`, so one collection contributes a total of one across its inputs. Repeated values each contribute.

```json
{ "type": "dimension", "storage_key": "topic", "normalize": true }
```

For two values, `gardening` and `walking`, each category gains `0.5`. Scores persist across visits and do not decay automatically.

## `extreme_geoip`

Options: `storage_key`, `ttl`.

Stores each input as `{ value, expire }` under `fetchers.<storage_key>`. The last input wins. Despite its name, it stores the supplied JSON value without extracting geographic fields. A deferred profiler must have the same name as `storage_key`. Use a positive `ttl`; `-1` is not a permanent-cache option here.

```json
{ "type": "extreme_geoip", "storage_key": "location", "ttl": 3600 }
```

## `language_full`

Options: `storage_key`, `ttl`.

Lowercases each input and stores it under `store.<storage_key>` with an expiry. For example, `en-AU` becomes `en-au`. The last input wins.

**Current limitation:** positive TTL values produce an expiry in the past. The demo uses `ttl: -1`, which also produces an already-expired entry. A destination in the same collection can publish the value before cleanup, but the internal language entry does not persist with these settings. Do not assume the `store` processor's one-year convention applies.

```json
{ "type": "language_full", "storage_key": "language_full", "ttl": -1 }
```

## `language_simple`

Options: `storage_key`, `ttl`.

Keeps the part before the first hyphen and lowercases it: `zh-Hant-TW` becomes `zh`. Writes to `store.<storage_key>` and has the same expiry limitation as `language_full`.

```json
{ "type": "language_simple", "storage_key": "language_simple", "ttl": -1 }
```

## `logger`

Options: `storage_key`, optional `size`.

Records each input as a property in `log.<storage_key>` with a timestamp. It only runs when the first input is truthy. Repeated values update their timestamp rather than create duplicate entries. When the current entry count equals `size`, the oldest entry is removed before recording the next value; even a repeated value can trigger that removal.

```json
{ "type": "logger", "storage_key": "recent_topics", "size": 10 }
```

Use simple strings as inputs; the log is an object keyed by value, not an array of records.

## `map`

Options: `storage_key`, `mappings`, `fallback_value`, `default_value`.

Looks at only the first source value. `mappings` contains strings in `input|output` form. The first matching string supplies the stored output. A non-empty unmatched input uses `fallback_value`; no usable input or mappings uses `default_value`.

```json
{
  "type": "map",
  "storage_key": "region",
  "mappings": ["AU|local", "NZ|nearby"],
  "fallback_value": "international",
  "default_value": "unknown"
}
```

The match uses substring search for `input|`, rather than exact comparison of the left-hand field. Choose non-overlapping mapping identifiers. The output is stored at `store.<storage_key>.value` with the current timestamp as expiry and is intended for immediate destination use.

## `pageview`

Options: `storage_key`, `log`, `track`.

With `log: true`, records the full page URL under `log.<storage_key>`. With `track: true`, increments `counters.<storage_key>`. Both require actual booleans and work with an empty sources array. Repeated collection counts again; the log keeps one timestamp per URL.

```json
{ "type": "pageview", "storage_key": "pageview", "log": false, "track": true }
```

## `searchquery`

Options: `storage_key`, `search_path`, `query_param`, `exclude_param`, `log`, `track`, optional `size`.

Checks whether the current path includes `search_path`, the URL has a non-empty `query_param`, and `exclude_param` is absent. It then attempts to log or count a unique query. For example, `exclude_param: "page"` avoids counting pagination URLs.

**Current limitation:** the uniqueness check expects a log array, but the shared logger writes an object. With logging enabled, a later qualifying collection can throw `searchQueryLogs.find is not a function`. Logged objects also do not retain the intended record structure. Validate this plugin before relying on search history; turning logging off does not provide persistent unique-query tracking.

## `store`

Options: `storage_key`, `ttl`.

Stores `{ value, expire }` under `store.<storage_key>`. The last input wins. Set `ttl` to seconds, or `-1` for 365 days. Empty input leaves any existing entry unchanged; it does not clear it.

```json
{ "type": "store", "storage_key": "topic_param", "ttl": 300 }
```

## `unstore_value`

Options: `unstore_key`, `storage_key`, `storage_value`.

If an input loosely equals `store.<unstore_key>.value`, deletes that entry and writes `{ value: storage_value }` to `temp.<storage_key>`. This can clear a fulfilled intent and provide a follow-up value to a destination. It does not automatically delete previously published keys.

```json
{
  "type": "unstore_value",
  "unstore_key": "intent",
  "storage_key": "intent_complete",
  "storage_value": "complete"
}
```

## `temp`

Options: `storage_key`.

Stores `{ value }` under `temp.<storage_key>`, with the last input winning. The namespace is reset on construction, but storage helpers still persist it to local storage. It is useful for a current-page override, not for secret or memory-only data.

```json
{ "type": "temp", "storage_key": "topic_override" }
```

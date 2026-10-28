# Destinations

Destinations publish values or act on them after processing. Most read internal storage; `bestpick` and `formfiller` read separately published values. `datalayer_event` uses the original source values.

For plugins that write storage, include `target_location` with `localstorage: "localstorage"`, `cookie: "cookie"`, or both. The examples use local storage. Values become strings unless a plugin explicitly serialises JSON.

Several plugins only act on truthy values. Numeric `0`, `false`, and an empty string can therefore be treated as missing. Where supported, `remove_empty: true` removes the local-storage target when the input is missing; it does not remove a cookie. See [Storage and expiry](../concepts-and-tools/storage-and-expiry.md) for stale published values.

## `bestpick`

Options: `storage_keys`, `target_key`, `target_location`, optional `default_value`, `remove_empty`.

Reads the listed **top-level local-storage keys** in priority order. Publishes the first non-empty value, or a truthy `default_value` when none is available. It does not read internal dot-separated paths or cookies.

```json
{
  "type": "bestpick",
  "storage_keys": ["audience_param", "audience_top"],
  "default_value": "general",
  "target_key": "audience",
  "target_location": { "localstorage": "localstorage" },
  "remove_empty": true
}
```

## `copy`

Options: `storage_key`, `target_key`, `target_location`, optional `stringify`, `remove_empty`.

Reads an internal path and publishes its value. With `stringify: true`, serialises the value as JSON first. Set this for objects that a consumer will parse; otherwise local storage may contain `[object Object]`.

```json
{
  "type": "copy",
  "storage_key": "store.topic_param.value",
  "target_key": "topic_param",
  "target_location": { "localstorage": "localstorage" },
  "remove_empty": true
}
```

## `datalayer_event`

Options: `category`, `action`, optional `normalize`.

Pushes one event per source value onto `window.dataLayer`, creating the array if necessary. It does not itself send a network request, but analytics code consuming that array may do so. With `normalize: true`, each event has weight `1 / values.length`; otherwise the weight is `1`.

```json
{ "type": "datalayer_event", "category": "topic", "action": "view", "normalize": true }
```

For a single `gardening` source value, the event is:

```json
{
  "event": "convivialProfiler.event",
  "category": "topic",
  "action": "view",
  "label": "gardening",
  "value": 1
}
```

## `flag`

Options: `storage_key`, `target_location`, optional `flag_prefix`, `flag_suffix`.

Reads an internal value, adds the prefix and suffix, and uses the result as both the storage key and value. It has no `target_key` option. For example, prefix `topic-` and value `gardening` write `topic-gardening=topic-gardening`.

## `formfiller`

Options: `form_selector`, `fields_selector`, `storage_source`.

Finds the first form matching `form` plus `form_selector`. Use a suffix such as `#preferences`, not `form#preferences`. Each `fields_selector` entry is `input_name|published_storage_key`.

```json
{
  "type": "formfiller",
  "form_selector": "#preferences",
  "fields_selector": ["topic|topic"],
  "storage_source": { "localstorage": "localstorage" }
}
```

`storage_source` uses the same enabling strings as `target_location`. If both sources are enabled, the cookie value overwrites the local-storage value. The plugin handles matching `input` elements; it does not populate `select` or `textarea` elements or dispatch change events. Collect after the form exists.

## `formtracker`

Options: `form_selector`, `field_name`, `event_category`, `event_action`.

Attaches a submit listener to the first matching form, using the same selector-suffix convention as `formfiller`. On submission it pushes a `convivialProfiler.event` event with the configured category and action, the input's value as `label`, and `1` as `value`.

```json
{
  "type": "formtracker",
  "form_selector": "#preferences",
  "field_name": "topic",
  "event_category": "preferences",
  "event_action": "submit"
}
```

The input must exist when submitted. For radio and checkbox groups, it uses the first checked match when one exists; otherwise it retains the first input's value. Repeated collection adds listeners again. Avoid tracking sensitive form fields.

## `officehours`

Options: `target_key`, `target_location`, `normal_start`, `normal_end`, `normal_offset`, `daylight_saving_offset`, `office_times`.

Calculates office time using a UTC offset in hours. It uses `normal_offset` between the parsed `normal_start` and `normal_end` timestamps, inclusively, and `daylight_saving_offset` outside that period. The demo's `daylight_saving_start` and `daylight_saving_end` fields are not read.

`office_times` is an array of `{ day, start, close }` objects, with Sunday numbered `0`. Hours are integers and both boundaries are inclusive: a close value of `17` includes the whole 17:00 hour. Omit closed days; `{ start: 0, close: 0 }` marks the midnight hour as open. If several entries match a day, the last evaluated entry determines the result.

Publishes `1` for open or `0` for closed. Maintain the date range yourself; this plugin does not use an IANA time-zone database or a holiday calendar.

## `range`

Options: `storage_key`, `ranges`, `target_key`, `target_location`, optional `remove_empty`.

Each range is `{ min, max, key }`. Publishes `key` when the internal numeric value is at least `min` and below `max`. Overlapping matches are processed in order, so the last one wins. No match leaves an existing output unchanged. Numeric zero is treated as missing.

```json
{
  "type": "range",
  "storage_key": "counters.pageview",
  "ranges": [
    { "min": 1, "max": 5, "key": "new" },
    { "min": 5, "max": 1000000, "key": "returning" }
  ],
  "target_key": "engagement",
  "target_location": { "localstorage": "localstorage" }
}
```

## `remove`

Options: `storage_keys`, `target_location`, optional `static_values`.

Reads internal paths from `storage_keys`. Their values are the names of local-storage keys or cookies to delete. Additional `static_values` are appended only when at least one path resolves to a value other than `undefined`; a static-only configuration is not unconditional deletion.

It removes published keys, not the corresponding internal entries. Cookie deletion uses an empty value and an immediate expiry. Only allow approved target names; do not give an unrestricted user-supplied value control over unrelated storage keys.

## `season`

Options: `storage_key`, `target_key`, `target_location`, optional `remove_empty`.

Reads latitude from an internal path. Positive values use northern-hemisphere month-based seasons; negative values shift the seasons by six months. Publishes `winter`, `spring`, `summer`, or `autumn`. Numeric zero is treated as missing, while the string `"0"` is truthy and follows the northern calculation. This is a seasonal approximation, not local weather data.

## `set`

Options: `storage_key`, `target_location`.

Reads an internal value and uses it as the name of a published key to set to `"1"`. For example, a value `subscribed` writes `subscribed=1`. It has no `target_key` field. Restrict the allowed key names in your integration.

## `threshold`

Options: `storage_key`, `threshold_number`, `target_key`, `target_value`, `target_location`.

If the internal value is truthy and greater than or equal to `threshold_number`, publishes `target_value`. Below the threshold it leaves any previous output unchanged. It does not automatically reverse an earlier match.

## `top`

Options: `dimension_key`, `target_key`, `target_location`, optional `remove_empty`.

Reads a full dimension path such as `dimensions.topic` and publishes the category with the highest score. On a tie it keeps the first category encountered in object-key order.

```json
{
  "type": "top",
  "dimension_key": "dimensions.topic",
  "target_key": "topic_top",
  "target_location": { "localstorage": "localstorage" }
}
```

An empty dimension object is truthy and can publish the string `"null"`; `remove_empty` handles a missing dimension, not an empty object.

## `tops`

Options: `dimension_key`, `length`, `target_key`, `target_location`, optional `default_value`, `stringify`.

Sorts category scores descending and takes up to `length` names. If the dimension is absent, splits a comma-separated `default_value` into names; that fallback is not truncated by `length`. With `stringify: true`, publishes a JSON array. Otherwise local storage receives a comma-separated string.

```json
{
  "type": "tops",
  "dimension_key": "dimensions.topic",
  "length": 3,
  "default_value": "general",
  "stringify": true,
  "target_key": "top_topics",
  "target_location": { "localstorage": "localstorage" }
}
```

Provide a fallback if the dimension may be missing; otherwise an `undefined` value can be published. An empty dimension produces an empty result rather than the fallback.

## `unset`

Options: `storage_key`, `target_location`.

Uses the internal value as the name of a published key and writes `"0"`. It does not delete the key. Use `remove` when the key should be deleted. Like `set`, it has no `target_key` field.

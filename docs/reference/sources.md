# Sources

Sources append inputs to a shared `values` array. They run in their configured array order. Use the exact `type` identifier shown below.

## `acceptlang`

Reads `navigator.language` unchanged, such as `en`, `en-AU`, or `zh-Hant`. If the browser language is missing or empty, appends `en`. No additional options are read; the demo's `key` field is not required.

```json
{ "type": "acceptlang" }
```

## `cookie`

Reads and URI-decodes the cookie identified by `name`. Appends its value if the cookie exists. A missing cookie adds no value; an existing empty cookie adds an empty string.

```json
{ "type": "cookie", "name": "preferred_audience" }
```

## `get`

Starts an HTTP GET request to `resource_url`, parses the response as JSON, and appends the parsed value as one array entry. A JSON array is not flattened.

```json
{ "type": "get", "resource_url": "/visitor-context.json" }
```

The response reruns processors asynchronously, without rerunning destinations. Requests follow browser cross-origin restrictions. This plugin does not expose request headers, a timeout, a completion promise, or HTTP-status validation. Parsing and network failures produce a debug message. Follow [Data pipelines](../concepts-and-tools/data-pipelines.md) when using it.

## `httpuseragent`

Appends `mobile` when the user-agent string matches the plugin's device patterns; otherwise appends `desktop`. This is a coarse classification and does not detect viewport width or provide a distinct tablet category.

```json
{ "type": "httpuseragent" }
```

## `meta`

Reads every `meta` element whose `name` matches `attribute_name`. Each non-empty `content` attribute becomes one value. A comma-separated attribute remains one string; use separate tags for separate categories.

```json
{ "type": "meta", "attribute_name": "topic" }
```

```html
<meta name="topic" content="gardening">
<meta name="topic" content="walking">
```

These tags produce `["gardening", "walking"]`. They must exist before collection.

## `query`

Reads query parameters named `param` or `param[]`. Repeated parameters produce multiple values; percent encoding is decoded and `+` becomes a space.

```json
{ "type": "query", "param": "topic" }
```

For example, `?topic=gardening&topic[]=walking` produces two values. Always supply `=value`; a bare `?topic` can throw in the current parser. Malformed percent encoding can also throw. Avoid unescaped `=` characters inside values.

## `time`

Appends a component of the browser's local time. `part` accepts `hour` (0–23), `minute` (0–59), or `second` (0–59). Other values append nothing.

```json
{ "type": "time", "part": "hour" }
```

The browser time zone may differ from the site's office time zone. Use the [officehours destination](destinations.md#officehours) for configured office hours.

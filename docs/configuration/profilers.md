# Profiler configuration

Pass a configuration object containing `profilers` to the constructor. Each property of `profilers` names a pipeline and contains three arrays: `sources`, `processors`, and `destinations`. Supply an empty array when a stage has no plugins.

```json
{
  "client_cleanup": false,
  "profilers": {
    "pageviews": {
      "sources": [],
      "processors": [
        { "type": "pageview", "storage_key": "pageview", "track": true, "log": false }
      ],
      "destinations": [
        {
          "type": "copy",
          "storage_key": "counters.pageview",
          "target_key": "pageview_count",
          "target_location": { "localstorage": "localstorage" }
        }
      ]
    }
  }
}
```

One collection increases the internal page-view counter and publishes its value as a string under `pageview_count`.

## Configuration fields

| Field | Meaning |
| --- | --- |
| `profilers` | Required object containing the pipelines |
| `client_cleanup` | When exactly `true`, clears internal storage if the client ID changes |
| `profilers.<name>.sources` | Required array of source definitions |
| `profilers.<name>.processors` | Required array of processor definitions |
| `profilers.<name>.destinations` | Required array of destination definitions |
| `profilers.<name>.deferred` | Skip the whole pipeline while `fetchers.<name>.expire` is in the future |
| `type` on a plugin | Exact registered plugin identifier, such as `query` or `bestpick` |

`name`, `label`, `description`, `weight`, and `status` appear in the repository's larger demo configuration. They are metadata for integrations; this library does not use them to rename, sort, or disable a pipeline. There is no library-level `event_tracking` switch either. Remove analytics destinations from the configuration when they should not run.

The library does not validate the configuration schema. An unknown plugin type produces a console debug message and is skipped, but a missing array or malformed plugin option can throw an error.

## Destination locations

Most publishing destinations accept this object:

```json
{
  "target_location": {
    "localstorage": "localstorage",
    "cookie": "cookie"
  }
}
```

Each enabled location must contain the matching string. `true` does not enable it. Omit a location to disable it; the larger demo also uses the string `"0"` for disabled locations. Supply `target_location` for plugins that use it.

Values written to local storage become strings. Use `stringify: true` with `copy` or `tops` when the consumer expects JSON. Cookie destinations use the library cookie helper; see its limitations in [Consent and data handling](../concepts-and-tools/consent-and-data.md).

## Ordering pipelines

Define producers before consumers. For example, collect and publish `audience_param` and `audience_top` before a `bestpick` pipeline chooses the final audience.

Use descriptive non-numeric object keys to preserve insertion order. A `weight` field will not change execution order. Filter disabled pipelines and sort them in your integration before constructing the object.

## Deferred fetching

The deferred check uses the profiler's object key, not a configurable fetcher path. Pair the same key with the HTTP cache processor:

```json
{
  "profilers": {
    "location": {
      "deferred": true,
      "sources": [{ "type": "get", "resource_url": "/visitor-context.json" }],
      "processors": [{ "type": "extreme_geoip", "storage_key": "location", "ttl": 3600 }],
      "destinations": []
    },
    "location_output": {
      "sources": [],
      "processors": [],
      "destinations": [
        {
          "type": "copy",
          "storage_key": "fetchers.location.value.country",
          "target_key": "location_country",
          "target_location": { "localstorage": "localstorage" }
        }
      ]
    }
  }
}
```

This example assumes the endpoint returns an object such as `{"country":"AU"}`. On the first collection the request has not completed when `location_output` runs. A subsequent deliberate collection can publish the cached response; it does not arrive through a completion promise. See [HTTP sources](../concepts-and-tools/data-pipelines.md#http-sources) before relying on fetched data.

## Choose the next reference

Use [Sources](../reference/sources.md) to choose inputs, [Processors](../reference/processors.md) to choose storage behaviour, and [Destinations](../reference/destinations.md) to publish or act on results. The [JavaScript API](../reference/api.md) covers initialisation and custom plugins.

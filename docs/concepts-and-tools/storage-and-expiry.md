# Storage and expiry

The library stores internal state as JSON under the local-storage key `convivial_profiler`. Each site ID has its own entry inside that object. Destinations can also publish separate local-storage keys or cookies.

## Internal storage

The following is an illustrative subset of the stored object:

```json
{
  "_clientId": "example-browser-id",
  "_version": 1,
  "_licenseKey": "community",
  "documentation-demo": {
    "store": {
      "topic_param": { "value": "gardening", "expire": 2000000000 }
    },
    "dimensions": { "topic": { "gardening": 2, "walking": 1 } },
    "counters": { "pageview": 3 },
    "accumulators": { "value": 25 },
    "temp": { "override": { "value": "walking" } }
  }
}
```

`_version` is the storage format version, not the package version. The client ID and licence value are visible to browser scripts; do not use a secret as the licence argument.

| Namespace | Contents | Lifetime |
| --- | --- | --- |
| `store` | `{ value, expire }` entries | Expired entries are removed at the end of collection |
| `dimensions` | Category-to-score objects | No automatic expiry |
| `accumulators` | Numeric totals | No automatic expiry |
| `counters` | Action counts | No automatic expiry |
| `log` | Value-to-timestamp objects | Size limits depend on the processor; no automatic expiry |
| `fetchers` | Cached `{ value, expire }` responses | Expiry controls deferred collection; entries are not automatically deleted |
| `temp` | Temporary `{ value }` entries | Reset when a new profiler instance is constructed |

`temp` is saved to local storage by the storage helpers. It is not an in-memory-only or confidential store, and a second `collect()` on the same instance does not reset it.

## Storage paths

Destination paths start inside the current site's internal state. For example:

* `store.topic_param.value` reads a stored value.
* `dimensions.topic` reads all topic scores.
* `dimensions.topic.gardening` reads one score.
* `fetchers.location.value.country` reads a field from a fetched JSON object.

Do not prefix these paths with `convivial_profiler` or the site ID. Use keys without dots when you need to address them through dot-separated paths.

`bestpick` is different: its `storage_keys` are separate local-storage keys already published by destinations. See [Destinations](../reference/destinations.md).

## Time to live

The `store` processor's `ttl` is a number of seconds. A value of `300` expires about five minutes after collection; `-1` means 365 days. Set it explicitly. Other processors have their own expiry behaviour, so do not assume they use the same `-1` convention.

Expiry is checked during collection, after destinations have run. There is no timer removing entries in the background, and `_getValue()` does not check expiry. Consequently, a destination can publish a value once more before that expired internal entry is removed.

Published local-storage keys have no automatic expiry. A `copy` destination with `remove_empty: true` removes its published key when the internal value is absent, which may require the next collection after cleanup. This option does not clear cookies. Manage prompt expiry explicitly in your integration if that is required.

## Site and client identity

Use a stable site ID to reload the same internal state. Multiple site IDs share the root `_clientId` metadata. Published keys and cookies are not automatically prefixed with the site ID; give them distinct names if several integrations share an origin.

With `client_cleanup: true` in the constructor's configuration object, a changed client ID deletes the whole `convivial_profiler` object, including other site entries. It does not clear separately published keys or cookies.

If browser local storage is unavailable, construction stops before plugin registration and `collect()` returns without running pipelines. Collection requires local storage even when a destination only uses cookies or analytics events.

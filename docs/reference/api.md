# JavaScript API

## Constructor

The tracked UMD bundle exposes the constructor as `window.ConvivialProfiler.default`.

```javascript
window.convivialProfiler = new window.ConvivialProfiler.default(
  config,
  siteId,
  licenseKey,
  clientId,
  cookieconsent
);
```

| Argument | Description |
| --- | --- |
| `config` | Configuration containing `profilers` and optional `client_cleanup` |
| `siteId` | Stable key for this site's internal storage |
| `licenseKey` | Licence value stored in the browser; the demo uses `community` |
| `clientId` | Optional caller-supplied client identifier; a falsy value invokes the cookie helper |
| `cookieconsent` | Optional default for client-ID cookie creation; defaults to `true` |

The built-in plugins call methods on `window.convivialProfiler`. Assign the instance there before collection. Multiple concurrent instances are not isolated: their plugins use whichever instance occupies the global.

The constructor loads saved state and resets `temp`. It does not collect automatically. If local storage is unavailable, it returns early without registering plugins. See [Consent and data handling](../concepts-and-tools/consent-and-data.md) for the cookie argument's limited scope.

## `collect()`

Runs the configured pipelines and removes expired `store` entries at the end. It returns `undefined`; it is not a promise and does not wait for HTTP sources. See [Data pipelines](../concepts-and-tools/data-pipelines.md) before calling it repeatedly.

## Plugin registries

An initialised instance exposes `profilerSource`, `profilerProcessor`, and `profilerDestination`. Registry keys match each plugin definition's `type`.

All plugins receive three arguments:

```javascript
function plugin(profiler, options, values) {
  // profiler: this pipeline's configuration, not the instance.
  // options: this source, processor, or destination definition.
  // values: the pipeline's shared array of source inputs.
}
```

Register a custom plugin after constructing the instance and before collection. For example:

```javascript
window.convivialProfiler.profilerSource.page_category = function (
  profiler,
  source,
  values
) {
  const category = document.body.dataset.category;
  if (category) {
    values.push(category);
  }
};
```

Use `{ "type": "page_category" }` in a source definition. For a plugin shipped as part of this library, add its implementation under `src/modules/`, register it in `src/index.js`, update this guide, and rebuild `dist/bundle.js`.

## Internal helpers

Methods beginning with `_` are implementation helpers, not a separately versioned public API. Existing plugins use these methods:

| Helper | Purpose |
| --- | --- |
| `_getValue(path, source)` | Read a path from internal state, or an explicitly supplied object |
| `_getConfig(path)` | Read a configuration path |
| `_setValue(type, key, value)` | Set an internal namespace entry and save |
| `_deleteValue(type, key)` | Delete an internal namespace entry and save |
| `_increaseValue(type, key, increment)` | Increase a numeric entry and save |
| `_increaseSubValue(type, key, subKey, increment)` | Increase a category score and save |
| `_logValue(type, value, size, unique)` | Record a value's timestamp; the `unique` argument is currently unused |
| `_processValues(profiler, values)` | Run a pipeline's processors |
| `_loadStorage()` / `_saveStorage()` | Load or persist the site's internal state |

Prefer reading published values in site integration code. `_getValue()` returns raw stored data and does not enforce expiry.

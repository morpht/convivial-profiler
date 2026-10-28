# Troubleshooting

Start with the [documentation example](../getting-started/installation.md). If it works, compare your configuration, input values, and collection timing with that example.

## Inspect the pipeline

1. Inspect the source input: the full query string, metadata, cookie, or endpoint response.
2. Confirm `window.convivialProfiler` is the instance you created and the relevant plugin is registered.
3. Inspect `window.convivialProfiler.storage` for the expected internal path.
4. Inspect the destination's published local-storage key, cookie, or `window.dataLayer` entry.
5. Inspect the site's consumer code if the published result is correct but the displayed content is wrong.

Use the console's debug level to see messages about unknown plugin types and failed HTTP requests. Avoid calling `collect()` repeatedly just to inspect state: it can change scores, counters, and listeners.

## Common symptoms

| Symptom | Check |
| --- | --- |
| Constructor is not a function | The UMD constructor is `window.ConvivialProfiler.default`; load the bundle first |
| Plugins cannot access storage helpers | Assign the instance to `window.convivialProfiler` before collection |
| Nothing collects, even with cookie destinations | Local storage must be available |
| A `forEach` error during collection | Every pipeline needs `sources`, `processors`, and `destinations` arrays |
| A disabled pipeline still runs | Filter it out before construction; `status` is metadata |
| A consumer sees yesterday's value | Producers must precede consumers; `weight` is not used for sorting |
| A stored value exists but nothing is published | Check the full internal path and exact `target_location` strings |
| `bestpick` cannot find a value | It reads top-level local-storage keys, not internal paths or cookies |
| Published data is `[object Object]` | Set `stringify: true` on a `copy` destination for object data |
| A query parameter throws an error | Supply `=value` and valid percent encoding; bare parameters are unsupported |
| A numeric zero is not published | Many destinations test truthiness; numeric zero is treated as missing |
| Old values survive their TTL | Cleanup follows destinations, and published keys have no automatic expiry |
| Fetched data does not appear immediately | `get` reruns processors only; destinations are not rerun on response |
| A deferred pipeline never publishes | A cache hit skips the whole pipeline; use a separate consumer |
| A language value disappears internally | Language processors currently expire positive TTLs immediately |
| Search logging throws a `.find` error | The search processor expects an array while the logger stores an object |
| Counts or analytics events are duplicated | Check repeated collection and repeated form-tracker attachment |
| A form field is not filled | Collect after the form exists; use a selector suffix and an `input` element |
| Data remains after setting cookie consent to false | That argument only affects client-ID cookie creation; it is not a collection switch |

See the [processor reference](../reference/processors.md) and [destination reference](../reference/destinations.md) for the affected options and limitations.

## Invalid stored JSON

The library parses `convivial_profiler` as JSON without recovering from invalid content. On a development origin, inspect the key and remove it if it is corrupt, after stopping the current instance. Reload to create a fresh instance. This resets all site IDs within that internal key; it does not reset published values.

## Check the repository

For runtime changes, use the repository's Cypress suite while `npm start` is running. Initialise `cypress.env.json` from `cypress.env.default.json` only if it does not already exist, preserving local overrides. `npm test` is currently a placeholder and does not run browser tests.

```sh
npx cypress run
```

When reporting a problem, include the configuration, reproduction steps, browser version, expected result, and relevant console error. Replace private inputs and identifiers with synthetic values before sharing them.

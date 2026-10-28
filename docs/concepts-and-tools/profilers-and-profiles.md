# Profilers and profiles

A **profiler** is one configured data pipeline. A **profile** is the collection of facts and preferences produced for a visitor. A configuration usually contains several profilers contributing to the same profile.

For example, one profiler records an explicit audience choice from a URL. Another scores audiences from page metadata. A final profiler selects which signal takes priority.

| Concept | Meaning | Example |
| --- | --- | --- |
| Source | Reads an input and appends it to a list of values | Read `?audience=students` |
| Processor | Uses those values to update internal state | Store `students` for five minutes |
| Destination | Publishes a result or performs an action | Write `audience=students` to local storage |
| Profiler | One entry in `config.profilers` | `audience_param` |
| Profile | The combined information available about a visitor | Audience, topic, language, page-view count |
| Dimension | Scores grouped by category | `students: 3`, `teachers: 1` |
| Accumulator | A running numeric total | Sum of values collected from page metadata |
| Counter | A count of actions | Number of page views |
| Published value | A result exposed for other code to read | The local-storage key `audience` |

## Profile structure

There is no separate `Profile` class or `profiles` configuration property. The instance's `storage` holds internal state for the current site. Destination plugins expose selected results separately.

The internal dimension `dimensions.audience` might hold several scores, while the published key `audience_top` contains only the category with the highest score. A `bestpick` destination can then choose between `audience_top` and an explicit `audience_param` choice to publish the final `audience` value.

Keep these names distinct:

* A profiler name identifies the pipeline, such as `audience_meta`.
* A processor's `storage_key` identifies its internal entry, such as `audience` within `dimensions`.
* A destination's `storage_key` usually identifies a full internal path, such as `store.audience_param.value`.
* A destination's `target_key` identifies the published browser-storage key, such as `audience_param`.

The [storage guide](storage-and-expiry.md) explains these paths. The [audience example](../usage/audience.md) shows how to connect them.

## Using a profile

Your site can read a published value with `localStorage.getItem('audience')` and use it in its content-selection code. Cookie destinations make values available in subsequent requests to the same cookie scope. Analytics destinations pass events to `window.dataLayer` for any configured consumer to handle.

These values are visitor-controlled browser data. They describe personalisation preferences; they are not proof of identity or permission.

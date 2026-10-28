# Combining audience signals

Use several profilers when an explicit visitor choice should take priority over an inferred preference. This example collects an audience from the URL, scores page metadata, then publishes the final audience.

## Add page metadata

Place this tag in the page head before collection:

```html
<meta name="audience" content="teachers">
```

The value is a stable category identifier. The labels shown to visitors can be different.

## Configure producers and selection

Use the following as the constructor's configuration object. Keep the three pipelines in this order.

```json
{
  "profilers": {
    "audience_param": {
      "sources": [{ "type": "query", "param": "audience" }],
      "processors": [{ "type": "store", "storage_key": "audience_param", "ttl": 300 }],
      "destinations": [
        {
          "type": "copy",
          "storage_key": "store.audience_param.value",
          "target_key": "audience_param",
          "target_location": { "localstorage": "localstorage" },
          "remove_empty": true
        }
      ]
    },
    "audience_meta": {
      "sources": [{ "type": "meta", "attribute_name": "audience" }],
      "processors": [{ "type": "dimension", "storage_key": "audience", "normalize": true }],
      "destinations": [
        {
          "type": "top",
          "dimension_key": "dimensions.audience",
          "target_key": "audience_top",
          "target_location": { "localstorage": "localstorage" },
          "remove_empty": true
        }
      ]
    },
    "audience": {
      "sources": [],
      "processors": [],
      "destinations": [
        {
          "type": "bestpick",
          "storage_keys": ["audience_param", "audience_top"],
          "default_value": "general",
          "target_key": "audience",
          "target_location": { "localstorage": "localstorage" },
          "remove_empty": true
        }
      ]
    }
  }
}
```

## Verify the result

Use a clean test origin or clear only this example's storage before each independent case.

| Page inputs | Published `audience` | Why |
| --- | --- | --- |
| `?audience=students` and the `teachers` meta tag | `students` | The explicit query value comes first in `bestpick` |
| No audience query and the `teachers` meta tag | `teachers` | The inferred top category is available |
| No query and no audience metadata | `general` | Neither producer has a value |

Inspect `localStorage.getItem('audience')` after collection. A site can use that value to choose an appropriate block of content. Use an approved list of category identifiers when accepting URL values, and insert display text with safe DOM APIs such as `textContent`.

The query choice remains stored until expiry and cleanup. Removing the query from the URL does not immediately discard the previous choice. See [Storage and expiry](../concepts-and-tools/storage-and-expiry.md) when testing transitions.

## Extend the approach

To add a temporary override, use `query` → `temp` → `copy`, and put the resulting published key first in `bestpick.storage_keys`. Set `remove_empty: true` on that `copy` destination so it clears the old published override when a new instance has no input.

To use a supplied audience cookie, add a `cookie` → `store` → `copy` pipeline before selection. To publish several likely audiences, use `tops` with JSON serialisation instead of `top`. Each source should publish its own key so precedence remains explicit.

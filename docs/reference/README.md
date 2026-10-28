# Plugin reference

The available plugins and JavaScript interfaces, with their configuration options, examples, and current limitations:

- [Sources](sources.md) — the seven plugins that collect inputs from the browser, page, or an HTTP endpoint.
- [Processors](processors.md) — the twelve plugins that store values, score dimensions, and record activity.
- [Destinations](destinations.md) — the fifteen plugins that publish values, fill forms, or create analytics events.
- [JavaScript API](api.md) — construct the profiler, run collection, and register custom plugins.

Plugin identifiers must match the `type` value in your configuration. Read [Data pipelines](../concepts-and-tools/data-pipelines.md) to understand the order in which plugins run and how they share values.

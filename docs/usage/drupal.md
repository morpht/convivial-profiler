# Drupal integration

The JavaScript library can run on any website. In Drupal, an integration supplies the asset, settings, page metadata, and initialisation. These responsibilities are separate from the profiler's collection pipeline.

The repository's demo uses a `drupalSettings.convivialProfiler` object to illustrate that integration. It is a JavaScript fixture; it does not require a running Drupal site.

## Settings shape

An integration can provide this structure through Drupal's settings attachment mechanism:

```javascript
drupalSettings.convivialProfiler = {
  site: 'example-site',
  license_key: 'community',
  config: {
    client_cleanup: false,
    profilers: {
      pageviews: {
        sources: [],
        processors: [
          { type: 'pageview', storage_key: 'pageview', track: true }
        ],
        destinations: []
      }
    }
  }
};
```

The demo initialiser passes `settings.config`, `settings.site`, and `settings.license_key` to the constructor. Put `client_cleanup` inside `config` if the constructor should read it; a sibling field outside `config` is not passed through by that initialiser.

## Initialisation

After the library and settings have loaded, and once your collection policy permits:

```javascript
const settings = drupalSettings.convivialProfiler;
window.convivialProfiler = new window.ConvivialProfiler.default(
  settings.config,
  settings.site,
  settings.license_key
);
window.convivialProfiler.collect();
```

In a Drupal integration, attach this through the site's asset and behaviour system. Ensure initialisation runs once as intended. Repeated behaviour attachment after AJAX requests can otherwise duplicate collection, counters, analytics events, and form listeners.

Do not copy the demo fixture's assignment `window.drupalSettings = {}` into a Drupal site: the site already has settings used by other libraries.

## Integration responsibilities

* Supply sources and options that match the metadata, cookies, forms, and endpoints available on the site.
* Filter disabled pipelines and order producers before consumers; `status` and `weight` are not enforced by the library.
* Apply consent decisions before construction and collection.
* Read published values in the site's personalisation or content-selection layer.

This guide does not prescribe an administration route or configuration entity for a particular Drupal module. Use your integration's documentation for its authoring interface. For the browser configuration itself, see [Configuration](../configuration/profilers.md).

# Installation and first collection

Run the documentation example, then inspect the value it publishes. This example uses a query parameter to choose a topic. It does not require Drupal or a remote data service.

## Run the example

You need Node.js 20.9.0 or later and npm 10.1.0 or later.

```sh
git clone https://github.com/morpht/convivial-profiler.git
cd convivial-profiler
git switch 1.x
npm ci
npm start
```

For an existing checkout, start with `git switch 1.x`. The branch must be available in that checkout; a local branch is not available to other clones until it has been published.

Open `http://localhost:8080/documentation.html?topic=gardening`. The page displays `gardening` as the selected topic. The development server serves the example files and builds the library bundle in memory.

Open the browser developer tools and inspect **Application → Local Storage** (called **Storage** in some browsers). You should see:

| Key | Expected value |
| --- | --- |
| `docs_topic` | `gardening` |
| `convivial_profiler` | A JSON object containing the site `documentation-demo` |

Inside that site, `store.topic_param.value` should be `gardening`, with an `expire` timestamp about five minutes in the future.

## Understand the configuration

The example uses this complete configuration object:

```javascript
const config = {
  profilers: {
    topic_param: {
      sources: [{ type: 'query', param: 'topic' }],
      processors: [
        { type: 'store', storage_key: 'topic_param', ttl: 300 }
      ],
      destinations: [
        {
          type: 'copy',
          storage_key: 'store.topic_param.value',
          target_key: 'docs_topic',
          target_location: { localstorage: 'localstorage' },
          remove_empty: true
        }
      ]
    }
  }
};
```

The `query` source collects `gardening`. The `store` processor saves it for 300 seconds. The `copy` destination publishes it under `docs_topic` so the site can read it without interpreting the internal storage structure.

## Load the library on your site

Run `npm run build` to produce `dist/bundle.js`, then serve that file from your site. Load it before your configuration and initialisation scripts. Run collection after any metadata or forms it needs are available.

```html
<script src="/dist/bundle.js"></script>
<script src="/profiler-config.js"></script>
<script src="/profiler-init.js"></script>
```

Place the configuration above in `profiler-config.js`. In `profiler-init.js`, create the instance and collect:

```javascript
window.convivialProfiler = new window.ConvivialProfiler.default(
  config,
  'documentation-demo',
  'community'
);
window.convivialProfiler.collect();

const topic = localStorage.getItem('docs_topic');
```

The example uses the repository's `community` licence value; choose the appropriate licence for your deployment. Assign the instance to `window.convivialProfiler`: the built-in plugins use that global to access storage.

On a real site, run this initialisation only when your site's collection policy permits it. See [Consent and data handling](../concepts-and-tools/consent-and-data.md).

## Try another value

Visit `http://localhost:8080/documentation.html?topic=walking`. Both values now show `walking`. The same storage key is overwritten, and its lifetime starts again.

Visiting without a query parameter does not immediately clear a saved value. Learn why in [Storage and expiry](../concepts-and-tools/storage-and-expiry.md), then try [Combining audience signals](../usage/audience.md).

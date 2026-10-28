# Convivial Personalisation

[![Continuous Integration](https://github.com/morpht/convivial-profiler/actions/workflows/main.yml/badge.svg)](https://github.com/morpht/convivial-profiler/actions/workflows/main.yml)

A browser JavaScript library for personalisation and visitor data collection. Sources collect inputs, processors update visitor state, and destinations publish values for a site's personalisation code.

## Documentation

The library and guide live together on branch `1.x`. Start with the [guide](docs/README.md), [getting started](docs/getting-started/installation.md), or [configuration](docs/configuration/profilers.md).

* [Profilers and profiles](docs/concepts-and-tools/profilers-and-profiles.md)
* [Data pipelines](docs/concepts-and-tools/data-pipelines.md)
* [Storage and expiry](docs/concepts-and-tools/storage-and-expiry.md)
* [Sources](docs/reference/sources.md), [processors](docs/reference/processors.md), and [destinations](docs/reference/destinations.md)
* [JavaScript API](docs/reference/api.md)
* [Combining audience signals](docs/usage/audience.md)
* [Drupal integration](docs/usage/drupal.md)
* [Consent and data handling](docs/concepts-and-tools/consent-and-data.md)
* [Troubleshooting](docs/support/troubleshooting.md)

The intended public guide is [Convivial Personalisation](https://docs.morpht.com/convivial-personalisation). GitBook renders the `docs/` Markdown through Git Sync; `.gitbook.yaml` selects the content root and `docs/SUMMARY.md` defines navigation. See [Maintaining and publishing](docs/support/maintaining.md) for the required GitBook connection and live-site checks.

## Local development

Use Node.js >=20.9.0 and npm >=10.1.0.

```sh
git clone https://github.com/morpht/convivial-profiler.git
cd convivial-profiler
git switch 1.x
npm ci
npm start
```

Open `http://localhost:8080/` for the existing demo, or `http://localhost:8080/documentation.html?topic=gardening` for the documentation example. A new clone needs `1.x` to be available remotely.

```sh
npm run build
```

The build updates the tracked `dist/bundle.js`; rebuild when changing library code.

## Browser tests

Keep `npm start` running. If `cypress.env.json` does not exist, copy `cypress.env.default.json` to it, preserving any existing local overrides. Then run:

```sh
npx cypress run
```

`npm test` is currently a placeholder and does not execute the suite.

## Copyright and licence

Copyright, Morpht Pty Ltd, 2020–2026.

The library is available for community use and can be licensed for commercial projects. See the [Convivial Personalisation pricing page](https://www.morpht.com/convivial-profiler-pricing) for licensing and pricing information.

# Introduction

*Version 0.1.43 · October 2026*

This guide explains how to configure and use Convivial Personalisation, a browser JavaScript library that collects visitor signals for personalisation. It is for site builders and developers with basic HTML and JavaScript knowledge. Drupal is optional.

The guide is organised in six sections:

- [Getting started](getting-started/README.md) — run the library and inspect a working example.
- [Concepts and tools](concepts-and-tools/README.md) — profilers, profiles, data pipelines, storage, and consent.
- [Configuration](configuration/README.md) — define pipelines, choose destination locations, and configure deferred collection.
- [Plugin reference](reference/README.md) — every source, processor, destination, and the JavaScript API.
- [Usage](usage/README.md) — combine audience signals and integrate the library with Drupal.
- [Support](support/README.md) — troubleshoot collection and maintain the documentation.

Conventions used in this guide:

- Plugin identifiers, configuration fields, and storage keys are written as `code`.
- Interface labels are written in **bold**.
- Internal storage paths use dots, for example `store.topic_param.value`.
- Examples use synthetic data and describe the result you should observe.
- URLs beginning with `/` are relative to the site running the library.

## Library information

Convivial Personalisation reads browser and page signals, processes them into visitor state, and publishes values to browser storage, cookies, forms, or `window.dataLayer`. Your site's integration reads the results and chooses the content to display. Read [Consent and data handling](concepts-and-tools/consent-and-data.md) before enabling collection on a real site.

The library and this guide live together in `convivial-profiler`, on branch `1.x`. The version above identifies the documented library version; the branch name does not change the package version. Follow [Getting started](getting-started/installation.md) to run the local example at `http://localhost:8080/documentation.html?topic=gardening`.

## Documentation site

The intended published address is [Convivial Personalisation](https://docs.morpht.com/convivial-personalisation). The source layout and GitBook Git Sync configuration follow the [Convivial for GovCMS guide](https://docs.morpht.com/convivial-for-govcms). See [Maintaining and publishing](support/maintaining.md) for setup and verification.

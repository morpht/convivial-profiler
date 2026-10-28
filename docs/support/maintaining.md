# Maintaining and publishing this guide

The library and its documentation live in `morpht/convivial-profiler`, on branch `1.x`. Edit the Markdown files in `docs/` alongside library changes. Keep `README.md` at the repository root as the developer entry point.

## Publishing model

This repository follows the existing Convivial for GovCMS guide's GitBook Git Sync approach. GitBook reads `.gitbook.yaml`, uses `docs/README.md` as the introduction and `docs/SUMMARY.md` for navigation, then renders and hosts the site. Generated HTML is not committed.

The YAML file selects the content directory. It does not connect an account, choose the remote branch, or configure the published URL. Those settings belong to the GitBook integration.

## Source structure

The guide uses the same layout as the source of [Convivial for GovCMS](https://docs.morpht.com/convivial-for-govcms):

```text
.gitbook.yaml
docs/
  README.md
  SUMMARY.md
  assets/
    diagrams/
      data-pipeline.puml
      data-pipeline.svg
      http-source-flow.puml
      http-source-flow.svg
  getting-started/
    README.md
    installation.md
  concepts-and-tools/
    README.md
    profilers-and-profiles.md
    data-pipelines.md
    storage-and-expiry.md
    consent-and-data.md
  configuration/
    README.md
    profilers.md
  reference/
    README.md
    sources.md
    processors.md
    destinations.md
    api.md
  usage/
    README.md
    audience.md
    drupal.md
  support/
    README.md
    troubleshooting.md
    maintaining.md
```

`docs/README.md` introduces the guide, records the documented version, and links to its sections. Each section has a `README.md` landing page that links to its chapters. `docs/SUMMARY.md` repeats that hierarchy for the GitBook sidebar, with a blank line between sections.

The repository-root `.gitbook.yaml` contains `root: ./docs/`, matching the GovCMS configuration. GitBook uses the default `README.md` and `SUMMARY.md` filenames within that directory.

## Connect GitBook

A maintainer with repository and GitBook access completes this setup after the documentation has been reviewed and the branch is available remotely:

1. Open or create the **Convivial Personalisation** space in the existing documentation site.
2. Enable GitHub Git Sync for `morpht/convivial-profiler`, branch `1.x`. Use the repository root as the project directory so GitBook can read `.gitbook.yaml` and its `root: ./docs/` setting.
3. For the initial import, choose the repository as the source so the Markdown files populate the space. Avoid exporting an empty space over the repository.
4. Add the space to the documentation site's structure with the path `convivial-personalisation`, under the existing `docs.morpht.com` domain.
5. In the site customization panel, inherit the same theme and layout as Convivial for GovCMS. Check section overrides for the logo, colours, search, page actions, page outline, and light/system/dark theme controls. Keep the native GitBook branding.
6. Review the GitBook preview, then publish the reviewed content through the site's normal release process.

For current platform details, see [GitBook content configuration](https://gitbook.com/docs/docs-as-code/git-sync/content-configuration) and the GitBook account's integration settings. Preserve existing space keys if editing an already connected site's structure.

## Review documentation changes

Check that `docs/SUMMARY.md` lists every guide page, relative links and heading links resolve, code fences use the correct language, and the plugin reference covers the registered plugins. Review the content in GitBook's preview before publication.

For changes to the introductory example, start `npm start` and visit `http://localhost:8080/documentation.html?topic=gardening`. Confirm that the page shows `gardening` and the `docs_topic` key has that value.

Review the header search, Copy dropdown, page outline, code-copy controls, image zoom, previous and next links, and light/system/dark themes against [Convivial for GovCMS](https://docs.morpht.com/convivial-for-govcms). Check desktop and mobile layouts. GitBook supplies these controls through its site configuration; see [GitBook site customization](https://gitbook.com/docs/manage-your-site/customization).

## Verify the published site

After a successful sync and publication:

1. Visit [Convivial Personalisation](https://docs.morpht.com/convivial-personalisation) and confirm the introduction loads without a 404.
2. Compare the sidebar with `docs/SUMMARY.md`; open every chapter, including the nested concept and reference pages.
3. Check that tables, code blocks, and the pipeline diagram are readable on desktop and a narrow screen.
4. Follow a cross-page link and a section link, and search for `bestpick` and `deferred`.
5. Compare the header, search, Copy menu, breadcrumbs, page outline, code-copy controls, image zoom, previous/next cards, last-updated date, GitBook branding, and light/system/dark controls with Convivial for GovCMS on desktop and mobile.
6. Check the published Markdown view, ChatGPT/Claude links, and MCP connection instructions use this guide's public URL and endpoint.
7. Confirm a recent reviewed wording change appears on the published site, proving it has synced from the intended branch.

Verify the published site after reviewing the Markdown source. A missing page can indicate an unconnected space, an unpublished branch, a failed sync, or a site path that has not been configured.

## Diagram sources

The flow diagrams use [PlantUML](https://editor.plantuml.com/). Keep the editable source and exported SVG together in `docs/assets/diagrams/`:

| Diagram | Editable source | Published image |
| --- | --- | --- |
| Collection pipeline | [data-pipeline.puml](../assets/diagrams/data-pipeline.puml) | [data-pipeline.svg](../assets/diagrams/data-pipeline.svg) |
| Asynchronous HTTP flow | [http-source-flow.puml](../assets/diagrams/http-source-flow.puml) | [http-source-flow.svg](../assets/diagrams/http-source-flow.svg) |

To update a diagram, paste its `.puml` source into the PlantUML editor, make the change, and save the source back to the repository. Export the rendered SVG to the matching image filename. Review the result in the guide and include both files with the documentation change.

Pages embed the repository's SVG images with ordinary Markdown image syntax. The published guide does not need to contact PlantUML to display them. Keep descriptive alternative text and the surrounding prose so the flow is also explained without the image.

## Writing and maintenance

Follow [Drupal's good documentation guidance](https://www.drupal.org/docs/user_guide_guidelines/good-writing.html): write for the reader's task, use concrete examples, and explain what they should observe after each action. Keep essential explanations in text as well as diagrams.

Add each new chapter to its section's `README.md` and to `docs/SUMMARY.md`. Keep links relative to the page containing them. When adding a section, give it its own directory and `README.md`, then link it from the guide introduction. Update the introduction's version line when documenting a new library release.

Update plugin options and known limitations whenever implementation changes. Use synthetic example data, and keep existing source identifiers unchanged in the reference.

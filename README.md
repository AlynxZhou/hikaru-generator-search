Hikaru Generator Search
=======================

Search generator plugin for Hikaru.
-----------------------------------

# Usage

First go to your site dir and add following to your `site-config.yaml`.

```yaml
search:
  enable: true
  # Use array to split contents.
  path:
    - search/1.json
    - search/2.json
  page: search/index.html
```

then run this command to install it.

```
$ npm i -s hikaru-generator-search
```
If you want to skip some posts while generating search index, add `search: false` to its front-matter.

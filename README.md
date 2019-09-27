Hikaru Generator Search
=======================

Search generator plugin for Hikaru.
-----------------------------------

# Usage

First go to your site dir and add following to your `config.yml`.

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

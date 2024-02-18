const generateSearch = (hikaru) => {
  if (!hikaru.site["siteConfig"]["search"]["enable"]) {
    return;
  }
  const {isString, removeHTMLTags} = hikaru.utils;
  const {File} = hikaru.types;
  hikaru.generator.register("searching result page", (site) => {
    return new File({
      "layout": "search",
      "docDir": site["siteConfig"]["docDir"],
      "docPath": site["siteConfig"]["search"]["page"] || "search/index.html",
      "title": "search",
      "comment": false,
      "reward": false
    });
  });
  // Directly generating JSON strings as contents is OK, I write custom
  // decorator just because I could do it in this way.
  hikaru.decorator.register("search-json", (ctx) => {
    const {file, getPath, __} = ctx;
    const search = {"data": []};
    for (const f of file["files"]) {
      // Prefer to remove tags from HTML content.
      search["data"].push({
        "title": __(f["title"]),
        "url": getPath(f["docPath"]),
        "content": removeHTMLTags(f["content"])
      });
    }
    return JSON.stringify(search);
  });
  hikaru.generator.register("searching index json", (site) => {
    let path = site["siteConfig"]["search"]["path"];
    if (isString(path)) {
      path = [path];
    }
    // We search all user created contents excluding assets and generated files.
    const all = site["pages"].concat(site["posts"]).filter((p) => {
      return p["search"] !== false;
    });
    const length = Math.round(all.length / path.length);
    const results = [];
    for (let i = 0; i < path.length; ++i) {
      const current = all.slice(i * length, (i + 1) * length);
      results.push(new File({
        "docDir": site["siteConfig"]["docDir"],
        "docPath": path[i] || "search/1.json",
        "layout": "search-json",
        "files": current
      }));
    }
    return results;
  });
};

export default generateSearch;

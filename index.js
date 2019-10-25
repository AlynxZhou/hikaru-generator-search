module.exports = (hikaru) => {
  const {getPathFn, isString} = hikaru.utils
  const {File} = hikaru.types
  hikaru.generator.register('searching result page', (site) => {
    if (!site['siteConfig']['search']['enable']) {
      return
    }
    return new File({
      'docDir': site['siteConfig']['docDir'],
      'docPath': site['siteConfig']['search']['page'] || 'search/index.html',
      'title': 'search',
      'layout': 'search',
    })
  })
  hikaru.generator.register('searching index json', (site) => {
    if (!site['siteConfig']['search']['enable']) {
      return
    }
    const getPath = getPathFn(site['siteConfig']['rootDir'])
    let path = site['siteConfig']['search']['path']
    if (isString(path)) {
      path = [path]
    }
    const all = site['pages'].concat(site['posts'])
    const length = Math.round(all.length / path.length)
    const result = []
    for (let i = 0; i < path.length; ++i) {
      const search = {'data': []}
      const current = all.slice(i * length, (i + 1) * length)
      for (let p of current) {
        const lang = p['language'] || site['siteConfig']['language']
        const __ = hikaru.translator.getTranslateFn(lang)
        // Prefer to remove tags from HTML content.
        search['data'].push({
          'title': __(p['title']),
          'url': getPath(p['docPath']),
          'content': p['content'].replace(/<\/?[^>]+>/gi, '')
        })
      }
      result.push(new File({
        'docDir': site['siteConfig']['docDir'],
        'docPath': path[i] || 'search/1.json',
        'content': JSON.stringify(search)
      }))
    }
    return result
  })
}

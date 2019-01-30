module.exports = (hikaru) => {
	const {getPathFn} = hikaru.utils
	const {File} = hikaru.types
	hikaru.generator.register('afterProcessing', (site) => {
		if (!site['siteConfig']['search']['enable']) {
			return site
		}
		const search = []
		const all = site['pages'].concat(site['posts'])
		const getPath = getPathFn(site['siteConfig']['rootDir'])
		for (let p of all) {
			search.push({
				'title': `${p['title']}`,
				'url': getPath(p['docPath']),
				'content': p['text']
			})
		}
		const file = new File(site['siteConfig']['docDir'])
    file['docPath'] = site['siteConfig']['search']['path'] || 'search.json'
    file['content'] = JSON.stringify(search)
    site.put('files', file)
    return site
	})
}

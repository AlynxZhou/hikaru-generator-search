module.exports = (hikaru) => {
	const {getPathFn} = hikaru.utils
	const {File} = hikaru.types
	hikaru.generator.register('afterProcessing', (site) => {
		if (!site.get('siteConfig')['search']['enable']) {
			return site
		}
		const search = []
		const all = site.get('pages').concat(site.get('posts'))
		const getPath = getPathFn(site.get('siteConfig')['rootDir'])
		for (let p of all) {
			search.push({
				'title': `${p['title']}`,
				'url': getPath(p['docPath']),
				'content': p['text']
			})
		}
		const file = new File(site.get('docDir'))
    file['docPath'] = site.get('siteConfig')['search']['path'] || 'search.json'
    file['content'] = JSON.stringify(search)
    site.put('files', file)
    return site
	})
}

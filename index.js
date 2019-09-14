module.exports = (hikaru) => {
	const {getPathFn} = hikaru.utils
	const {File} = hikaru.types
	hikaru.generator.register("searching result page", (site) => {
		if (!site['siteConfig']['search']['enable']) {
			return
		}
		return new File({
			'docDir': site['siteConfig']['docDir'],
			'docPath': site['siteConfig']['search']['page'] || 'search.html',
			'title': 'search',
			'layout': 'search'
		})
	})
	hikaru.generator.register('searching index json', (site) => {
		if (!site['siteConfig']['search']['enable']) {
			return
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
		return new File({
			'docDir': site['siteConfig']['docDir'],
			'docPath': site['siteConfig']['search']['path'] || 'search.json',
			'content': JSON.stringify(search)
		})
	})
}

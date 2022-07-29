module.exports = {
  isset: (data) => (data !== '' && typeof data !== 'undefined' && data !== undefined && data != null),

  randString(length = 6) {
		const result = [];
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;

		for (let i = 0; i < length; i += 1) {
			result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
		}

		return result.join('');
	},

	search: (pattern) => {
		let search_key = pattern;
		// eslint-disable-next-line no-useless-escape
		search_key = search_key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

		return { $regex: `${search_key}`, $options: 'i' };
	},

	isURL: (str) => {
		const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
		+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
		+ '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
		+ '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
		+ '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
		+ '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
		return !!pattern.test(str);
	},
};

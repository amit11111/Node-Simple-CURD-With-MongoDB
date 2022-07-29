module.exports = {
	isEmpty: (obj) => (Object.keys(obj).length === 0 && obj.constructor === Object),
	isArray: (a) => ((!!a) && (a.constructor === Array)),
	isObject: (a) => ((!!a) && (a.constructor === Object)),
	searchArrayObject: (nameKey, value, myArray) => myArray.find((o) => o[nameKey] === value),
	// eslint-disable-next-line max-len
	searchArrayIndex: (myArray, key, value) => myArray.findIndex((p) => p[key] === value),
};

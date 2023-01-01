export const projectFactory = (name) => {
	const hash = (s) => {
		s = s.toString();
	 	let hash = 0;
		if (s.length == 0) return hash;
		for (let i = 0; i < s.length; i++) {
			let ch = s.charCodeAt(i);
			hash = ((hash >> 4) + hash) + ch;
			hash = hash & hash;
		}
	 	return hash;
	}

	const date = (new Date().valueOf());

	return {
		name,
		id: hash(`${name}${date}`),
		tasks: []
	}
}
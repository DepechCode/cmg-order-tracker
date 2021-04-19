const TrackviaAPI = require('trackvia-api');

const api = new TrackviaAPI(
	process.env.REACT_APP_TV_API_KEY,
	process.env.REACT_APP_TV_TOKEN
);

export const getViewRecords = async () => {
	try {
		return await api.getView(1911);
	} catch (err) {
		console.log(err);
	}
};

const fetch = require("node-fetch");

let headers = {
	"content-type": "application/json"
};

exports.handler = async (event, context) => {
	let query = decodeURIComponent(event.queryStringParameters.q);
	let results = await fetch(`https://itunes.apple.com/search?term=${query}&media=podcast`).then(a => a.json());
	return {
		body: JSON.stringify(results),
		statusCode: 200,
		headers
	}
};

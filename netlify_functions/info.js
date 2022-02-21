let {parse} = require('rss-to-json');
let sanitizeHtml = require("sanitize-html");
// disallow all html
let sanitize_options = {
  allowedTags: [], 
  allowedAttributes: []
};
exports.handler = async (event, context) => {
  let rssurl = decodeURIComponent(event.queryStringParameters.url);
  let json_feed = await parse(rssurl);
  let showdata = {
    image: encodeURI(json_feed.image),
    description: sanitizeHtml(json_feed.description, sanitize_options),
    title: sanitizeHtml(json_feed.title, sanitize_options)
  };
  showdata = JSON.stringify(showdata);
  return {
    headers: {
	"content-type": "application/json",
	"access-control-allow-origin": "*"
    },
    statusCode: 200,
    body: showdata
  };
};

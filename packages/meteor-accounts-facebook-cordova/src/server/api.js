/**
 * https://github.com/meteor/meteor/blob/devel/packages/facebook/facebook_server.js#L88
 */
var getIdentity = function (accessToken) {
  	try {
    	return HTTP.get("https://graph.facebook.com/v2.2/me", {
      		params: {
				access_token: accessToken, 
				fields:CFB.getProfileFields().join()}
			}).data;
  	} catch (err) {
    	throw _.extend(new Error("Failed to fetch identity from Facebook. " + err.message),
                   {response: err.response});
  	}
};

var getProfilePicture = function (accessToken) {
    try {
        return HTTP.get("https://graph.facebook.com/v2.0/me/picture/?redirect=false", {
        params: {access_token: accessToken}}).data.data.url;
    } catch (err) {
        throw _.extend(new Error("Failed to fetch identity from Facebook. " + err.message),
                   {response: err.response});
    }
};

CFB.getIdentity = getIdentity;
CFB.getProfilePicture = getProfilePicture;
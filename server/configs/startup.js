export default function () {
	//enable CORS
	WebApp.rawConnectHandlers.use(function(req, res, next) {
	    res.setHeader("Access-Control-Allow-Origin", "*");
	    return next();
	});

	//configure raix push - server side
	Push.Configure(Meteor.settings.server.push_notification);
	
	Push.allow({
		send: function(userId, notification) {
		  // Change to true or add logical checking 
		  // to enable client side code to send push notification
		  // This might be dangerous because it will
		  // enable user to send push notification from browser console
		  return false;
		}
	});
}
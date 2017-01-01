//configureFacebook = function(config) {
    //// first, remove configuration entry in case service is already configured
    //ServiceConfiguration.configurations.remove({
        //service: "facebook"
    //});

   //ServiceConfiguration.configurations.insert({
        //service: "facebook",
        //appId: config.clientId,
        //secret: config.secret
    //});
//};

export default function () {
	WebApp.rawConnectHandlers.use(function(req, res, next) {
	  res.setHeader("Access-Control-Allow-Origin", "*");
	  return next();
	});

	//var facebookConfig = Meteor.settings.facebook;
	//if(facebookConfig) {
	//configureFacebook(facebookConfig);
	//}

	Push.Configure(Meteor.settings.server.push_notification);
	
	//TODO: change who can send notification
	Push.allow({
		send: function(userId, notification) {
		  // Allow all users to send to everybody - For test only!
		  return true;
		}
	});
}
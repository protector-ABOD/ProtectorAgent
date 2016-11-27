configureFacebook = function(config) {
    // first, remove configuration entry in case service is already configured
    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });

   ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: config.clientId,
        secret: config.secret
    });
};

export default function () {
  var facebookConfig = Meteor.settings.facebook;
  if(facebookConfig) {
	configureFacebook(facebookConfig);
  }
}
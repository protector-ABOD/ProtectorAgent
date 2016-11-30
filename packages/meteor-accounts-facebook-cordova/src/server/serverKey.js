var profileFields = [];

/*CFB.Configure = function (config) {
    if(!config || !config.APP_ID || !config.secret) {
        throw new Error("Meteor settings for accounts-facebook-cordova not configured correctly.");
    }
    console.log(config);
    if(config.profileFields) {
        _.each(config.profileFields, function (p) {
            if(_.indexOf(profileFields, p) == -1)
                profileFields.push(p); 
        });
    }
    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });
     ServiceConfiguration.configurations.insert({
         service: "facebook",
         appId: config.APP_ID,
         secret: config.secret
     }); 
    // https://github.com/meteor/meteor/blob/devel/packages/accounts-facebook/facebook.js#L15
    Accounts.addAutopublishFields({
        // publish all fields including access token, which can legitimately
        // be used from the client (if transmitted over ssl or on
        // localhost). https://developers.facebook.com/docs/concepts/login/access-tokens-and-types/,
        // "Sharing of Access Tokens"
        forLoggedInUser: ['services.facebook'],
        forOtherUsers: [
            // https://www.facebook.com/help/167709519956542
            'services.facebook.id', 'services.facebook.username', 'services.facebook.gender'
        ]
    });
};*/

//https://github.com/particles4dev-team/meteor-accounts-facebook-cordova/commit/8f8cdb8e8fd3418bd74b0c4ddcf50850ee55b256
//later version broke web log in, so the code from when it was working is taken (from link above)
Accounts.oauth.registerService('facebook');
if (Meteor.settings &&
    Meteor.settings["facebook"] &&
    Meteor.settings["facebook"].clientId &&
    Meteor.settings["facebook"].secret) {

    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });

    ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: Meteor.settings["facebook"].clientId,
        secret: Meteor.settings["facebook"].secret
    });


    // https://github.com/meteor/meteor/blob/devel/packages/accounts-facebook/facebook.js#L15
    Accounts.addAutopublishFields({
        // publish all fields including access token, which can legitimately
        // be used from the client (if transmitted over ssl or on
        // localhost). https://developers.facebook.com/docs/concepts/login/access-tokens-and-types/,
        // "Sharing of Access Tokens"
        forLoggedInUser: ['services.facebook'],
        forOtherUsers: [
            // https://www.facebook.com/help/167709519956542
            'services.facebook.id', 'services.facebook.username', 'services.facebook.gender'
        ]
    });
} else {
    console.log("Meteor settings for accounts-facebook-cordova not configured correctly.");
}

CFB.getProfileFields = function () {
    return profileFields;
};
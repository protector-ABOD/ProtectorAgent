//Accounts.oauth.registerService('facebook');
Meteor.loginWithFacebook = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
        callback = options;
        options = null;
    }
	
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);

    var fbLoginSuccess = function (data) {
        data.cordova = true;
        Accounts.callLoginMethod({
            methodArguments: [data],
            userCallback: callback
        });
    }

    if (Meteor.isCordova) {
        CFB.getLoginStatus(function (error, response) {
            if(error) {
                callback(error, null);
                return;
            }
            if (response.status != "connected") {
                CFB.loginCordova(function (err, res) {
                    if(err) {
                        callback(err, null);
                        return;
                    }
                    fbLoginSuccess(res);
                });
            }
            else {
                fbLoginSuccess(response);
            }
        });
    } else {
        Facebook.requestCredential(options, credentialRequestCompleteCallback);
    }
};
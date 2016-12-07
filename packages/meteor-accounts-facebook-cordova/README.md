inspiration from meteor-accounts-facebook-cordova (andrewreedy)

Accounts Facebook Cordova
================

## Introduction

This packages replaces the accounts-facebook package. It works with [phonegap-facebook-plugin](https://github.com/phonegap/phonegap-facebook-plugin) when using cordova and falls back to the facebook package when in a browser.

*Note: Currently only tested with android. Will test the other platforms asap.*

*Current status: Login works great! Working on abstracting the graph api calls so they work from both native sdk or http request .. although it may be better to just stick with http.*

================

## Installation / Setup

##### Requirements
* [Cordova: 3.5](http://cordova.apache.org/)
* [phonegap-facebook-plugin](https://github.com/phonegap/phonegap-facebook-plugin)

================

##### Package Installation
Meteor 0.9.0 and up
````
meteor add particle4dev:cordova-fb
````
*Note: For testing you can also add accounts-ui package.*

================

##### Config file (cordova.facebook.json)
````
{
    "cordova": {
        "APP_ID": "1082178381799216",
        "APP_NAME": "jerr­y­-s­t­o­ries-test1",
        "secret": "dfc9aaabbe537b25c752b91ddcb07348"
    },
    "permissions": [
        "public_profile",
        "user_interests",
        "user_activities",
        "user_photos",
        "read_friendlists",
        "user_friends",
        "email"
    ],
    "profileFields": [
        "id",
        "name",
        "gender",
        "location",
        "email",
        "first_name",
        "last_name",
        "link",
        "username",
        "locale",
        "age_range"
    ]
}
````
### Config meteor settings
production.json
```
{
    "environment": "production"
}
```
`meteor run --settings production.json`

OR

development.json
```
{
    "environment": "development"
}
```
`meteor run --settings development.json`

================

### API
* CFB.getLoginStatus(client only)
* CFB.loginCordova(client only)
* CFB.shareFeed(client only)
* CFB.share(client only)
* The Graph API (incomplete)
* CFB.getIdentity(server only)
* CFB.getProfilePicture(server only)
* The Graph API (incomplete)

### Cordova Setup Guide
Refer to the [phonegap-facebook-plugin readme](https://github.com/phonegap/phonegap-facebook-plugin)

## Final Notes

##### Running your app with settings

````
meteor run android-device -p 192.168.1.103:3000 --verbose --settings settings.json
````

````
mrt --settings settings.json
````
================
### Example
[https://github.com/particle4dev/meteor-cordova-facebook-login](https://github.com/particle4dev/meteor-cordova-facebook-login)

If you want more features than this provides, file an issue. Feature requests/contributions are welcome.

import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import commonModule from './modules/common';
import usersModule from './modules/users';
import agentsModule from './modules/agents';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commonModule);
app.loadModule(usersModule);
app.loadModule(agentsModule);
app.init();


//configuration codes

Tracker.autorun(function(){
  if(Meteor.user()){
    // login handler
	var path = FlowRouter.current().path;
	// we only do it if the user is in the login page
	if(path === "/login"){
	  FlowRouter.go("/agent/home");
	}
  }
  else{
    // logout handler
	//console.log('b');
  }
});

//configure raix push - client side
Push.Configure(Meteor.settings.public.push_notification.gcm);

//override alert function if running on mobile (use android dialog box)
if (Meteor.isCordova) {
	window.alert = navigator.notification.alert;
}

//add event listener when there is push notification and app is opened
Push.addListener('message', function(notification) {

	function alertDismissed() {
		//do nothing for now
	}

	alert(notification.message, alertDismissed, notification.payload.title, "Ok");
});
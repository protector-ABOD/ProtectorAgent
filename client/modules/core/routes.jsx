import React from 'react';
import {mount} from 'react-mounter';

import Layout from './components/MainLayout.jsx';
import Home from './components/Home.jsx';
import NewUser from '../users/containers/NewUser.js';
import Login from '../users/containers/Login.js';

function redirectIfLoggedIn (ctx, redirect) {
  if (Meteor.userId()) {
    redirect('/home');
  }
}

function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId() && !Meteor.loggingIn()) {
    redirect('/login');
  }
}

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(Layout);

  var privateRoutes = FlowRouter.group({  
    name: 'private',
    triggersEnter: [
	  checkLoggedIn
    ]
  })
  
  var publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [
      redirectIfLoggedIn
    ]
  })

  privateRoutes.route('/logout', {
    name: 'users.logout',
    action() {
      Meteor.logout();
      FlowRouter.go('/');
    }
  }); 

  publicRoutes.route('/', {
    name: 'landing',
    action() {
	  mount(MainLayoutCtx, {
	    content: () => (<Home />)
	  });
    }
  });
  
  publicRoutes.route('/register', {
    name: 'users.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewUser />)
      });
    }
  });  

  publicRoutes.route('/login', {
    name: 'users.login',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Login />)
      });
    }
  });  
}

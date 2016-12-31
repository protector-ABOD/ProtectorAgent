import React from 'react';
import {mount} from 'react-mounter';

import Layout from './components/MainLayout.jsx';
import LoginLayout from './components/LoginLayout.jsx';
import Home from './components/Home.jsx';
import Login from '../users/containers/Login.js';
import AgentHome from '../agents/containers/AgentHome.js';
import AgentApplicationInfo from '../agents/containers/AgentApplicationInfo.js';
import AgentTermsAndConditions from '../agents/containers/AgentTermsAndConditions.js';
import AgentApplication from '../agents/containers/AgentApplication.js';

function redirectIfLoggedIn (ctx, redirect) {
  if (Meteor.userId()) {
    redirect('/agent/home');
  }
}

function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId() && !Meteor.loggingIn()) {
    redirect('/login');
  }
}

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(Layout);
  const LoginLayoutCtx = injectDeps(LoginLayout);

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

  privateRoutes.route('/home', {
    name: 'home',
    action() {
	  mount(MainLayoutCtx, {
	  });
    }
  });

  privateRoutes.route('/agent/home', {
    name: 'agent.home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AgentHome />)
      });
    }
  });

  privateRoutes.route('/agent/application-info', {
    name: 'agent.applicationInfo',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AgentApplicationInfo />)
      });
    }
  });   

  privateRoutes.route('/agent/terms-and-conditions', {
    name: 'agent.termsAndConditions',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AgentTermsAndConditions />)
      });
    }
  });

  privateRoutes.route('/agent/application', {
    name: 'agent.application',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AgentApplication />)
      });
    }
  });   

  privateRoutes.route('/', {
    name: 'landing',
    action() {
	  /*mount(MainLayoutCtx, {
	    content: () => (<Home />)
	  });*/
      FlowRouter.go('/agent/home');
    }
  });

  publicRoutes.route('/login', {
    name: 'users.login',
    action() {
      mount(LoginLayoutCtx, {
        content: () => (<Login />)
      });
    }
  });  
}

import React from 'react';
import AgentHome from '../components/AgentHome.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('agents.single', Meteor.userId()).ready()) {
    const agents = Collections.Agents.findOne();
	
	if (!agents) {
	  FlowRouter.go("/agent/termsAndConditions");
	};
    onData(null, {agents});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

const loadingScreen = () => (<div className="loading-panel">Loading...</div>);

export default composeAll(
  composeWithTracker(composer, loadingScreen),
  useDeps(depsMapper)
)(AgentHome);

import React from 'react';
import AgentProfile from '../components/AgentProfile.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  
  if (Meteor.subscribe('agents.single', Meteor.userId()).ready()
		&& Meteor.subscribe('serviceRequests.AcceptedAndPending', Meteor.userId()).ready() 
		&& Meteor.subscribe('userProfile.byRequestedAgent', Meteor.userId()).ready() 
		&& Meteor.subscribe('codeTables.country').ready()
		&& Meteor.subscribe('codeTables.serviceType').ready()) {

    const agent = Collections.Agents.findOne({}, {
		transform: function (doc) {
			return doc;
		}
	});

    onData(null, {agent});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

const loadingScreen = () => (<div className="loading-panel">Loading...</div>);

export default composeAll(
  composeWithTracker(composer, loadingScreen),
  useDeps(depsMapper)
)(AgentProfile);

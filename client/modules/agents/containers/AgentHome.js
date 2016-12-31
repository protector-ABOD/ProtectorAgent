import React from 'react';
import AgentHome from '../components/AgentHome.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('agents.single', Meteor.userId()).ready()) {
    const agents = Collections.Agents.findOne({}, {
		reactive: false,
		transform: function (doc) {
			
			if (doc.Schedule) {
				for (var i = 0; i < doc.Schedule.length; i++) {
					doc.Schedule[i].Date = doc.Schedule[i].Date.getFullYear() + "/" + (doc.Schedule[i].Date.getMonth() + 1) + "/" + doc.Schedule[i].Date.getDate();
					doc.Schedule[i].RowState = "Unchanged";
					doc.Schedule[i].OriginalAvailability = doc.Schedule[i].Availability;
				}
			}
			
			return doc;
		}
	});
	
	if (!agents) {
	  FlowRouter.go("/agent/terms-and-conditions");
	}
	else if (agents.ApplicationStatus === "Submitted" 
			 || agents.ApplicationStatus === "Shortlisted" 
			 || agents.ApplicationStatus === "Rejected"
			 || agents.ApplicationStatus != "Completed"){
	  FlowRouter.go("/agent/application-info");
	}
    onData(null, {agents});
  }
};

export const depsMapper = (context, actions) => ({
  saveAgentSchedule: actions.agents.saveAgentSchedule,
  context: () => context
});

const loadingScreen = () => (<div className="loading-panel">Loading...</div>);

export default composeAll(
  composeWithTracker(composer, loadingScreen),
  useDeps(depsMapper)
)(AgentHome);

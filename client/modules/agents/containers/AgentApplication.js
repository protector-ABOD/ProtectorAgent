import React from 'react';
import AgentApplication from '../components/AgentApplication.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  
  if (Meteor.subscribe('agents.single').ready()) {
    const agents = Collections.Agents.findOne();
	
	if (agents){
	  FlowRouter.go("/agent/home");
	}
  }
  
  if (Meteor.subscribe('skills.list').ready()) {
    const skills = Collections.Skills.find({ Parent_Skill_ID : null }, {
						transform: function (doc) { 
							doc.SubSkill = Collections.Skills.find({ Parent_Skill_ID : doc._id, Status_ID : 1}, {sort: {Skill_Name: 1}}).fetch();
							return doc; 
					}}).fetch();
    onData(null, {skills});
  }
};

export const depsMapper = (context, actions) => ({
  createAgent: actions.agents.createAgent,
  context: () => context
});

const loadingScreen = () => (<div className="loading-panel">Loading...</div>);

export default composeAll(
  composeWithTracker(composer, loadingScreen),
  useDeps(depsMapper)
)(AgentApplication);

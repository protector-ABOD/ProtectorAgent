import React from 'react';
import AgentJobHistory from '../components/AgentJobHistory.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  
  if (Meteor.subscribe('agents.single', Meteor.userId()).ready()
		&& Meteor.subscribe('serviceRequests.history', Meteor.userId()).ready() 
		&& Meteor.subscribe('userProfile.byRequestedAgent', Meteor.userId()).ready() 
		&& Meteor.subscribe('codeTables.country').ready()
		&& Meteor.subscribe('codeTables.serviceType').ready()) {
			
    const serviceRequests = Collections.ServiceRequests.find({}, {
		transform: function (doc) {

			if (doc.Service_Request) {
				const serviceTypeCodeTable = Collections.CodeTables.findOne({Category : "ServiceType"});
				const serviceType = _.find(serviceTypeCodeTable.ValueList, function (item) {return item.Code == doc.Service_Request.Service_Type_Code});
				
				if (serviceType) {
					doc.Service_Request.Service_Type_Description = serviceType.Description;
				}
				else {
					doc.Service_Request.Service_Type_Description = "";
				}

				const countryCodeTable = Collections.CodeTables.findOne({Category : "Country"});
				const country = _.find(countryCodeTable.ValueList, function (item) {return item.Code == doc.Service_Request.Service_Country_Code});
				
				if (country) {
					const state = _.find(country.States, function (item) {return item.Code == doc.Service_Request.Service_State_Code});
					
					if (state) {
						doc.Service_Request.Service_State_Description = state.Description;
					}
					else {
						doc.Service_Request.Service_State_Description = "";
					}
				}
				else {
					doc.Service_Request.Service_State_Description = "";
				}
				
				const user = Collections.UserProfiles.findOne({ User_ID: doc.User_ID });
				
				if (user) {
					doc.User = user;
				}
			}
			
			return doc;
		}
	}).fetch();

    onData(null, {serviceRequests});
  }
};

export const depsMapper = (context, actions) => ({
  completeRequest: actions.agents.completeRequest,
  acceptRequest: actions.agents.acceptRequest,
  rejectRequest: actions.agents.rejectRequest,
  context: () => context
});

const loadingScreen = () => (<div className="loading-panel">Loading...</div>);

export default composeAll(
  composeWithTracker(composer, loadingScreen),
  useDeps(depsMapper)
)(AgentJobHistory);

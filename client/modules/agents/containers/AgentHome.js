import React from 'react';
import AgentHome from '../components/AgentHome.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('agents.single', Meteor.userId()).ready()
		&& Meteor.subscribe('serviceRequests.AcceptedAndPending', Meteor.userId()).ready() 
		&& Meteor.subscribe('userProfile.byRequestedAgent', Meteor.userId()).ready() 
		&& Meteor.subscribe('codeTables.country').ready()
		&& Meteor.subscribe('codeTables.serviceType').ready()) {

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

	const serviceRequestsAccepted = Collections.ServiceRequests.find({Service_Request_Status : 'Accepted'}, {
		transform: function (doc) {

			if (doc.Service_Request) {
				let serviceRequestDate = doc.Service_Request.Service_Start_Time.slice(0, 10).split("-");
				
				doc.Date = serviceRequestDate[0] + "/" + parseInt(serviceRequestDate[1], 10) + "/" + parseInt(serviceRequestDate[2], 10);
				
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

    const serviceRequestsPending = Collections.ServiceRequests.find({Service_Request_Status : 'Pending'}, {
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

    onData(null, {agents, serviceRequestsAccepted, serviceRequestsPending});
  }
};

export const depsMapper = (context, actions) => ({
  saveAgentSchedule: actions.agents.saveAgentSchedule,
  completeRequest: actions.agents.completeRequest,
  acceptRequest: actions.agents.acceptRequest,
  rejectRequest: actions.agents.rejectRequest,
  context: () => context
});

const loadingScreen = () => (<div className="loading-panel">Loading...</div>);

export default composeAll(
  composeWithTracker(composer, loadingScreen),
  useDeps(depsMapper)
)(AgentHome);

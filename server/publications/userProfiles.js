import {Agents, ServiceRequests, UserProfiles} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  //find user profile that requested for the services of Agent
  //01. Get Agent by agent's user id
  //02. Get ServiceRequest by Agent._id
  //03. Get UserProfile by ServiceRequest.User_ID
  Meteor.publish('userProfile.byRequestedAgent', function () {

	//get agent
    const agentSelector = {UserID: this.userId};
	const agent = Agents.findOne(agentSelector);

	if (agent) {
		//get ServiceRequest
		const serviceRequestSelector = {Agent_ID : agent._id, Active_Status : 1};
		const serviceRequests = ServiceRequests.find(serviceRequestSelector, {fields : {User_ID : 1} }).map(function(item){ return item.User_ID; });
		
		if (serviceRequests) {
			//get UserProfile
			const users = UserProfiles.find({ User_ID: { $in : serviceRequests } });
			return users;
		}
		else {
			this.ready();
		}
	}
	else {
		this.ready();
	}
  });
}
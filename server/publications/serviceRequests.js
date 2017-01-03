import {Agents, ServiceRequests} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('serviceRequests.pending', function (userID) {
    check(userID, String);
    const agentSelector = {UserID: userID};
	const agent = Agents.findOne(agentSelector);
	
	if (agent) {
		const serviceRequestSelector = {
			Agent_ID: agent._id, 
			Active_Status : 1, 
			Service_Request_Status : 'Pending'
		};

		return ServiceRequests.find(serviceRequestSelector);
	}
	else {
		return null;
	}
  });
  Meteor.publish('serviceRequests.accepted', function (userID) {
    check(userID, String);
    const agentSelector = {UserID: userID};
	const agent = Agents.findOne(agentSelector);
	
	if (agent) {
		const serviceRequestSelector = {
			Agent_ID: agent._id, 
			Active_Status : 1, 
			Service_Request_Status : 'Accepted'
		};

		return ServiceRequests.find(serviceRequestSelector);
	}
	else {
		return null;
	}
  });
}
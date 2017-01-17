import {Agents, ServiceRequests} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  //get all pending service requests
  Meteor.publish('serviceRequests.AcceptedAndPending', function () {
	  
    const agentSelector = {UserID: this.userId};
	const agent = Agents.findOne(agentSelector);
	
	if (agent) {
		const serviceRequestSelector = {
			Agent_ID: agent._id, 
			Active_Status : 1, 
			$or : [{Service_Request_Status : 'Pending'}, {Service_Request_Status : 'Accepted'}]
		};

		return ServiceRequests.find(serviceRequestSelector);
	}
	else {
		this.ready();
	}
  });
  //get all service requests by agent
  Meteor.publish('serviceRequests.history', function () {
	  
    const agentSelector = {UserID: this.userId};
	const agent = Agents.findOne(agentSelector);
	
	if (agent) {
		const serviceRequestSelector = {
			Agent_ID: agent._id, 
			Active_Status : 1,
			Service_Request_Status : { '$ne' : 'Rejected' }
		};

		return ServiceRequests.find(serviceRequestSelector);
	}
	else {
		this.ready();
	}
  });
}
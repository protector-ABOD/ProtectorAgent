import {Agents, ServiceRequests} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('users.byRequestedAgent', function (userID) {
    check(userID, String);
    const agentSelector = {UserID: userID};
	const agent = Agents.findOne(agentSelector);

	if (agent) {
		const serviceRequestSelector = {Agent_ID : agent._id, Active_Status : 1};
		const serviceRequests = ServiceRequests.find(serviceRequestSelector, {fields : {User_ID : 1} }).map(function(item){ return item.User_ID; });
		
		if (serviceRequests) {
			const users = Meteor.users.find({ _id: { $in : serviceRequests } }, {fields : { profile : 1}});
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
import {Agents, ServiceRequests} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
	'serviceRequest.accept'(_id, userId) {
		//validation
		check( _id, Meteor.Collection.ObjectID );
		check( userId, String );

		//update db
		ServiceRequests.update(_id, { $set: { Service_Request_Status : "Accepted" } });
		
		//find service request
		const serviceRequest = ServiceRequests.findOne({ _id : _id});

		//find agent based on agent_id in service request
		const agent = Agents.findOne({_id : serviceRequest.Agent_ID});

		//if agent is found, push notification to user
		if (agent) {		
			Push.send({
				from: 'push',
				title: 'Request Accepted',
				text: agent.FullName + ' has accepted your request.',
				badge: 1,
				query: {userId : serviceRequest.User_ID},
				payload: {
					title: 'Request Accepted'
				}
			});
		}
    },
	'serviceRequest.reject'(_id, userId) {
		//validation
		check( _id, Meteor.Collection.ObjectID );
		check( userId, String );

		//update db
		ServiceRequests.update(_id, { $set: { Service_Request_Status : "Rejected" } });
		
		//find service request
		const serviceRequest = ServiceRequests.findOne({ _id : _id});

		//find agent based on agent_id in service request
		const agent = Agents.findOne({_id : serviceRequest.Agent_ID});

		//if agent is found, push notification to user
		if (agent) {
			Push.send({
				from: 'push',
				title: 'Request Rejected',
				text: agent.FullName + ' has rejected your request.',
				badge: 1,
				query: {userId : serviceRequest.User_ID},
				payload: {
					title: 'Request Rejected'
				}
			});
		}
    }
  });
}
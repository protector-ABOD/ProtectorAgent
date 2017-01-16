import {Agents, ServiceRequests} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
	'serviceRequest.complete'(request, userId) {
		//validation
		check( request, {
			_id : Meteor.Collection.ObjectID,
			Comment_By_Agent : String,
			Rating_By_Agent : Number
		});
		check( userId, String );

		//update db
		ServiceRequests.update(request._id, {
			$set: {
				Comment_By_Agent : request.Comment_By_Agent,
				Rating_By_Agent : request.Rating_By_Agent,
				Service_Request_Status : "Completed",
				Last_Edited_By : userId
			}
		});
    },
	'serviceRequest.accept'(_id, userId) {
		//validation
		check( _id, Meteor.Collection.ObjectID );
		check( userId, String );

		//update db
		ServiceRequests.update(_id, { $set: { Service_Request_Status : "Accepted", Last_Edited_By : userId } });

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

    //find service request
		const serviceRequest = ServiceRequests.findOne({ _id : _id});

		//update db
    ServiceRequests.update(_id, { $set: { Service_Request_Status : "Rejected", Last_Edited_By : userId } });

    rejectAgentObject = {};
    rejectAgentObject["Agent_ID"] = serviceRequest.Agent_ID;
    rejectAgentObject["Rejected_DateTime"] = new Date();
		ServiceRequests.update(_id, { $push: { Agents_Rejected : rejectAgentObject } });

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
    },
	'serviceRequest.AgentRating'(userId) {
		check( userId, String );
		
		const agentSelector = {UserID: userId};
		const agent = Agents.findOne(agentSelector);
		
		if (agent) {		
			const _id = new MongoInternals.NpmModule.ObjectID(agent._id._str);
			const filter = {
				Agent_ID : _id,
				Service_Request_Status : "Completed",
				Active_Status : 1
			}
			
			const group = {
				"_id" : {
					Agent_ID : '$Agent_ID'
				},
				"averageRating": {
					$avg: '$Rating_By_User'
				}
			};
			
			return ServiceRequests.aggregate(
				{ 
					$match:filter
				},   
				{   
					$group : group
				}  
			);
		}
		else {
			return [];
		}
    },
	'serviceRequest.ServiceRequestAcceptedCount'(userId) {
		check( userId, String );
		
		const agentSelector = {UserID: userId};
		const agent = Agents.findOne(agentSelector);
		
		if (agent) {		
			const _id = new MongoInternals.NpmModule.ObjectID(agent._id._str);
			const filter = {
				Agent_ID : _id,
				$or : [{Service_Request_Status : "Accepted"}, {Service_Request_Status : "Completed"}],
				Active_Status : 1
			}
			
			const group = {
				"_id" : {
					Agent_ID : '$Agent_ID'
				},
				"acceptedCount": {
					$sum: 1
				}
			};
			
			return ServiceRequests.aggregate(
				{ 
					$match:filter
				},   
				{   
					$group : group
				}  
			);
		}
		else {
			return [];
		}
    },
	'serviceRequest.ServiceRequestTotalCount'(userId) {
		check( userId, String );
		
		const agentSelector = {UserID: userId};
		const agent = Agents.findOne(agentSelector);
		
		if (agent) {		
			const _id = new MongoInternals.NpmModule.ObjectID(agent._id._str);
			const filter = {
				Agent_ID : _id,
				$or : [{Service_Request_Status : "Accepted"}, {Service_Request_Status : "Completed"}, {Service_Request_Status : "Rejected"}],
				Active_Status : 1
			}
			
			const group = {
				"_id" : {
					Agent_ID : '$Agent_ID'
				},
				"totalCount": {
					$sum: 1
				}
			};
			
			return ServiceRequests.aggregate(
				{ 
					$match:filter
				},   
				{   
					$group : group
				}  
			);
		}
		else {
			return [];
		}
    }
  });
}

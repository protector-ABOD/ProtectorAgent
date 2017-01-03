import {ServiceRequests} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
	'serviceRequest.accept'(_id, userId) {
		check( _id, Meteor.Collection.ObjectID );
		check( userId, String );

		ServiceRequests.update(_id, { $set: { Service_Request_Status : "Accepted" } });
    },
	'serviceRequest.reject'(_id, userId) {
		check( _id, Meteor.Collection.ObjectID );
		check( userId, String );

		ServiceRequests.update(_id, { $set: { Service_Request_Status : "Rejected" } });
    }
  });
}
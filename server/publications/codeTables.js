import {CodeTables} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('codeTables.all', function () {
	const selector = {};

	return CodeTables.find(selector);
  });
  Meteor.publish('codeTables.country', function () {
	const selector = {Category : "Country"};

	return CodeTables.find(selector);
  });
  Meteor.publish('codeTables.serviceType', function () {
	const selector = {Category : "ServiceType"};

	return CodeTables.find(selector);
  });
}
import {CodeTables} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  //get all codetables
  Meteor.publish('codeTables.all', function () {
	const selector = {};

	return CodeTables.find(selector);
  });
  //get all codetable - country
  Meteor.publish('codeTables.country', function () {
	const selector = {Category : "Country"};

	return CodeTables.find(selector);
  });
  //get all codetable - serviceType
  Meteor.publish('codeTables.serviceType', function () {
	const selector = {Category : "ServiceType"};

	return CodeTables.find(selector);
  });
}
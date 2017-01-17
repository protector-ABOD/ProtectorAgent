import {Agents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  //get single agent by UserID
  Meteor.publish('agents.single', function () {
	  
    const selector = {UserID: this.userId};
    return Agents.find(selector);
  });
}
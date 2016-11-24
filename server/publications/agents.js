import {Agents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  /*Meteor.publish('agents.list', function () {
    const selector = {};
    const options = {
      fields: {_id: 1, title: 1},
      sort: {createdAt: -1},
      limit: 10
    };

    return Posts.find(selector, options);
  });*/

  Meteor.publish('agents.single', function (userID) {
    check(userID, String);
    const selector = {UserID: userID};
    return Agents.find(selector);
  });
}
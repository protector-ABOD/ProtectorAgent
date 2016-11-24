import {Skills} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('skills.list', function () {
    const selector = { Status_ID : 1};
    const options = {
      //fields: {_id: 1, title: 1},
      sort: {Skill_Name: 1}
      //limit: 10,
    };

    return Skills.find(selector, options);
  });
}
import {Agents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'agents.create'(agent, userId) {

		//validation
		check( userId, String );
		check( agent, {
			fullName : String,
			email : String,
			mobileNumber : String,
			nricLeft : String,
			nricMiddle : String,
			nricRight : String,
			gender : String,
			race : String,
			dateOfBirthDate : Number,
			dateOfBirthMonth : Number,
			dateOfBirthYear : Number,
			weight : Number,
			height : Number,
			comment : String,
			academicAttainment : String,
			skills : [{
				SkillID : String,
				SkillName : String,
				Proficiency : String
			}]
		}); 
		
		const createdAt = new Date();
		
		//prepare agent object to insert
		const agentToInsert = {
			UserID : userId,
			FullName : agent.fullName,
			Email : agent.email,
			MobileNumber : agent.mobileNumber,
			NRIC : agent.nricLeft + agent.nricMiddle + agent.nricRight,
			Gender : agent.gender,
			Race : agent.race,
			DateofBirth : agent.dateOfBirthDate + '/' + agent.dateOfBirthMonth + '/' + agent.dateOfBirthYear,
			Weight : agent.weight,
			Height : agent.height,
			Comment : agent.comment,
			AcademicAttainment : agent.academicAttainment,
			Skills : agent.skills,
			ApplicationStatus : "Submitted",
			StatusID : 1,
			CreatedDateTime : createdAt,
			CreatedBy : userId
		};
		
		//insert new agent to db
		Agents.insert(agentToInsert);
    },
	'agents.schedule.save'(dates, userId) {
		//validation
		check( userId, String );
		check( dates, [{
		  Date : Date,
		  Availability : String,
		  RowState : String
		}]); 
		
		//find agent to be updated by userid
		const selector = {UserID: userId, StatusID : 1};
		const agent = Agents.findOne(selector);
		
		//foreach row in dates
		//if row is added, update and $push new object into agent.schedule
		//if row is modified, update existing record in agent.schedule object in db
		for (var i = 0; i < dates.length; i++) {
			if (dates[i].RowState === "Added") {
				Agents.update({ _id: agent._id }, {
					$push: { 
						Schedule: {
							Date: dates[i].Date,
							Availability : dates[i].Availability
						} 
					}
				});
			}
			else {
				Agents.update({ _id: agent._id, "Schedule.Date" : dates[i].Date }, {
					$set: { 
						"Schedule.$.Availability" : dates[i].Availability 
						}
				});
			}
		}
    }
  });
}
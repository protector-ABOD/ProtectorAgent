import {Agents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'agents.create'(agent, userId) {
		/*
      check(agent.fullName, String);
      check(agent.email, String);
      check(agent.mobileNumber, String);
      check(agent.nricLeft, Number);
      check(agent.nricMiddle, Number);
      check(agent.nricRight, Number);
      check(agent.gender, String);
      check(agent.ethnic, String);
      check(agent.address, String);
      check(agent.addressCity, String);
      check(agent.addressPostcode, String);
      check(agent.addressState, String);
      check(agent.addressCountry, String);
      check(agent.dateOfBirthDate, Number);
      check(agent.dateOfBirthMonth, Number);
      check(agent.dateOfBirthYear, Number);
      check(agent.weight, Number);
      check(agent.height, Number);
      check(agent.academicAttainment, String);

	  agent["emergencyContact"] = {
			"emergencyContactFullName" : emergencyContactFullName.value,
			"emergencyContactMobileNumber" : emergencyContactMobileNumber.value,
			"emergencyContactRelationship" : emergencyContactRelationship.value
			};
		agent["languageProficiency"] = {
			"bahasaMalaysiaSpoken" : this.state.isBahasaMalaysiaSpoken,
			"bahasaMalaysiaWritten" : this.state.isBahasaMalaysiaWritten,
			"englishSpoken" : this.state.isEnglishSpoken,
			"englishWritten" : this.state.isEnglishWritten,
			"chineseSpoken" : this.state.isChineseSpoken,
			"chineseWritten" : this.state.isChineseWritten,
			"tamilSpoken" : this.state.isTamilSpoken,
			"tamilWritten" : this.state.isTamilWritten,
			"languageOthers" : languageOthers.value
			};
		agent["skills"] = this.state.skills;
		*/
		
      const createdAt = new Date();
      const agentToInsert = {
		UserID : userId,
        FullName : agent.fullName,
        Email : agent.email,
        MobileNumber : agent.mobileNumber,
		NRIC : agent.nricLeft + agent.nricMiddle + agent.nricRight,
		Gender : agent.gender,
		Race : agent.race,
		/*Address : agent.address,
		AddressCity : agent.addressCity,
		AddressPostcode : agent.addressPostcode,
		AddressState : agent.addressState,
		AddressCountry : agent.addressCountry,*/
		DateofBirth : agent.dateOfBirthDate + '/' + agent.dateOfBirthMonth + '/' + agent.dateOfBirthYear,
		Weight : agent.weight,
		Height : agent.height,
		Comment : agent.comment,
		//LanguageProficiency : agent.languageProficiency,
		AcademicAttainment : agent.academicAttainment,
		//EmergencyContact : agent.emergencyContact,
		Skills : agent.skills,
		ApplicationStatus : "Submitted",
		StatusID : 1,
        CreatedDateTime : createdAt,
		CreatedBy : userId
      };
		
      Agents.insert(agentToInsert);
    }
  });
}
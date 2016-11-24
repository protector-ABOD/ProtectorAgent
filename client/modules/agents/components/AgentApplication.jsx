import React from 'react';
import ReactDOM from 'react-dom';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';

class AgentApplication extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			isBahasaMalaysiaSpoken: false,
			isBahasaMalaysiaWritten: false,
			isEnglishSpoken: false,
			isEnglishWritten: false,
			isChineseSpoken: false,
			isChineseWritten: false,
			isTamilSpoken: false,
			isTamilWritten: false,
			academicAttainment: "PMR or equivalent",
			skills: []
		};
    }
	render() {
		const {skills} = this.props;
		var optionDay = [];
		for (var i = 1; i <= 31; i++) {
		  optionDay.push(<option key={i} value={i}>{i}</option>);
		}
		var optionMonth = [];
		for (var i = 1; i <= 31; i++) {
		  optionMonth.push(<option key={i} value={i}>{i}</option>);
		}
		var optionYear = [];
		var currentYear = new Date().getFullYear();
		for (var i = 1900; i <= currentYear; i++) {
		  optionYear.push(<option key={i} value={i}>{i}</option>);
		}
		return (
			<div className="agent-application">
				<form onSubmit={this.createAgent.bind(this)}>
					<label>Full Name</label>
					<br />
					<input ref="fullName" type="text" />
					<br />
					<label>Email</label>
					<br />
					<input ref="email" type="text" placeholder="e.g. agent@protector.com"/>
					<br />
					<label>Mobile Number</label>
					<br />
					<input ref="mobileNumber" type="text" placeholder="e.g. 0128888888"/>
					<br />
					<label>NRIC</label>
					<br />
					<input ref="nricLeft" type="text" maxLength="6" />
					<br />
					<input ref="nricMiddle" type="text" maxLength="2" />
					<br />
					<input ref="nricRight" type="text" maxLength="4" />
					<br />
					<label>Gender</label>
					<br />
					<select ref="gender" defaultValue="Male">
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
					<br />
					<label>Ethnic</label>
					<br />
					<select ref="ethnic" defaultValue="Malay">
						<option value="Malay">Malay</option>
						<option value="Chinese">Chinese</option>
						<option value="Indian">Indian</option>
						<option value="Others">Others</option>
					</select>
					<br />
					<label>Address</label>
					<br />
					<input ref="address" type="text" placeholder="Address"/>
					<br />
					<input ref="addressCity" type="text" placeholder="City"/>
					<br />
					<input ref="addressPostcode" type="text" placeholder="Postcode"/>
					<br />
					<input ref="addressState" type="text" placeholder="State"/>
					<br />
					<input ref="addressCountry" type="text" placeholder="Country"/>
					<br />
					<label>Date of Birth</label>
					<br />
					<select ref="dateOfBirthDate" defaultValue="1">
						{optionDay}
					</select>
					<br />
					<select ref="dateOfBirthMonth" defaultValue="1">
						{optionMonth}
					</select>
					<br />
					<select ref="dateOfBirthYear" defaultValue={currentYear}>
						{optionYear}
					</select>
					<br />
					<label>Weight</label>
					<br />
					<input ref="weight" type="number" placeholder="kg" />
					<br />
					<label>Height</label>
					<br />
					<input ref="height" type="number" placeholder="cm" />
					<br />
					<label>Emergency Contact</label>
					<br />
					<label>Full Name</label>
					<br />
					<input ref="emergencyContactFullName" type="text" />
					<br />
					<label>Mobile Number</label>
					<br />
					<input ref="emergencyContactMobileNumber" type="text" placeholder="e.g. 0128888888" />
					<br />
					<label>Relationship</label>
					<br />
					<input ref="emergencyContactRelationship" type="text" />
					<br />
					<br />
					<label>Academic Attainment (Please select highest)</label>
					<br />
					<input type="radio" name="academicAttainment"
						   value="PMR or equivalent" 
						   checked={this.state.academicAttainment === 'PMR or equivalent'}
						   onChange={this.handleRadioChange.bind(this)} /><span>PMR or equivalent</span>
					<br />
					<input type="radio" name="academicAttainment"
						   value="SPM or equivalent" 
						   checked={this.state.academicAttainment === 'SPM or equivalent'}
						   onChange={this.handleRadioChange.bind(this)} /><span>SPM or equivalent</span>
					<br />
					<input type="radio" name="academicAttainment"
						   value="STPM/Diploma or equivalent" 
						   checked={this.state.academicAttainment === 'STPM/Diploma or equivalent'}
						   onChange={this.handleRadioChange.bind(this)} /><span>STPM/Diploma or equivalent</span>
					<br />
					<input type="radio" name="academicAttainment"
						   value="Bachelor's Degree" 
						   checked={this.state.academicAttainment === "Bachelor's Degree"}
						   onChange={this.handleRadioChange.bind(this)} /><span>Bachelor's Degree</span>
					<br />
					<input type="radio" name="academicAttainment"
						   value="Master's Degree or Higher" 
						   checked={this.state.academicAttainment === "Master's Degree or Higher"}
						   onChange={this.handleRadioChange.bind(this)} /><span>Master's Degree or Higher</span>
					<br />
					<br />
					<label>Language Proficiency</label>
					<br />
					<label>
						Bahasa Malaysia
						<input type="checkbox" 
							   ref="isBahasaMalaysiaSpoken"
							   name="isBahasaMalaysiaSpoken"
							   checked={this.state.isBahasaMalaysiaSpoken}
							   onClick={this.handleCheckboxChange.bind(this)}
							   />
						<input type="checkbox" 
							   ref="isBahasaMalaysiaWritten"
							   name="isBahasaMalaysiaWritten"
							   checked={this.state.isBahasaMalaysiaWritten}
							   onClick={this.handleCheckboxChange.bind(this)}
							   />
					</label>
					<br />
					<label>
						English
						<input type="checkbox" 
							   ref="isEnglishSpoken"
							   name="isEnglishSpoken"
							   checked={this.state.isEnglishSpoken}
							   onClick={this.handleCheckboxChange.bind(this)}
							   />
						<input type="checkbox" 
							   ref="isEnglishWritten"
							   name="isEnglishWritten"
							   checked={this.state.isEnglishWritten}
							   onClick={this.handleCheckboxChange.bind(this)}
							   />
					</label>
					<br />
					<label>
						Mandarin and dialect
						<input type="checkbox" 
							   ref="isChineseSpoken"
							   name="isChineseSpoken"
							   checked={this.state.isChineseSpoken}
							   onClick={this.handleCheckboxChange.bind(this)}
							   />
						<input type="checkbox" 
							   ref="isChineseWritten"
							   name="isChineseWritten"
							   checked={this.state.isChineseWritten}
							   onClick={this.handleCheckboxChange.bind(this)}
							   />
					</label>
					<br />
					<label>
						Tamil
						<input type="checkbox" 
							   ref="isTamilSpoken"
							   name="isTamilSpoken"
							   checked={this.state.isTamilSpoken}
							   onClick={this.handleCheckboxChange.bind(this)}
							   />
						<input type="checkbox" 
							   ref="isTamilWritten"
							   name="isTamilWritten"
							   checked={this.state.isTamilWritten}
							   onClick={this.handleCheckboxChange.bind(this)}
							   />
					</label>
					<br />
					<label>
						Others
						<input ref="languageOthers" type="text" placeholder="e.g. French, Japanese"/>
					</label>
					<br />
					<br />
					  {skills.map(skill => (
						<div key={skill._id}>
							{skill.Skill_Name}
							<br />
							{skill.SubSkill.map(subskill => (
								<div key={subskill._id}>
									{subskill.Skill_Name}
									<br />
									
									<input type="radio" name={subskill._id._str}
										   value="Certified" 
										   checked={this.state[subskill._id._str] === "Certified"}
										   onChange={this.handleRadioSkillChange.bind(this)} /><span>Certified</span>
									<input type="radio" name={subskill._id._str}
										   value="Trained" 
										   checked={this.state[subskill._id._str] === "Trained"}
										   onChange={this.handleRadioSkillChange.bind(this)} /><span>Trained</span>
									<input type="radio" name={subskill._id._str}
										   value="No"  
										   checked={this.state[subskill._id._str] == null || this.state[subskill._id._str] === "No"}
										   onChange={this.handleRadioSkillChange.bind(this)} /><span>No</span>
								</div>
							  ))}
						</div>
					  ))}
					  <button type="submit">Submit</button>
				</form>
			</div>
		)
	}
	handleRadioChange(e) {
	    this.setState({[e.target.name] : e.target.value});
	}
	handleRadioSkillChange(e) {
		var currentSkill = this.state.skills;
		var isPushed = false;
		
		for (var count = 0; count < currentSkill.length; count++)
		{
			if (currentSkill[count].SkillID === e.target.name)
			{
				currentSkill[count].Proficiency = e.target.value;
				isPushed = true;
				break;
			}
		}
		
		if (!isPushed) {
			currentSkill.push({
				SkillID : e.target.name,
				Proficiency : e.target.value
			})
		}
		
	    this.setState({skills : currentSkill});
	    this.setState({[e.target.name] : e.target.value});
	}
	handleCheckboxChange(e) {
	    this.setState({[e.target.name] : e.target.checked});
	}
    createAgent(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		const {createAgent} = this.props;
		const {fullName, email, mobileNumber, nricLeft, nricMiddle, nricRight, gender, ethnic, 
			   address, addressCity, addressPostcode, addressState, addressCountry, dateOfBirthDate,
			   dateOfBirthMonth, dateOfBirthYear, weight, height, emergencyContactFullName, 
			   emergencyContactMobileNumber, emergencyContactRelationship, languageOthers} = this.refs;
		
		var agent = {};
		agent["fullName"] = fullName.value;
		agent["email"] = email.value;
		agent["mobileNumber"] = mobileNumber.value;
		agent["nricLeft"] = nricLeft.value;
		agent["nricMiddle"] = nricMiddle.value;
		agent["nricRight"] = nricRight.value;
		agent["gender"] = gender.value;
		agent["ethnic"] = ethnic.value;
		agent["address"] = address.value;
		agent["addressCity"] = addressCity.value;
		agent["addressPostcode"] = addressPostcode.value;
		agent["addressState"] = addressState.value;
		agent["addressCountry"] = addressCountry.value;
		agent["dateOfBirthDate"] = dateOfBirthDate.value;
		agent["dateOfBirthMonth"] = dateOfBirthMonth.value;
		agent["dateOfBirthYear"] = dateOfBirthYear.value;
		agent["weight"] = weight.value;
		agent["height"] = height.value;
		agent["emergencyContact"] = [{
			"emergencyContactFullName" : emergencyContactFullName.value,
			"emergencyContactMobileNumber" : emergencyContactMobileNumber.value,
			"emergencyContactRelationship" : emergencyContactRelationship.value
			}];
		agent["academicAttainment"] = this.state.academicAttainment;
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
		console.log(agent);
		createAgent(agent);
    }
}

export default AgentApplication;

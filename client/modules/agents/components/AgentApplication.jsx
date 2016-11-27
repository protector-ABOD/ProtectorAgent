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
					<label>Personal Information</label>
					<br />
					<br />
					<div className="form-group">
						<label htmlFor="fullName">Full Name</label>
						<input type="text" className="form-control" id="fullName" ref="fullName" />
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="text" className="form-control" id="email" ref="email" placeholder="e.g. abod@protector.com" />
					</div>
					<div className="form-group">
						<label htmlFor="mobileNumber">Mobile Number</label>
						<input type="text" className="form-control" id="mobileNumber" ref="mobileNumber" placeholder="e.g. 0128888888"/>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-xs-12">
								<label htmlFor="nricLeft">NRIC</label>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-3">
								<input type="text" className="form-control" id="nricLeft" ref="nricLeft" maxLength="6"/>
							</div>
							<div className="col-xs-3">
								<input type="text" className="form-control" id="nricMiddle" ref="nricMiddle" maxLength="6"/>
							</div>
							<div className="col-xs-3">
								<input type="text" className="form-control" id="nricRight" ref="nricRight" maxLength="6"/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6">
							<div className="col-xs-12 no-pad">
								<label htmlFor="gender">Gender</label>
							</div>
							<div className="col-xs-12 no-pad">
								<select ref="gender" defaultValue="Male" className="protector-select">
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>
						</div>
						<div className="col-xs-6">
							<div className="col-xs-12 no-pad">
								<label htmlFor="ethnic">Ethnic</label>
							</div>
							<div className="col-xs-12 no-pad">
								<select ref="ethnic" defaultValue="Malay" className="protector-select">
									<option value="Malay">Malay</option>
									<option value="Chinese">Chinese</option>
									<option value="Indian">Indian</option>
									<option value="Others">Others</option>
								</select>
							</div>
						</div>
					</div>
					<br />
					<div className="form-group">
						<div className="row">
							<div className="col-xs-12">
								<label htmlFor="address">Address</label>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								<input type="text" className="form-control" id="address" ref="address" placeholder="Address"/>
							</div>
						</div>
						<br />
						<div className="row">
							<div className="col-xs-6">
								<input type="text" className="form-control" id="addressCity" ref="addressCity" placeholder="City"/>
							</div>
							<div className="col-xs-6">
								<input type="text" className="form-control" id="addressPostcode" ref="addressPostcode" placeholder="Postcode"/>
							</div>
						</div>
						<br />
						<div className="row">
							<div className="col-xs-6">
								<input type="text" className="form-control" id="addressState" ref="addressState" placeholder="State"/>
							</div>
							<div className="col-xs-6">
								<input type="text" className="form-control" id="addressCountry" ref="addressCountry" placeholder="Country"/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-xs-12">
								<label htmlFor="dateOfBirthDate">Date of Birth</label>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-3">
								<select ref="dateOfBirthDate" defaultValue="1" className="protector-select">
									{optionDay}
								</select>
							</div>
							<div className="col-xs-3">
								<select ref="dateOfBirthMonth" defaultValue="1" className="protector-select">
									{optionMonth}
								</select>
							</div>
							<div className="col-xs-3">
								<select ref="dateOfBirthYear" defaultValue={currentYear} className="protector-select">
									{optionYear}
								</select>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6">
							<div className="col-xs-12 no-pad">
								<label htmlFor="weight">Weight</label>
							</div>
							<div className="col-xs-12 no-pad">
								<input type="number" className="form-control" id="weight" ref="weight" placeholder="kg"/>
							</div>
						</div>
						<div className="col-xs-6">
							<div className="col-xs-12 no-pad">
								<label htmlFor="height">Height</label>
							</div>
							<div className="col-xs-12 no-pad">
								<input type="number" className="form-control" id="height" ref="height" placeholder="cm"/>
							</div>
						</div>
					</div>
					<br />
					<br />
					<label>Emergency Contact</label>
					<br />
					<br />
					<div className="form-group">
						<label htmlFor="emergencyContactFullName">Full Name</label>
						<input type="text" className="form-control" id="emergencyContactFullName" ref="emergencyContactFullName" />
					</div>
					<div className="form-group">
						<label htmlFor="emergencyContactMobileNumber">Mobile Number</label>
						<input type="text" className="form-control" id="emergencyContactMobileNumber" ref="emergencyContactMobileNumber" placeholder="e.g. 0128888888" />
					</div>
					<div className="form-group">
						<label htmlFor="emergencyContactRelationship">Relationship</label>
						<input type="text" className="form-control" id="emergencyContactRelationship" ref="emergencyContactRelationship" placeholder="e.g. 0128888888" />
					</div>
					<br />
					<label>Personal Skills</label>
					<br />
					<br />
					<label>Academic Attainment (Please select highest)</label>
					<br />
					<input type="radio" name="academicAttainment"
						   value="PMR or equivalent" 
						   checked={this.state.academicAttainment === 'PMR or equivalent'}
						   onChange={this.handleRadioChange.bind(this)} /><span className="pad-radio-label">PMR or equivalent</span>
					<br />
					<input type="radio" name="academicAttainment"
						   value="SPM or equivalent" 
						   checked={this.state.academicAttainment === 'SPM or equivalent'}
						   onChange={this.handleRadioChange.bind(this)} /><span className="pad-radio-label">SPM or equivalent</span>
					<br />
					<input type="radio" name="academicAttainment"
						   value="STPM/Diploma or equivalent" 
						   checked={this.state.academicAttainment === 'STPM/Diploma or equivalent'}
						   onChange={this.handleRadioChange.bind(this)} /><span className="pad-radio-label">STPM/Diploma or equivalent</span>
					<br />
					<input type="radio" name="academicAttainment"
						   value="Bachelor's Degree" 
						   checked={this.state.academicAttainment === "Bachelor's Degree"}
						   onChange={this.handleRadioChange.bind(this)} /><span className="pad-radio-label">Bachelor's Degree</span>
					<br />
					<input type="radio" name="academicAttainment"
						   value="Master's Degree or Higher" 
						   checked={this.state.academicAttainment === "Master's Degree or Higher"}
						   onChange={this.handleRadioChange.bind(this)} /><span className="pad-radio-label">Master's Degree or Higher</span>
					<br />
					<br />
					<br />
					<div className="row">
						<div className="col-xs-6">
							<label>Language Proficiency</label>
						</div>
						<div className="col-xs-3 align-middle">
							<label>Spoken</label>
						</div>
						<div className="col-xs-3 align-middle">
							<label>Written</label>
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-xs-6">
							<span>Bahasa Malaysia</span>
						</div>
						<div className="col-xs-3 align-middle">
							<input type="checkbox" 
								   ref="isBahasaMalaysiaSpoken"
								   name="isBahasaMalaysiaSpoken"
								   checked={this.state.isBahasaMalaysiaSpoken}
								   onClick={this.handleCheckboxChange.bind(this)}
								   />
						</div>
						<div className="col-xs-3 align-middle">
							<input type="checkbox" 
								   ref="isBahasaMalaysiaWritten"
								   name="isBahasaMalaysiaWritten"
								   checked={this.state.isBahasaMalaysiaWritten}
								   onClick={this.handleCheckboxChange.bind(this)}
								   />
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-xs-6">
							<span>English</span>
						</div>
						<div className="col-xs-3 align-middle">
							<input type="checkbox" 
								   ref="isEnglishSpoken"
								   name="isEnglishSpoken"
								   checked={this.state.isEnglishSpoken}
								   onClick={this.handleCheckboxChange.bind(this)}
								   />
						</div>
						<div className="col-xs-3 align-middle">
							<input type="checkbox" 
								   ref="isEnglishWritten"
								   name="isEnglishWritten"
								   checked={this.state.isEnglishWritten}
								   onClick={this.handleCheckboxChange.bind(this)}
								   />
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-xs-6">
							<span>Mandarin and dialect</span>
						</div>
						<div className="col-xs-3 align-middle">
							<input type="checkbox" 
								   ref="isChineseSpoken"
								   name="isChineseSpoken"
								   checked={this.state.isChineseSpoken}
								   onClick={this.handleCheckboxChange.bind(this)}
								   />
						</div>
						<div className="col-xs-3 align-middle">
							<input type="checkbox" 
								   ref="isChineseWritten"
								   name="isChineseWritten"
								   checked={this.state.isChineseWritten}
								   onClick={this.handleCheckboxChange.bind(this)}
								   />
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-xs-6">
							<span>Tamil</span>
						</div>
						<div className="col-xs-3 align-middle">
							<input type="checkbox" 
								   ref="isTamilSpoken"
								   name="isTamilSpoken"
								   checked={this.state.isTamilSpoken}
								   onClick={this.handleCheckboxChange.bind(this)}
								   />
						</div>
						<div className="col-xs-3 align-middle">
							<input type="checkbox" 
								   ref="isTamilWritten"
								   name="isTamilWritten"
								   checked={this.state.isTamilWritten}
								   onClick={this.handleCheckboxChange.bind(this)}
								   />
						</div>
					</div>
					<br />
					<div className="form-group">
						<div className="col-xs-2 no-pad">
							<span>Others</span>
						</div>
						<div className="col-xs-10 no-pad">
							<input type="text" className="form-control" id="languageOthers" ref="languageOthers" placeholder="e.g. French, Japanese" />
						</div>
					</div>
					<br />
					<br />
					<br />
					<label>Protection Skills</label>
					<br />
					<br />
					  {skills.map(skill => (
						<div key={skill._id} className="pad-btm">
							<label>{skill.Skill_Name}</label>
							<br />
							<div className="row">
								<div className="col-xs-3">
								</div>
								<div className="col-xs-3 align-middle">
									Certified
								</div>
								<div className="col-xs-3 align-middle">
									Trained
								</div>
								<div className="col-xs-3 align-middle">
									No
								</div>
							</div>
							{skill.SubSkill.map(subskill => (
								<div className="row" key={subskill._id}>
									<div className="col-xs-3">
										{subskill.Skill_Name}
									</div>
									<div className="col-xs-3 align-middle">
										<input type="radio" name={subskill._id._str} 
											   data-skill-name={subskill.Skill_Name}
											   value="Certified" 
											   checked={this.state[subskill._id._str] === "Certified"}
											   onChange={this.handleRadioSkillChange.bind(this)} />
									</div>
									<div className="col-xs-3 align-middle">
										<input type="radio" name={subskill._id._str}
											   data-skill-name={subskill.Skill_Name}
											   value="Trained" 
											   checked={this.state[subskill._id._str] === "Trained"}
											   onChange={this.handleRadioSkillChange.bind(this)} />
									</div>
									<div className="col-xs-3 align-middle">
										<input type="radio" name={subskill._id._str}
											   data-skill-name={subskill.Skill_Name}
											   value="No"  
											   checked={this.state[subskill._id._str] == null || this.state[subskill._id._str] === "No"}
											   onChange={this.handleRadioSkillChange.bind(this)} />
									</div>
								</div>
							  ))}
						</div>
					  ))}
					  <br />
					  <div className="row align-middle">
						<button type="submit" className="btn btn-success btn-50">Submit</button>
					  </div>
					  <br />
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
				SkillName : e.target.getAttribute('data-skill-name'),
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

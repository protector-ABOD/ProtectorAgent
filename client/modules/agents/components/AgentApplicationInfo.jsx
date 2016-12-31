import React from 'react';
import ReactDOM from 'react-dom';

class AgentApplicationInfo extends React.Component {
	render() {
		const {agents} = this.props;
		let elementToRender;
		if (agents.ApplicationStatus === "Submitted" || agents.ApplicationStatus === "Shortlisted") {
			elementToRender = <div>
								  <p>Thank you for submitting your application. We are currently reviewing your application.</p>
								  <p>If you are shortlisted for the interview, please bring the following documents:</p>
								  <ul>
								    <li>IC</li>
								    <li>Passport photo</li>
								  </ul>
							  </div>;
		}
		else if (agents.ApplicationStatus === "Rejected") {
			elementToRender = <div>
								<p>Your application has been rejected.</p>
								<p>Kindly contact the administration if you'd like to attempt an application again.</p>
							  </div>;
		}
		else {
			elementToRender = "";
		}
		return (
			<div className="agent-application-info pad-top-percent-10">{elementToRender}</div>
		);
	}
}

export default AgentApplicationInfo;

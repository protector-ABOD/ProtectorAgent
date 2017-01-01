import React from 'react';

class AgentTermsAndConditions extends React.Component {
	handleAccept(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		FlowRouter.go("/agent/application");
	}
	render() {
		return (
			<div className="agent-terms-and-conditions">
				<div className="instructions">
					<p>Welcome to Protector Agent.</p>
					<p>We are now collecting applications from all agents.</p>
					<p>Please go through the forms and fill in your details.</p>
					<p>Once your application is submitted, we will contact you for interview.</p>
				</div>
				<div className="accept-terms-and-conditions">
					<p>By selecting proceed, I'm agreeing to the terms and conditions.</p>
					<br />
					<button className="btn btn-default btn-50" onClick={this.handleAccept}>Proceed</button>
				</div>
			</div>
		)
	}
}

export default AgentTermsAndConditions;

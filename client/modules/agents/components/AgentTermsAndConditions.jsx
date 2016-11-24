import React from 'react';
import ReactDOM from 'react-dom';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';

class AgentTermsAndConditions extends React.Component {
	handleAccept(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		FlowRouter.go("/agent/application");
	}
	render() {
		return (
			<div className="panel-terms-and-conditions">
				<div className="panel-instructions">
					<p>Welcome to Protector Agent.</p>
					<p>We are now collecting applications from all agents.</p>
					<p>Please go through the forms and fill in your details.</p>
					<p>Once your application is submitted, we will contact you for interview.</p>
				</div>
				<div className="panel-accept-terms-and-conditions">
					<p>By selecting proceed, I'm agreeing to the terms and conditions.</p>
					<button onClick={this.handleAccept}>Proceed</button>
				</div>
			</div>
		)
	}
}

export default AgentTermsAndConditions;

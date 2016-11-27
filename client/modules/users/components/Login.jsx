import React from 'react';
import ReactDOM from 'react-dom';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';

class Login extends React.Component {
	componentDidMount() {
		// Use Meteor Blaze to render login buttons
		this.view = Blaze.render(Template.loginButtons,
			ReactDOM.findDOMNode(this.refs.container));
	}
	componentWillUnmount() {
		// Clean up Blaze view
		Blaze.remove(this.view);
	}
	render() {
		// Just render a placeholder container that will be filled in
		return (
			<div id="login-body-container">
				<div id="login-body">
					<div id="logo-container">
						<img id="login-logo" src="/images/Protect_Logo.png" alt="" />
					</div>

					<div id="fb-login-container">
						<span ref="container" />
					</div>
					<div id="by-signing-container">
						<p className="login-sign-text">BY SIGNING UP YOU AGREE WITH OUR TERMS AND CONDITIONS.</p>
					</div>

					<div id="copyright-container">
						<p className="login-copyright-text">COPYRIGHT 2016 © PROTECTOR ALL RIGHTS RESERVED.</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;

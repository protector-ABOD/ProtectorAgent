import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
	/*componentDidMount() {
		// Use Meteor Blaze to render login buttons
		this.view = Blaze.render(Template.loginButtons,
			ReactDOM.findDOMNode(this.refs.container));
	}
	componentWillUnmount() {
		// Clean up Blaze view
		Blaze.remove(this.view);
	}*/
	constructor(props, context) {
		super(props, context);

		this.state = {
			selectedTab: 'login'
		};
    }
	render() {
		const {error} = this.props;
	
		// Just render a placeholder container that will be filled in
		return (
			<div className="login-body-container align-middle">
				<div className="row pad-top-percent-5">
					<div className="col-xs-12">
						<img id="login-logo" src="/images/Protect_Logo.png" alt="" />
					</div>
				</div>
				<div className="row pad-top-percent-5">
					<div className="col-xs-12">
						<div className={this.state.selectedTab === 'login' ? 'pad-all-20 col-xs-offset-2 col-xs-4 col-md-offset-5 col-md-1 active-tab cursor-pointer' : 'pad-all-20 col-xs-offset-2 col-xs-4 col-md-offset-5 col-md-1 cursor-pointer'}
							 onClick={this.handleTabChange.bind(this, 'login')}>
							<span>Log In</span>
						</div>
						<div className={this.state.selectedTab === 'signup' ? 'pad-all-20 col-xs-4 col-md-1 active-tab cursor-pointer' : 'pad-all-20 col-xs-4 col-md-1 cursor-pointer'}
							 onClick={this.handleTabChange.bind(this, 'signup')}>
							<span>Sign Up</span>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 pad-all-20">
						<div className="col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2">
							{error ? <span className="text-error">{error}</span> : <span>&nbsp;</span>}
						</div>
						<div className={this.state.selectedTab === 'login' ? 'col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2 active-form' : 'inactive-form'}>
							<form onSubmit={this.loginUser.bind(this)}>
								<div className="row pad-top-fixed-15">
									<input type="text" className="form-control" id="loginEmail" ref="loginEmail" placeholder="Email"/>
								</div>
								<div className="row pad-top-fixed-15">
									<input type="password" className="form-control" id="loginPassword" ref="loginPassword" placeholder="Password"/>
								</div>
								<div className="row pad-top-fixed-15">
									<button type="submit" className="btn btn-success btn-100">Log In</button>
								</div>
							</form>
						</div>
						<div className={this.state.selectedTab === 'signup' ? 'col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2 active-form' : 'inactive-form'}>
							<form onSubmit={this.createNewUser.bind(this)}>
								<div className="row pad-top-fixed-15">
									<input type="text" className="form-control" id="signupEmail" ref="signupEmail" placeholder="Email"/>
								</div>
								<div className="row pad-top-fixed-15">
									<input type="password" className="form-control" id="signupPassword" ref="signupPassword" placeholder="Password"/>
								</div>
								<div className="row pad-top-fixed-15">
									<button type="submit" className="btn btn-success btn-100">Sign Up</button>
								</div>
							</form>
						</div>
						<div className="pad-top-fixed-15 col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2">
							<button className="btn btn-primary btn-100" onClick={this.loginWithFacebook.bind(this)}>Login with Facebook</button>
						</div>
					</div>
				</div>
				<div className="row pad-top-fixed-15">
					<div className="col-xs-12">
						<p className="login-sign-text">BY SIGNING UP YOU AGREE WITH OUR TERMS AND CONDITIONS.</p>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<p className="login-copyright-text">COPYRIGHT 2016 © PROTECTOR ALL RIGHTS RESERVED.</p>
					</div>
				</div>
			</div>
		)
	}
	handleTabChange(value, event) {
		const {clearErrors} = this.props;
		
	    this.setState({selectedTab : value});
		
		clearErrors();
	}
    loginUser(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		//get action
		const {loginUser} = this.props;
		
		//get all data
		const {loginEmail, loginPassword} = this.refs;
		
		//validation for login email
		let isError = false;
		const loginEmailClassName = loginEmail.className;
		if (loginEmail.value.trim() === "") {
			if (!loginEmailClassName.includes("input-error"))
			{
				loginEmail.className = loginEmailClassName + " input-error";
			}
			isError = true;
		}
		else {
			if (loginEmailClassName.includes("input-error"))
			{
				loginEmail.className = loginEmailClassName.replace(" input-error", "");
			}
		}
		
		//validation for login password
		const loginPasswordClassName = loginPassword.className;
		if (loginPassword.value.trim() === "") {
			if (!loginPasswordClassName.includes("input-error"))
			{
				loginPassword.className = loginPasswordClassName + " input-error";
			}
			isError = true;
		}
		else {
			if (loginPasswordClassName.includes("input-error"))
			{
				loginPassword.className = loginPasswordClassName.replace(" input-error", "");
			}
		}
		
		if (isError) {
			return;
		}
		
		//call action
		loginUser(loginEmail.value, loginPassword.value);
    }
    createNewUser(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		//get action
		const {createNewUser} = this.props;
		
		//get all data
		const {signupEmail, signupPassword} = this.refs;
		
		//validation for sign up email
		let isError = false;
		const signupEmailClassName = signupEmail.className;
		if (signupEmail.value.trim() === "") {
			if (!signupEmailClassName.includes("input-error"))
			{
				signupEmail.className = signupEmailClassName + " input-error";
			}
			isError = true;
		}
		else {
			if (signupEmailClassName.includes("input-error"))
			{
				signupEmail.className = signupEmailClassName.replace(" input-error", "");
			}
		}
		
		//validation for sign up password
		const signupPasswordClassName = signupPassword.className;
		if (signupPassword.value.trim() === "") {
			if (!signupPasswordClassName.includes("input-error"))
			{
				signupPassword.className = signupPasswordClassName + " input-error";
			}
			isError = true;
		}
		else {
			if (signupPasswordClassName.includes("input-error"))
			{
				signupPassword.className = signupPasswordClassName.replace(" input-error", "");
			}
		}
		
		if (isError) {
			return;
		}
		
		//call action
		createNewUser(signupEmail.value, signupPassword.value);
    }
    loginWithFacebook(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		//get action
		const {loginWithFacebook} = this.props;
		
		//call action
		loginWithFacebook();
    }
}

export default Login;

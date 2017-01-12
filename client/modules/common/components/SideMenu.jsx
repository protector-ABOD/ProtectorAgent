import React from 'react';
var Menu = require('react-burger-menu').slide;

const sideMenuStyle = {
  cursor: 'pointer'
};

const profileLineStyle = {
  'padding-top': '15px'
};

class SideMenu extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	navigateTo (path) {
		FlowRouter.go("/agent/" + path);
	}
	render() {
		const {agent} = this.props;
		let elementToRender;

		if (agent) {
			elementToRender = 	<Menu isOpen={ this.props.isOpen } customBurgerIcon={ false } customCrossIcon={ false }>
									<div className="portrait-container">
										<img className="menu-portrait" src="http://lorempixel.com/200/200" />
										<span>{agent.FullName}</span>
									</div>
									<a id="home" className="menu-item" href="/" onClick={() => this.navigateTo("home")}><i className="fa fa-home fa-fw" /><span>Home</span></a>
									<a id="profile" className="menu-item" href="/" onClick={() => this.navigateTo("profile")}><i className="fa fa-user fa-fw" /><span>Profile</span></a>
									<a id="history" className="menu-item" href="/" onClick={() => this.navigateTo("job-history")}><i className="fa fa fa-clock-o fa-fw" /><span>History</span></a>
									<a id="signout" className="menu-item" href="/"><i className="fa fa-sign-out fa-fw" /><span>Sign Out</span></a>
								</Menu>
		}
		else {
			elementToRender = 	<Menu isOpen={ this.props.isOpen } pageWrapId={ "page-wrap"} outerContainerId={ "outer-container" } customBurgerIcon={ false } customCrossIcon={ false }>
									<a id="signout" className="menu-item" href="/"><i className="fa fa-sign-out" /><span>Sign Out</span></a>
								</Menu>
		}
		
		return elementToRender;
	}
}




export default SideMenu;

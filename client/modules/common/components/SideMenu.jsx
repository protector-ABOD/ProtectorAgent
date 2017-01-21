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
	navigateTo (event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		const {onStateChange} = this.props;
		onStateChange({isSideMenuOpen : false});
	}
	render() {
		const {agent} = this.props;
		let elementToRender;

		if (agent) {
			elementToRender = 	<Menu isOpen={ this.props.isOpen } customBurgerIcon={ false } customCrossIcon={ false } onStateChange={(state) => this.props.onStateChange(state)}>
									<div className="portrait-container">
										<img className="menu-portrait" src="/images/profile-image-placeholder.png" />
										<span>{agent.FullName}</span>
									</div>
									<a id="home" className="menu-item" href={FlowRouter.path("/agent/home")} onClick={(event) => this.navigateTo(event)}><i className="fa fa-home fa-fw" /><span>Home</span></a>
									<a id="profile" className="menu-item" href={FlowRouter.path("/agent/profile")} onClick={(event) => this.navigateTo(event)}><i className="fa fa-user fa-fw" /><span>Profile</span></a>
									<a id="history" className="menu-item" href={FlowRouter.path("/agent/job-history")} onClick={(event) => this.navigateTo(event)}><i className="fa fa fa-clock-o fa-fw" /><span>History</span></a>
									<a id="signout" className="menu-item" href="/logout"><i className="fa fa-sign-out fa-fw" /><span>Sign Out</span></a>
								</Menu>
		}
		else {
			elementToRender = 	<Menu isOpen={ this.props.isOpen } pageWrapId={ "page-wrap"} outerContainerId={ "outer-container" } customBurgerIcon={ false } customCrossIcon={ false }>
									<a id="signout" className="menu-item" href="/logout"><i className="fa fa-sign-out fa-fw" /><span>Sign Out</span></a>
								</Menu>
		}
		
		return elementToRender;
	}
}




export default SideMenu;

import React from 'react';
import SideMenu from '../../common/containers/SideMenu.js' ;

var Menu = require('react-burger-menu').push;

const sideMenuStyle = {
  cursor: 'pointer'
};

const profileLineStyle = {
  'padding-top': '15px'
};

class Layout extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = { isSideMenuOpen: false }

	}
	handleClickSideMenu(state){
		// console.log(this.state.isSideMenuOpen);
		if (!this.state.isSideMenuOpen) {
			this.setState({isSideMenuOpen: true});
		} else {
			this.setState({isSideMenuOpen: false});
		}
	}
	componentWillReceiveProps(nextProps) {
		//close side menu when page changes.
	    this.setState({isSideMenuOpen: false});
	}
	render() {
		return (
			<div>
				<img src="/images/profile_line.jpg" id="profile-line" alt=""/>
				<SideMenu isOpen={this.state.isSideMenuOpen} />
				<div>
					<div id="profile-nav">
						<img id="profile_nav_img3" src="/images/profile_menu.png" onClick={this.handleClickSideMenu.bind(this)} style={sideMenuStyle}/>
						<img id="profile_nav_img2" src="/images/profile_logo.png" />
					</div>
					<div className="main-container">
						{this.props.content()}
					</div>
				</div>
		  </div>
		)
	}
}

export default Layout;

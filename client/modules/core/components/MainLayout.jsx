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
	handleClickSideMenu(){
		if (!this.state.isSideMenuOpen) {
			this.setState({isSideMenuOpen: true});
		} else {
			this.setState({isSideMenuOpen: false});
		}
	}
	onStateChange(state){
		if (this.state.isSideMenuOpen !== state.isSideMenuOpen) {
			this.setState({isSideMenuOpen: state.isSideMenuOpen});
		}
	}
	render() {
		return (
			<div>
				<img src="/images/profile_line.jpg" id="profile-line" alt=""/>
				<SideMenu isOpen={this.state.isSideMenuOpen} onStateChange={(state) => this.onStateChange(state)} />
				<div>
					<div id="profile-nav">
						<img id="profile_nav_img3" src="/images/profile_menu.png" onClick={() => this.handleClickSideMenu()} style={sideMenuStyle}/>
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

import React from 'react';

const Layout = ({content = () => null }) => (
	<div>
		<img src="/images/profile_line.jpg" id="profile-line" alt=""/>

		<div id="profile-nav">

		<img id="profile_nav_img1" src="/images/profile_edit.png"/>

		<img id="profile_nav_img2" src="/images/profile_logo.png" />

		<img id="profile_nav_img3" src="/images/profile_menu.png" />

		</div>
	  <div className="main-container">
		
		{content()}
	  </div>
    </div>
);

export default Layout;

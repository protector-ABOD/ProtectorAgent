import React from 'react';

const LoginLayout = ({content = () => null }) => (
  <div className="main-container-background">
	  <div className="main-container">
		{content()}
	  </div>
  </div>
);

export default LoginLayout;

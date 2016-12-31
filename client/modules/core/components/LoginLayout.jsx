import React from 'react';

const LoginLayout = ({content = () => null }) => (
  <div className="main-container">
	
	{content()}
  </div>
);

export default LoginLayout;

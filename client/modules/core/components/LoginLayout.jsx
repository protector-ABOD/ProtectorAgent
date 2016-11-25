import React from 'react';

const LoginLayout = ({content = () => null }) => (
  <div>
  	{content()}
  </div>
);

export default LoginLayout;

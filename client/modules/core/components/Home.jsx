import React from 'react';

const Home = ({content = () => null }) => (
  <div>
  	{content()}
  </div>
);

export default Home;

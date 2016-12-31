import React from 'react';
import ComponentAgentCancellation from '../components/ComponentAgentCancellation.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

const loadingScreen = () => (<div className="loading-panel">Loading...</div>);

export default composeAll(
  composeWithTracker(composer, loadingScreen),
  useDeps(depsMapper)
)(ComponentAgentCancellation);

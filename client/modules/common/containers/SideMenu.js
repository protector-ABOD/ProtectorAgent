import React from 'react';
import SideMenu from '../components/SideMenu.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('agents.single', Meteor.userId()).ready()) {
    const agent = Collections.Agents.findOne({UserID: Meteor.userId()});
    onData(null, {agent});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

const loadingScreen = () => (<div></div>);

export default composeAll(
  composeWithTracker(composer, loadingScreen),
  useDeps(depsMapper)
)(SideMenu);

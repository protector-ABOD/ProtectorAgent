export default {
  createAgent({Meteor, FlowRouter}, agent) {
	  /*if (!title || !content) {
        return LocalState.set('SAVING_ERROR', 'Title & Content are required!');
      }*/

      //LocalState.set('SAVING_ERROR', null);

    //const id = Meteor.uuid();
    // There is a method stub for this in the config/method_stubs
    // That's how we are doing latency compensation
    Meteor.call('agents.create', agent, Meteor.userId(), (err) => {
      if (err) {
		console.log("error");
        //return LocalState.set('SAVING_ERROR', err.message);
      }
    });

    FlowRouter.go('/agent/home');
  }
};
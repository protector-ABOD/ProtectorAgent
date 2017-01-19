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
  },
  saveAgentSchedule({Meteor}, scheduleDates) {
	  
	if (scheduleDates.length === 0) {
		alert('Saved successfully.', null, "Information", "Ok");
		return;
	}
	
	let scheduleDatesToSave = [];

	for (var i = 0; i < scheduleDates.length; i++) {
		if (scheduleDates[i].RowState === "Added" || scheduleDates[i].RowState === "Modified") {
			var dateParts = scheduleDates[i].Date.split('/');
			
			//new Date - month is 0 indexed, hence -1
			var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); 

			scheduleDatesToSave.push({
				Date : date,
				Availability : scheduleDates[i].Availability,
				RowState : scheduleDates[i].RowState
			});
		}
	}
	
	if (scheduleDatesToSave.length === 0) {
		alert('Saved successfully.', null, "Information", "Ok");
		return;
	}
	  
    Meteor.call('agents.schedule.save', scheduleDatesToSave, Meteor.userId(), (err) => {
      if (err) {
		console.log("error");
        //return LocalState.set('SAVING_ERROR', err.message);
      }
	  else {
		alert('Saved successfully.', null, "Information", "Ok");
	  }
    });
  },
  completeRequest({Meteor}, request) {
    Meteor.call('serviceRequest.complete', request, Meteor.userId(), (err) => {
      if (err) {
		console.log("error");
        //return LocalState.set('SAVING_ERROR', err.message);
      }
	  else {
		alert('Request has been completed.', null, "Information", "Ok");
	  }
    });
  },
  acceptRequest({Meteor}, request) {
    Meteor.call('serviceRequest.accept', request._id, Meteor.userId(), (err) => {
      if (err) {
		console.log("error");
        //return LocalState.set('SAVING_ERROR', err.message);
      }
	  else {
		alert('Your have accepted the request.', null, "Information", "Ok");
	  }
    });
  },
  rejectRequest({Meteor}, request) {
    Meteor.call('serviceRequest.reject', request._id, Meteor.userId(), (err) => {
      if (err) {
		console.log("error");
        //return LocalState.set('SAVING_ERROR', err.message);
      }
	  else {
		alert('You have rejected the request.', null, "Information", "Ok");
	  }
    });
  },
  getAgentRating({Meteor, LocalState}) {
    Meteor.call('serviceRequest.AgentRating', (err, response) => {
      if (err) {
		console.log("error");
        //return LocalState.set('SAVING_ERROR', err.message);
      }
	  else {
		  if (response.length > 0) {
		      return LocalState.set('AgentRating', response[0].averageRating);
		  }
		  else {
		      return LocalState.set('AgentRating', 5);
		  }
	  }
    });
  },
  getServiceRequestAcceptedCount({Meteor, LocalState}) {
    Meteor.call('serviceRequest.ServiceRequestAcceptedCount', (err, response) => {
      if (err) {
		console.log("error");
        //return LocalState.set('SAVING_ERROR', err.message);
      }
	  else {
		  if (response.length > 0) {
		      return LocalState.set('AcceptedCount', response[0].acceptedCount);
		  }
		  else {
		      return LocalState.set('AcceptedCount', 0);
		  }
	  }
    });
  },
  getServiceRequestTotalCount({Meteor, LocalState}) {
    Meteor.call('serviceRequest.ServiceRequestTotalCount', (err, response) => {
      if (err) {
		console.log("error");
        //return LocalState.set('SAVING_ERROR', err.message);
      }
	  else {
		return LocalState.set('TotalCount', response);
	  }
    });
  }
};
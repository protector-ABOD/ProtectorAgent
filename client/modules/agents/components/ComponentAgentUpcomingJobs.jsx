import React from 'react';

class ComponentAgentUpcomingJobs extends React.Component {
	render() {
		const {NoOfUpcomingJobs, SumofUpcomingJobsPayment} = this.props;
		
		return (
			<div className="agent-upcoming-job-container">
				<span className="font-bold">{NoOfUpcomingJobs && NoOfUpcomingJobs > 0 ? NoOfUpcomingJobs : "No"} Upcoming Jobs</span>
				<span className="float-right font-bold">Total : RM {SumofUpcomingJobsPayment ? SumofUpcomingJobsPayment : 0}</span>
			</div>
		);
	}
}

export default ComponentAgentUpcomingJobs;

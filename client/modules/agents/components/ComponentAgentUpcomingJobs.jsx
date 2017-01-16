import React from 'react';

class ComponentAgentUpcomingJobs extends React.Component {
	render() {
		const {NoOfUpcomingJobs, SumofUpcomingJobsPayment} = this.props;
		
		return (
			<div className="agent-upcoming-job-container">
				<span className="font-bold">
					{NoOfUpcomingJobs === 0 
						? "No Upcoming Jobs"
						: (NoOfUpcomingJobs === 1
							  ? "1 Upcoming Job"
							  : NoOfUpcomingJobs + " Upcoming Jobs"
						  )
					}
				</span>
				<span className="float-right font-bold">Total : RM {SumofUpcomingJobsPayment ? SumofUpcomingJobsPayment : 0}</span>
			</div>
		);
	}
}

export default ComponentAgentUpcomingJobs;

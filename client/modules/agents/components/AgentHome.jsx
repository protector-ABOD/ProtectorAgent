import React from 'react';
import ComponentAgentCalendar from './ComponentAgentCalendar.jsx';
import ComponentAgentRequests from './ComponentAgentRequests.jsx';
import ComponentAgentUpcomingJobs from './ComponentAgentUpcomingJobs.jsx';
import ComponentAgentAcceptance from './ComponentAgentAcceptance.jsx';
import ComponentAgentRating from './ComponentAgentRating.jsx';
import ComponentAgentCancellation from './ComponentAgentCancellation.jsx';

class AgentHome extends React.Component {
	saveSchedule(scheduleDates) {
		const {saveAgentSchedule} = this.props;
		saveAgentSchedule(scheduleDates);
	}
	completeRequest(request) {
		const {completeRequest} = this.props;
		completeRequest(request);
	}
	acceptRequest(request) {
		const {acceptRequest} = this.props;
		acceptRequest(request);
	}
	rejectRequest(request) {
		const {rejectRequest} = this.props;
		rejectRequest(request);
	}
	render() {
		
		const {agents, serviceRequestsAccepted, serviceRequestsPending, agentRating, acceptedCount, totalCount} = this.props;
		
		let noOfJobs = 0;
		let sumOfJobPrice = 0;
		
		if (typeof serviceRequestsAccepted != 'undefined' && serviceRequestsAccepted != null ) {
			noOfJobs = serviceRequestsAccepted.length;
			
			for (var i = 0; i < serviceRequestsAccepted.length; i++) {
				sumOfJobPrice += parseInt(serviceRequestsAccepted[i].Service_Request.Service_Total_Price);
			}
		}
			
		let acceptedPercentage;
		let rejectedPercentage;
		
		if (typeof totalCount != 'undefined' && totalCount != null) {
			
			if (totalCount === 0) {
				acceptedPercentage = 100;
				rejectedPercentage = 0;
			}
			else {
				if (!acceptedCount || acceptedCount === 0) {
					acceptedPercentage = 0;
					rejectedPercentage = 100;
				}
				else {
					acceptedPercentage = acceptedCount / totalCount * 100;
					rejectedPercentage = 100 - acceptedPercentage;
				}
			}
		}
		else {
			acceptedPercentage = null;
			rejectedPercentage = null;
		}
		
		return (
			<div className="agent-home pad-top-percent-10">
				<div className="row home-calendar-container">
					<div className="col-xs-12">
						<ComponentAgentCalendar 
							OnSave={(dates) => this.saveSchedule(dates)} 
							ScheduleDates={agents ? agents.Schedule : []} 
							ServiceRequestsAccepted={serviceRequestsAccepted ? serviceRequestsAccepted : []}/>
					</div>
				</div>
				<div className="bottom-bar">
					<div className="row pad-btm-15">
						<div className="col-xs-12 no-pad back-dark-green">
							<ComponentAgentRequests
								ServiceRequestsPending={serviceRequestsPending}
								OnAcceptRequest={(request) => this.acceptRequest(request)}
								OnRejectRequest={(request) => this.rejectRequest(request)}   />
						</div>
					</div>
					<div className="row pad-btm-15">
						<div className="col-xs-12">
							<ComponentAgentUpcomingJobs
								NoOfUpcomingJobs={noOfJobs}
								SumofUpcomingJobsPayment={sumOfJobPrice} />
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<div className="horizontal-line"></div>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<div className="col-xs-4 no-pad">
								<ComponentAgentAcceptance
									Value={acceptedPercentage}/>
							</div>
							<div className="col-xs-4 no-pad">
								<ComponentAgentRating
									Value={agentRating}/>
							</div>
							<div className="col-xs-4 no-pad">
								<ComponentAgentCancellation
									Value={rejectedPercentage}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
}

export default AgentHome;

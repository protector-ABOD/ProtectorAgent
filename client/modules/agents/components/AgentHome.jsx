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
	render() {
		const {agents} = this.props;
		
		return (
			<div className="agent-home pad-top-percent-10">
				<div className="row">
					<div className="col-xs-12">
						<ComponentAgentCalendar 
							onSave={(dates) => this.saveSchedule(dates)} 
							scheduleDates={agents ? agents.Schedule : []}/>
					</div>
				</div>
				<div className="bottom-bar">
					<div className="row pad-btm-15">
						<div className="col-xs-12 no-pad pad-btm-15">
							<ComponentAgentRequests
								NoOfRequests="2" />
						</div>
					</div>
					<div className="row pad-btm-15">
						<div className="col-xs-12">
							<ComponentAgentUpcomingJobs
								NoOfUpcomingJobs="0"
								SumofUpcomingJobsPayment="0" />
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
									Value="96.5"/>
							</div>
							<div className="col-xs-4 no-pad">
								<ComponentAgentRating
									Value="5.00"/>
							</div>
							<div className="col-xs-4 no-pad">
								<ComponentAgentCancellation
									Value="3.5"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
}

export default AgentHome;

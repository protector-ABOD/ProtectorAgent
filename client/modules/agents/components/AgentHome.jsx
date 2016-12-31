import React from 'react';
import ReactDOM from 'react-dom';
import ComponentAgentCalendar from './ComponentAgentCalendar.jsx';
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
						<div className="col-xs-12">
							<div className="horizontal-line"></div>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<div className="col-xs-4 no-pad">
								<ComponentAgentAcceptance
									Value="97.5"/>
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

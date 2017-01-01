import React from 'react';

class ComponentAgentRequests extends React.Component {
	render() {
		const {NoOfRequests} = this.props;
		
		return (
			<div className="agent-requests-container align-middle back-dark-green pad-top-bottom-fixed-15">
				<span className="font-bold">Requests ({NoOfRequests ? NoOfRequests : 0})</span>
			</div>
		);
	}
}

export default ComponentAgentRequests;

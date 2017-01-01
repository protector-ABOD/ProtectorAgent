import React from 'react';

class ComponentAgentAcceptance extends React.Component {
	render() {
		const {Value} = this.props;
		
		return (
			<div className="agent-acceptance-container align-middle">
				<div className="pad-top-bottom-fixed-5">
					<i className="fa fa-check-circle fa-lg vertical-align-middle">
					</i>
					<span className="pad-left-fixed-10 font-blue font-big font-bold vertical-align-middle">
						{Value ? Value + "%" : "100%"}
					</span>
				</div>
				<div className="pad-top-bottom-fixed-5">
					<span className="font-small font-light-blue">
						Acceptance
					</span>
				</div>
			</div>
		);
	}
}

export default ComponentAgentAcceptance;

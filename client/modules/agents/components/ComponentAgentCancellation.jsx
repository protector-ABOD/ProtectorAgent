import React from 'react';

class ComponentAgentCancellation extends React.Component {
	render() {
		const {Value} = this.props;
		
		return (
			<div className="agent-cancellation-container align-middle">
				<div className="pad-top-bottom-fixed-5">
					<i className="fa fa-times-circle fa-lg vertical-align-middle">
					</i>
					<span className="pad-left-fixed-10 font-blue font-big font-bold vertical-align-middle">
						{Value ? Value + "%" : "0%"}
					</span>
				</div>
				<div className="pad-top-bottom-fixed-5">
					<span className="font-small font-light-blue">
						Cancellation
					</span>
				</div>
			</div>
		);
	}
}

export default ComponentAgentCancellation;

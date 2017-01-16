import React from 'react';

class ComponentAgentRating extends React.Component {
	render() {
		const {Value} = this.props;
		
		return (
			<div className="agent-rating-container align-middle">
				<div className="pad-top-bottom-fixed-5">
					<i className="fa fa-star fa-lg vertical-align-middle">
					</i>
					<span className="pad-left-fixed-10 font-blue font-big font-bold vertical-align-middle">
						{Value != null ? parseFloat(Math.round(Value * 100) / 100).toFixed(2) : "-"}
					</span>
				</div>
				<div className="pad-top-bottom-fixed-5">
					<span className="font-small font-light-blue">
						Rating
					</span>
				</div>
			</div>
		);
	}
}

export default ComponentAgentRating;

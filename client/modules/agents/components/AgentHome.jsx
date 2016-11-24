import React from 'react';
import ReactDOM from 'react-dom';

class AgentHome extends React.Component {
	render() {
		const {agents} = this.props;
		return (
			<div>
				<p>Welcome, {agents ? agents.FullName : ''}</p>
				<p>We have received your application. We will notify you when we have reviewed it.</p>
			</div>
		);
	}
}

export default AgentHome;

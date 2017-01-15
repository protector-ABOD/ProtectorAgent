import React from 'react';

class AgentProfile extends React.Component {
	render() {
		const {agent} = this.props;
		
		return (
			<div className="agent-profile">
				<div className="row pad-btm-15">
					<div className="col-xs-12 back-dark-green section-header">
						<span className="font-bold">Agent Profile</span> 
					</div>
				</div>
				<div className="row pad-btm-15">
					<div className="col-xs-4">
						<img className="profile-portrait" src="/images/profile-image-placeholder.png" />
					</div>
					<div className="col-xs-8">
						<div className="row pad-btm-15">
							<div className="col-xs-12">
								{agent.FullName}
							</div>
						</div>
						<div className="row pad-btm-15">
							<div className="col-xs-12">
								{agent.DateofBirth}
							</div>
						</div>
						<div className="row pad-btm-15">
							<div className="col-xs-12">
								{agent.Weight} kg
							</div>
						</div>
						<div className="row pad-btm-15">
							<div className="col-xs-12">
								{agent.Height} cm
							</div>
						</div>
					</div>
				</div>
				<div className="row pad-btm-15">
					<div className="col-xs-12 back-dark-green section-header">
						<span className="font-bold">Skill Sets</span> 
					</div>
				</div>
				{agent.Skills.map(skill => (
					<div key={skill.SkillID} className="row pad-btm-15">
						<div className="col-xs-12">
							{skill.SkillName}
						</div>
					</div>
				))}
			</div>
		)
	}
}

export default AgentProfile;

import React from 'react';
import PopupServiceRequest from './PopupServiceRequest.jsx';

function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}
//or as a Number prototype method:
Number.prototype.padLeft = function (n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
}

class AgentJobHistory extends React.Component {
	constructor(props, context) {
		super(props, context);
		
		this.state = {
			isModalOpen: false,
			serviceRequest: null,
			rating: 5
		};
    }
	openModal(serviceRequest) {
		let rating = 5;
		
		if (serviceRequest.Service_Request_Status === "Completed") {
			rating = serviceRequest.Rating_By_Agent;
		}
		
		this.setState({ isModalOpen: true, serviceRequest : serviceRequest, rating: rating });
	}
	closeModal() {
		this.setState({ isModalOpen: false, serviceRequest : null });
	}
	onServiceRequestClick(event, serviceRequest) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		if (!this.state.isModalOpen) {
			this.openModal(serviceRequest);
		}
	}
	onRatingClick(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		let rating = parseInt(event.target.getAttribute('data-value'));
		this.setState({ rating: rating });
	}
	completeRequest() {
		const {completeRequest} = this.props;
		
		const {comment} = this.refs;
		const rating = this.state.rating;
		
		let serviceRequest = {};
		
		serviceRequest._id = this.state.serviceRequest._id;
		serviceRequest.Comment_By_Agent = comment.value;
		serviceRequest.Rating_By_Agent = rating;
		
		completeRequest(serviceRequest);
		
		this.setState({ isModalOpen: false, serviceRequest: null, rating : 5 });
	}
	acceptRequest() {
		const {acceptRequest} = this.props;
		acceptRequest(this.state.serviceRequest);
		this.setState({ isModalOpen: false, serviceRequest: null });
	}
	rejectRequest() {
		const {rejectRequest} = this.props;
		rejectRequest(this.state.serviceRequest);
		this.setState({ isModalOpen: false, serviceRequest: null });
	}
	render() {
		const {serviceRequests} = this.props;
		
		let selectedRequest;
		let startDate;
		let createdDate;

		if (this.state.serviceRequest) {
			selectedRequest = this.state.serviceRequest;
			startDate = new Date(selectedRequest.Service_Request.Service_Start_Time);
			createdDate = new Date(selectedRequest.Created_DateTime);
		}
		
		return (
			<div className="agent-job-history">
				{(serviceRequests.length == 0) ?
					<div>
						<div className="row">
							<div className="col-xs-12 align-middle">
								No job history
							</div>
						</div>
					</div>
					:
					<div>
						{serviceRequests.map(function(serviceRequest) {
							const startDate = new Date(serviceRequest.Service_Request.Service_Start_Time);
							return (
								<div key={serviceRequest._id._str}>
									<div className="row" onClick={(event) => this.onServiceRequestClick(event, serviceRequest)}>
										<div className="col-xs-12">
											<div className="row pad-btm-15">
												<div className="col-xs-8">
													{padLeft(startDate.getDate(), 2) 
													 + "/" 
													 + padLeft(startDate.getMonth() + 1, 2) 
													 + "/" 
													 + startDate.getFullYear()
													 + " ["
													 + padLeft(startDate.getHours(), 2)
													 + ":"
													 + padLeft(startDate.getMinutes(), 2)
													 + " - "
													 + padLeft((startDate.getHours() + parseInt(serviceRequest.Service_Request.Service_Duration_Value)) % 24, 2)
													 + ":"
													 + padLeft(startDate.getMinutes(), 2)
													 + "]"
													}
												</div>
												<div className="col-xs-4 align-right">
													{serviceRequest.Service_Request.Service_Type_Description}
												</div>
											</div>
											<div className="row pad-btm-15">
												<div className="col-xs-8">
													{serviceRequest.User.NRIC}
												</div>
												<div className="col-xs-4 align-right">
												</div>
											</div>
											<div className="row pad-btm-15">
												<div className="col-xs-8">
													{serviceRequest.User.Full_Name}
												</div>
												<div className="col-xs-4 align-right">
												</div>
											</div>
											<div className="row pad-btm-15">
												<div className="col-xs-8">
													{serviceRequest.Service_Request.Service_State_Description}
												</div>
												<div className="col-xs-4 align-right">
													<span className={serviceRequest.Service_Request_Status === "Completed" ? "font-light-green" : "font-light-blue"}>{serviceRequest.Service_Request_Status}</span>
												</div>
											</div>
										</div>
									</div>
									<div className="row pad-btm-15">
										<div className="col-xs-12">
											<div className="horizontal-line"></div>
										</div>
									</div>
								</div>
							)
						}, this)}
					</div>
				}
				<PopupServiceRequest 
					serviceRequest={selectedRequest ? selectedRequest : null}
					isOpen={this.state.isModalOpen} 
					onClose={() => this.closeModal()}
					onCompleteRequest={() => this.completeRequest()}
					onAcceptRequest={() => this.acceptRequest()}
					onRejectRequest={() => this.rejectRequest()}>
						{selectedRequest ?
							<div>
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										{selectedRequest.User.Full_Name}
									</div>
								</div>
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										{selectedRequest.User.Gender}
									</div>
								</div>
								{this.state.serviceRequest.Service_Request_Status === "Completed" 
									?
										<div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													<div className="rating-star">
														<i className={this.state.rating > 0 ? "fa fa-star fw" : "fa fa-star-o fw"}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 1 ? "fa fa-star fw" : "fa fa-star-o fw"}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 2 ? "fa fa-star fw" : "fa fa-star-o fw"}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 3 ? "fa fa-star fw" : "fa fa-star-o fw"}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 4 ? "fa fa-star fw" : "fa fa-star-o fw"}></i>
													</div>
												</div>
											</div>
										</div>
									:
									null
								}
								{this.state.serviceRequest.Service_Request_Status === "Accepted" 
									?
										<div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													<div className="rating-star">
														<i className={this.state.rating > 0 ? "fa fa-star fw" : "fa fa-star-o fw"} data-value="1" onClick={(event) => this.onRatingClick(event)}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 1 ? "fa fa-star fw" : "fa fa-star-o fw"} data-value="2" onClick={(event) => this.onRatingClick(event)}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 2 ? "fa fa-star fw" : "fa fa-star-o fw"} data-value="3" onClick={(event) => this.onRatingClick(event)}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 3 ? "fa fa-star fw" : "fa fa-star-o fw"} data-value="4" onClick={(event) => this.onRatingClick(event)}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 4 ? "fa fa-star fw" : "fa fa-star-o fw"} data-value="5" onClick={(event) => this.onRatingClick(event)}></i>
													</div>
												</div>
											</div>
										</div>
									:
									null
								}
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										{selectedRequest.Service_Request.Service_Type_Description}
									</div>
								</div>
								<div className="row pad-btm-15">
									<div className="col-xs-8">
										{padLeft(startDate.getDate(), 2) 
										 + "/" 
										 + padLeft(startDate.getMonth() + 1, 2) 
										 + "/" 
										 + startDate.getFullYear()
										 + " "
										 + padLeft(startDate.getHours(), 2)
										 + ":"
										 + padLeft(startDate.getMinutes(), 2)
										}
									</div>
									<div className="col-xs-4 align-right">
										{selectedRequest.Service_Request.Service_Duration_Value} Hours
									</div>
								</div>
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										{selectedRequest.Service_Request.Service_State_Description}
									</div>
								</div>
								{this.state.serviceRequest.Service_Request_Status === "Completed"
									?
										<div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													Comment
												</div>
											</div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													<textarea className="form-control" value={selectedRequest.Comment_By_Agent} readOnly={true} />
												</div>
											</div>
										</div>
									:
									null
								}
								{this.state.serviceRequest.Service_Request_Status === "Accepted" 
									?
										<div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													Comment
												</div>
											</div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													<textarea ref="comment" className="form-control" />
												</div>
											</div>
										</div>
									:
									null
								}
								{this.state.serviceRequest.Service_Request_Status === "Pending"
									?
										<div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													Remarks
												</div>
											</div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													<textarea className="form-control" value={selectedRequest.Service_Remark} readOnly={true} />
												</div>
											</div>
										</div>
									:
									null
								}
							</div>
							:
							null
						}
				</PopupServiceRequest>
			</div>
		)
	}
}

export default AgentJobHistory;

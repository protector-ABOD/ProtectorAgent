import React from 'react';
import PopupModal from '/client/modules/common/components/PopupModal.jsx';

function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}
//or as a Number prototype method:
Number.prototype.padLeft = function (n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
}

function RequestRow(props) {
	const request = props.request;
	let startDate = new Date(request.Service_Request.Service_Start_Time);
	let createdDate = new Date(request.Created_DateTime);

	return (
		<div className="col-xs-12 font-bold">
			<div className="row no-margin">
				<div className="col-xs-12">
					<div className="horizontal-line"></div>
				</div>
			</div>
			<div className="row" onClick={() => props.onClick()} >
				<div className="col-xs-12 request-rows">
					<table className="table-service-request">
						<colgroup>
							<col span="1" width="65%" />
							<col span="1" width="35%" />
						</colgroup>
						<tbody>
							<tr>
								<td className="align-left">
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
								</td>
								<td className="align-right">
									{request.Service_Request.Service_Duration_Value} Hours
								</td>
							</tr>
							<tr>
								<td className="align-left">
									{request.Service_Request.Service_State_Description}
								</td>
								<td className="align-right">
									RM {request.Service_Request.Service_Type_Total_Price}
								</td>
							</tr>
							<tr>
								<td className="align-left">
									{request.Service_Request.Service_Type_Description}
								</td>
								<td className="align-right">
									{padLeft(createdDate.getHours(), 2)
									 + ":"
									 + padLeft(createdDate.getMinutes(), 2)
									}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

class ComponentAgentRequests extends React.Component {
	constructor(props, context) {
		super(props, context);
		
		this.state = {
			isExpanded: false,
			isModalOpen: false,
			selectedRequestIndex: -1
		};
    }
	expand() {
		this.setState({ isExpanded: true });
	}
	collapse() {
		this.setState({ isExpanded: false });
	}
	openModal(index) {
		this.setState({ isModalOpen: true, selectedRequestIndex : index });
	}
	closeModal() {
		this.setState({ isModalOpen: false, selectedRequestIndex: -1 });
	}
	acceptRequest() {
		const {ServiceRequestsPending} = this.props;
		this.props.OnAcceptRequest(ServiceRequestsPending[this.state.selectedRequestIndex]);
		this.setState({ isModalOpen: false, selectedRequestIndex: -1 });
	}
	rejectRequest() {
		const {ServiceRequestsPending} = this.props;
		this.props.OnRejectRequest(ServiceRequestsPending[this.state.selectedRequestIndex]);
		this.setState({ isModalOpen: false, selectedRequestIndex: -1 });
	}
	handleRequestClick(event, index) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		if (!this.state.isModalOpen) {
			this.openModal(index);
		}
	}
	handleExpandClick(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		if (!this.state.isExpanded) {
			this.expand();
		}
	}
	handleCollapseClick(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		if (this.state.isExpanded) {
			this.collapse();
		}
	}
	close(e) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}

		if (this.props.onClose) {
			this.props.onClose()
		}
	}
	render() {
		const {ServiceRequestsPending} = this.props;
		
		let selectedRequest;
		let startDate;
		let createdDate;

		if (this.state.selectedRequestIndex >= 0) {
			selectedRequest = ServiceRequestsPending[this.state.selectedRequestIndex];
			startDate = new Date(selectedRequest.Service_Request.Service_Start_Time);
			createdDate = new Date(selectedRequest.Created_DateTime);
		}

		return (
			<div className="agent-requests-container align-middle pad-top-bottom-fixed-15" onClick={this.handleExpandClick.bind(this)}>
				<div className="row">
					<div className="col-xs-12">
						<span className="font-bold">Requests ({ServiceRequestsPending ? ServiceRequestsPending.length : 0})</span>
						{this.state.isExpanded && ServiceRequestsPending && ServiceRequestsPending.length > 0 ?
							<i className="fa fa-times-circle close-request" onClick={this.handleCollapseClick.bind(this)}></i>
							:
							null
						}
					</div>
				</div>
				{this.state.isExpanded && ServiceRequestsPending && ServiceRequestsPending.length > 0 ?
					<br />
					:
					null
				}
				<div className="expand">
					{this.state.isExpanded && ServiceRequestsPending && ServiceRequestsPending.length > 0 ?
						ServiceRequestsPending.map((request, index) => (
							<div key={request._id} className="row">
								<RequestRow 
									request={request}
									onClick={(event) => this.handleRequestClick(event, index)} />
							</div>
						))
						:
						null
					}
				</div>
				<PopupModal 
					mode="edit"
					isOpen={this.state.isModalOpen} 
					onSubmit={() => this.acceptRequest()}
					onReject={() => this.rejectRequest()}>
						{this.state.selectedRequestIndex >= 0 ?
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
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										Remarks
									</div>
								</div>
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										<textarea className="form-control" value={selectedRequest.Service_Comment} readOnly={true} />
									</div>
								</div>
							</div>
							:
							null
						}
				</PopupModal>
			</div>
		);
	}
}

export default ComponentAgentRequests;

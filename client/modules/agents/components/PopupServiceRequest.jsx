import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class PopupServiceRequest extends Component {
  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  complete(e) {
    e.preventDefault()

    if (this.props.onCompleteRequest) {
      this.props.onCompleteRequest();
    }
  }
  accept(e) {
    e.preventDefault()

    if (this.props.onAcceptRequest) {
      this.props.onAcceptRequest();
    }
  }
  reject(e) {
    e.preventDefault()

    if (this.props.onRejectRequest) {
      this.props.onRejectRequest();
    }
  }
  render() {
    if (this.props.isOpen === false)
      return null

    let modalStyle = {
      position: 'fixed',
      zIndex: '9999',
	  width: '100%'
    }

    let modalStyleDialog = {
      top: '15%'
    }

    return (
      <div className="modal show-modal" style={modalStyle}>
		  <div className="modal-dialog" role="document" style={modalStyleDialog}>
			<div className="modal-content">
			  {this.props.showHeader ?
			    <div className="modal-header">
				  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				    <span aria-hidden="true">&times;</span>
				  </button>
				  <h4 className="modal-title">Modal title</h4>
			    </div>
				:
				null
			  }
			  <div className="modal-body align-left">
				{this.props.children}
			  </div>
			  {this.props.serviceRequest.Service_Request_Status === "Completed" ?
			    <div className="modal-footer align-middle">
				  <button type="button" className="btn btn-success btn-50" onClick={e => this.close(e)}>Close</button>
			    </div>
				:
				null
			  }
			  {this.props.serviceRequest.Service_Request_Status === "Accepted" ?
			    <div className="modal-footer align-middle">
				  <button type="button" className="btn btn-success btn-49" onClick={e => this.complete(e)}>Complete</button><button type="button" className="btn btn-danger btn-49" onClick={e => this.close(e)}>Close</button>
			    </div>
				:
				null
			  }
			  {this.props.serviceRequest.Service_Request_Status === "Pending" ?
			    <div className="modal-footer align-middle">
				  <button type="button" className="btn btn-success btn-30" onClick={e => this.accept(e)}>Accept</button>
				  <button type="button" className="btn btn-danger btn-30" onClick={e => this.reject(e)}>Reject</button>
				  <button type="button" className="btn btn-danger btn-30" onClick={e => this.close(e)}>Close</button>
			    </div>
				:
				null
			  }
			</div>
		  </div>
		</div>
    )
  }
}
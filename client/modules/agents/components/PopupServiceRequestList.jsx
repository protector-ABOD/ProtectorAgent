import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class PopupServiceRequestList extends Component {
  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose();
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
			  <div className="modal-body-fixed-height">
				  <div className="modal-body align-left">
					{this.props.children}
				  </div>
			  </div>
			    <div className="modal-footer align-middle">
				  <button type="button" className="btn btn-success btn-50" onClick={e => this.close(e)}>Close</button>
			    </div>
			</div>
		  </div>
		</div>
    )
  }
}
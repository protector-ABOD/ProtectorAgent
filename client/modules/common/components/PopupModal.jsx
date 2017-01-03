import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class PopupModal extends Component {
  reject(e) {
    e.preventDefault()

    if (this.props.onReject) {
      this.props.onReject();
    }
  }
  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  submit(e) {
    e.preventDefault()

    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }
  render() {
    if (this.props.isOpen === false)
      return null

    /*let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#fff'
    }

    if (this.props.width && this.props.height) {
      modalStyle.width = this.props.width + 'px'
      modalStyle.height = this.props.height + 'px'
      modalStyle.marginLeft = '-' + (this.props.width/2) + 'px',
      modalStyle.marginTop = '-' + (this.props.height/2) + 'px',
      modalStyle.transform = null
    }

    if (this.props.style) {
      for (let key in this.props.style) {
        modalStyle[key] = this.props.style[key]
      }
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    if (this.props.backdropStyle) {
      for (let key in this.props.backdropStyle) {
        backdropStyle[key] = this.props.backdropStyle[key]
      }
    }*/

    let modalStyle = {
      position: 'fixed',
      zIndex: '9999',
	  width: '100%'
    }

    let modalStyleDialog = {
      top: '15%'
    }

/*
    if (this.props.width && this.props.isWidthPercentage) {
		if (this.props.isWidthPercentage) {
			modalStyle.width = this.props.width + "%";
			modalStyle.marginLeft = '-' + (this.props.width/2) + '%';
		}
		else {
			modalStyle.width = this.props.width + "px";
			modalStyle.marginLeft = '-' + (this.props.width/2) + 'px';
		}
    }

    if (this.props.height && this.props.isHeightPercentage) {
		if (this.props.isHeightPercentage) {
			modalStyle.height = this.props.height + "%";
			modalStyle.marginTop = '-' + (this.props.height/2) + '%';
		}
		else {
			modalStyle.height = this.props.height + "px";
			modalStyle.marginTop = '-' + (this.props.height/2) + 'px';
		}
    }*/

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
			  {this.props.mode === "edit" ?
			    <div className="modal-footer">
				  <button type="button" className="btn btn-success btn-49" onClick={e => this.submit(e)}>Accept</button>
				  <button type="button" className="btn btn-danger btn-49" onClick={e => this.reject(e)}>Reject</button>
			    </div>
				:
			    <div className="modal-footer align-middle">
				  <button type="button" className="btn btn-success btn-50" onClick={e => this.close(e)}>Close</button>
			    </div>
			  }
			</div>
		  </div>
		</div>
    )
  }
}
// inspired by Greg Schechter https://github.com/gregthebusker
// origin: https://github.com/gregthebusker/react-confirm-bootstrap

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

export class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: props.visible
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onButtonClick() {
    // Since the modal is inside the button click events will propagate up.
    if (!this.state.isOpened) {
      this.setState({
        isOpened: true
      });
    }
  }

  onClose(event) {
    if (event) {
      event.stopPropagation();
    }
    this.setState({
      isOpened: false
    });

    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }

  onConfirm(event) {
    event.stopPropagation();
    this.setState({
      isOpened: false
    });
    this.props.onConfirm();
  }

  render() {
    var cancelButton = this.props.showCancelButton ? (
      <Button variant="secondary" onClick={this.onClose}>
        {this.props.cancelText}
      </Button>
    ) : null;
    var modal = (
      <Modal show={this.state.isOpened} onHide={this.onClose}
        className={this.props.className} dialogClassName={this.props.dialogClassName}
        keyboard={this.props.keyboard} backdrop={this.props.backdrop}
        enforceFocus={this.props.enforceFocus}
      >
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.body}</Modal.Body>
        <Modal.Footer>
          {cancelButton}
          <Button variant={this.props.confirmButtonVariant} onClick={this.onConfirm}>
            {this.props.confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    );
    var content;
    if (this.props.children) {
      var btn = React.Children.only(this.props.children);
      content = React.cloneElement(
        btn,
        {
          onClick: this.onButtonClick,
          style: this.props.style
        },
        btn.props.children,
        modal
      );
    } else {
      content = (
        <Button onClick={this.onButtonClick} style={this.props.style}>
          {this.props.buttonText}
          {modal}
        </Button>
      );
    }
    return content;
  }
}

Confirm.propTypes = {
  body: PropTypes.node.isRequired,
  buttonText: PropTypes.node,
  cancelText: PropTypes.node,
  className: PropTypes.string,
  confirmButtonVariant: PropTypes.string,
  confirmText: PropTypes.node,
  dialogClassName: PropTypes.string,
  keyboard: PropTypes.bool,
  backdrop: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  enforceFocus: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  showCancelButton: PropTypes.bool.isRequired,
  title: PropTypes.node.isRequired,
  visible: PropTypes.bool
};

Confirm.defaultProps = {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  confirmButtonVariant: 'primary',
  showCancelButton: true
};

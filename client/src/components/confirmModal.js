import React, { Component } from 'react';
import '../assets/css/confirmModal.css';

class ConfirmModal extends Component {
    render() {
        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };
        console.log(this.props)

        return (
            <div className='confirmModal' style={displayModal}>
                <div className='confirmModalContent contentBorder center-align'>
                    <div>
                        <h3>Are you sure you want to leave?</h3>
                        <button className='btn teal accent-4 waves-effect waves-light'>Yes</button>
                        <button className='btn teal accent-4 waves-effect waves-light' onClick={this.props.close}>No</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmModal;
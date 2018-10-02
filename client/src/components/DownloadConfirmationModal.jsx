import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MainStore from '../stores/MainStore'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
    }
});

@observer
class DownloadConfirmationModal extends Component {

    closeModal = (id) =>  {
        MainStore.setValidationErrors('clearAll');
        MainStore.toggleModal(id);
    };


    downloadData(modalId) {
        let inputs = [this.q1, this.q2, this.q3];
        if(this.validateAllInputs()) {
            MainStore.postUserResponse(modalId, inputs);
        }
    };

    handleInputChange = (event) => {
        let id = event.target.id;
        let text = event.target.value.trim().length;
        if((!text && !MainStore.validationErrors.has(id)) || (MainStore.validationErrors.has(id) && text)) {
            MainStore.setValidationErrors(id);
        }
    };

    validateAllInputs = () => {
        let inputs = [this.q1, this.q2, this.q3];
        let { validationErrors } = MainStore;
        inputs.forEach(t => {
            let text = t.value.trim().length;
            if((!text && !validationErrors.has(t.id)) || (validationErrors.has(t.id) && text)) {
                MainStore.setValidationErrors(t.id);
            }
        });
        return !MainStore.validationErrors.size && !inputs.some(i => i.value.trim().length <= 0)
    };

    render() {
        let { modals, validationErrors } = MainStore;
        return (
            <Dialog
                open={modals.has('dlq')}
                onClose={() => this.closeModal('dlq')}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Survey</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To download this data please answer a few questions first.
                    </DialogContentText>
                    <TextField
                        inputRef={input => (this.q1 = input)}
                        required={true}
                        error={validationErrors.has('q1')}
                        onChange={this.handleInputChange}
                        autoFocus={true}
                        multiline={true}
                        rowsMax="4"
                        margin="normal"
                        id="q1"
                        label="What do you intend to use this data for 2?"
                        fullWidth
                    />
                    <TextField
                        inputRef={input => (this.q2 = input)}
                        required={true}
                        error={validationErrors.has('q2')}
                        onChange={this.handleInputChange}
                        multiline={true}
                        rowsMax="4"
                        margin="normal"
                        id="q2"
                        label="What do you intend to use this data for 3?"
                        fullWidth
                    />
                    <TextField
                        inputRef={input => (this.q3 = input)}
                        required={true}
                        error={validationErrors.has('q3')}
                        onChange={this.handleInputChange}
                        multiline={true}
                        rowsMax="4"
                        margin="normal"
                        id="q3"
                        label="What do you intend to use this data for?"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => this.closeModal('dlq')}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.downloadData('dlq')}
                        color="primary"
                    >
                        Download
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

DownloadConfirmationModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DownloadConfirmationModal);
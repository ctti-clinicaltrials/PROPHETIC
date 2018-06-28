import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AuthStore from '../stores/AuthStore'
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
        MainStore.toggleModal(id);
        MainStore.queueDownload();
    };

    downloadData(id) {
        MainStore.downloadDataset();
        MainStore.queueDownload();
        this.closeModal(id);
    }

    render() {
        let { modals } = MainStore;
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
                        autoFocus
                        multiline
                        rowsMax="4"
                        margin="normal"
                        id="name"
                        label="What do you intend to use this data for?"
                        fullWidth
                    />
                    <TextField
                        multiline
                        rowsMax="4"
                        margin="normal"
                        id="name"
                        label="What do you intend to use this data for?"
                        fullWidth
                    />
                    <TextField
                        multiline
                        rowsMax="4"
                        margin="normal"
                        id="name"
                        label="What do you intend to use this data for?"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.closeModal('dlq')} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.downloadData('dlq')} color="primary">
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
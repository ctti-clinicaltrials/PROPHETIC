import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Color } from '../../theme/theme'
import MainStore from '../../stores/MainStore'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
    },
    formControl: {
        marginTop: 40
    },
    paper: {
        width: '100%',
        padding: 20,
        backgroundColor: Color.light_red
    }
});

@observer
class DownloadConfirmationModal extends Component {

    closeModal = (id) =>  {
        MainStore.setValidationErrors('clearAll');
        MainStore.setSurveyAffiliations('clearAll');
        MainStore.toggleModal(id);
    };

    createCheckboxes = () => {
        const {organizationTypes, surveyAffiliations} = MainStore;
        return organizationTypes.map((b, i) => (
            <FormControlLabel
                key={i}
                control={
                    <Checkbox
                        checked={surveyAffiliations.has(b)}
                        onChange={this.handleCheckboxes(i, b)}
                        value={b}
                    />
                }
                label={b}
            />
        ))
    };

    downloadData(modalId) {
        let inputs = [this.name, this.email, this.reason];
        if(this.other) inputs = [...inputs, this.other];
        if(MainStore.validateTextInputs(inputs)) {
            MainStore.postUserResponse(inputs);
            this.closeModal(modalId);
        }
    };

    handleInputChange = (event) => {
        const {validationErrors} = MainStore;
        const id = event.target.id;
        const text = event.target.value.trim().length;
        if((!text && !validationErrors.has(id)) || (validationErrors.has(id) && text)) {
            MainStore.setValidationErrors(id);
        }
    };

    handleCheckboxes  = (index, id) => event => {
        const {surveyAffiliations, validationErrors} = MainStore;
        MainStore.setSurveyAffiliations(id);
        if(id === 'other') this.focusTextField();
        if(surveyAffiliations.size > 0 && validationErrors.has('checkboxes')) MainStore.setValidationErrors('checkboxes');
    };

    focusTextField = () => {
        setTimeout(() => this.other && this.other.focus(), 300)
    };

    render() {
        const { modals, validationErrors, surveyAffiliations } = MainStore;
        const { classes } = this.props;
        const open = !!validationErrors.size > 0;
        return (
            <Dialog
                open={modals.has('dlq')}
                onClose={() => this.closeModal('dlq')}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Survey</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To download this data please answer a few questions. We gather this information to gain
                        insights about how our data sharing program is being used. Your information will not be shared
                        with anyone and we will not send unrequested email correspondence to you.
                    </DialogContentText>
                    <TextField
                        inputRef={input => (this.name = input)}
                        required={true}
                        error={validationErrors.has('name')}
                        onChange={this.handleInputChange}
                        autoFocus={true}
                        multiline={true}
                        rowsMax="4"
                        margin="normal"
                        id="name"
                        label="Name"
                        fullWidth
                    />
                    <TextField
                        inputRef={input => (this.email = input)}
                        required={true}
                        error={validationErrors.has('email')}
                        onChange={this.handleInputChange}
                        multiline={true}
                        rowsMax="4"
                        margin="normal"
                        id="email"
                        label="Email Address"
                        fullWidth
                    />
                    <TextField
                        inputRef={input => (this.reason = input)}
                        required={true}
                        error={validationErrors.has('reason')}
                        onChange={this.handleInputChange}
                        multiline={true}
                        rowsMax="4"
                        margin="normal"
                        id="reason"
                        label="What do you intend to use this data for?"
                        fullWidth
                    />
                    <div className={classes.root}>
                        <FormControl required error={surveyAffiliations.size <= 0} component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Which of the following best describes your organization?</FormLabel>
                            <FormHelperText>You must select at least one organization type</FormHelperText>
                            <FormGroup>
                                {this.createCheckboxes()}
                            </FormGroup>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={surveyAffiliations.has('other')}
                                            onChange={this.handleCheckboxes(7, 'other')}
                                            value="Other"
                                        />
                                    }
                                    label="Other"
                                />
                                {surveyAffiliations.has('other') &&
                                    <TextField
                                        style={{marginTop: -8}}
                                        inputRef={input => (this.other = input)}
                                        required={true}
                                        error={validationErrors.has('other')}
                                        onChange={this.handleInputChange}
                                        multiline={true}
                                        rowsMax="4"
                                        margin="normal"
                                        id="other"
                                        label="please specify"
                                    />
                                }
                            </FormGroup>
                        </FormControl>
                        {open &&
                            <Paper className={classes.paper} elevation={2}>
                                <Typography variant="h6" style={{color: Color.white}}>
                                    Please fix the errors highlighted in red above.
                                </Typography>
                            </Paper>
                        }
                    </div>
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
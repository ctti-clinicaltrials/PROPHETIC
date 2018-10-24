import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import { Color } from '../theme/theme'
import {Slider} from "material-ui-slider";
import TextField from "@material-ui/core/TextField";

import InputAdornment from '@material-ui/core/InputAdornment';

import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaxAge from "./MaxAge";
import WeightRange from "./WeightRange";
import ApacheScore from "./ApacheScore";


const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: Color.dark_turquoise
    },
    textFieldColor: { color: Color.dark_turquoise },
});

@observer
class GeneralExclusions extends Component {

    validateInput = val => {

    };

    render() {
        const { classes } = this.props;

        return (
            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>General Exclusions</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl component="fieldset">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        // checked={this.state.gilad}
                                        // onChange={this.handleChange('gilad')}
                                        value="> 24 hours Prior Antibacterial Therapy"
                                    />
                                }
                                label="> 24 hours Prior Antibacterial Therapy"
                            />
                            <Divider/>
                            <FormControlLabel
                                control={
                                    <Switch
                                        // checked={this.state.jason}
                                        // onChange={this.handleChange('Participation in other clinical trial')}
                                        value="Participation in other clinical trial"
                                    />
                                }
                                label="Participation in other clinical trial"
                            />
                            <Divider />
                            <MaxAge />
                            <Divider />
                            <WeightRange />
                            <Divider />
                            <ApacheScore />
                        </FormGroup>
                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

GeneralExclusions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GeneralExclusions);
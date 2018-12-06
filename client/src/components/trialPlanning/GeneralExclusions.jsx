import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import { Color } from '../../theme/theme'
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaxAge from "./MaxAge";
import WeightRange from "./WeightRange";
import ApacheScore from "./ApacheScore";
import TrialParticipation from "./TrialParticipation";
import AntibacterialTherapy from "./AntibacterialTherapy";
import MainStore from "../../stores/MainStore";

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: Color.dark_turquoise
    },
});

@observer
class GeneralExclusions extends Component {

    render() {
        const { classes } = this.props;
        const { exclusions, inputValues } = MainStore;

        return (
            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>General</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl component="fieldset">
                        <FormGroup>
                            <AntibacterialTherapy exclusions={exclusions} />
                            <Divider/>
                            <TrialParticipation exclusions={exclusions} />
                            <Divider />
                            <MaxAge exclusions={exclusions} inputValues={inputValues}/>
                            <Divider />
                            <WeightRange exclusions={exclusions} />
                            <Divider />
                            <ApacheScore exclusions={exclusions} />
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
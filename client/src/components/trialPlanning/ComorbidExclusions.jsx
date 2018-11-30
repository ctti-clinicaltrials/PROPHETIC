import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import { Color } from '../../theme/theme'
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CongestiveHeartFailure from "./CongestiveHeartFailure";
import HIV from "./HIV";
import MainStore from "../../stores/MainStore";


const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: Color.dark_turquoise
    },
});

@observer
class ComorbidExclusions extends Component {

    render() {
        const { classes } = this.props;
        const { exclusions } = MainStore;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Comorbid Conditions</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl component="fieldset">
                        <CongestiveHeartFailure exclusions={exclusions} />
                        <Divider/>
                        <HIV exclusions={exclusions} />
                        <Divider/>
                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

ComorbidExclusions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComorbidExclusions);
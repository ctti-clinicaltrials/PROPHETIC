import React, { Component } from 'react';
import { observer } from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import HelpTooltip from "@material-ui/core/Tooltip";
import Help from "@material-ui/icons/Help";
import DownloadGraph from "./DownloadGraph";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
    root: {
        minWidth: '100%',
        padding: '20px 20px 10px 44px'
    },
    helpTooltip: {
        marginBottom: -3,
        marginLeft: 10
    },
});

@observer
class TrialPlanningHeading extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Typography variant="h5" className={classes.root}>
                Trial Planning
                <HelpTooltip
                    title="An interactive funnel chart for assistance planning efficient trials. Use the exclusions on the left to change the outcome of the remaining study population in the graph. E.g. you can create a graph showing the population with a max age of 56 years old between 80 and 100 kilograms in body weight, diagnosed as HIV positive with Congestive Heart Failure.">
                    <Help
                        className={classes.helpTooltip}
                        color="disabled"
                        fontSize="small"
                    />
                </HelpTooltip>
                <DownloadGraph/>
            </Typography>
        )
    }
}

export default withStyles(styles)(TrialPlanningHeading);
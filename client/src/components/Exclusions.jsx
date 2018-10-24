import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import ComorbidExclusions from "./ComorbidExclusions";
import GeneralExclusions from "./GeneralExclusions";


const styles = theme => ({
    paper: {
        flexGrow: 1,
        maxWidth: 400,
        height: 'calc(100vh + 30px)',
        padding: '10px 10px 10px 24px',
        overflow: 'scroll',
        marginBottom: -40
    }
});

@observer
class ExclusionControls extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.paper}>
                <GeneralExclusions />
                <ComorbidExclusions />
            </div>
        );
    }
}

ExclusionControls.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExclusionControls);
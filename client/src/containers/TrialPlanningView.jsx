import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import AuthStore from '../stores/AuthStore';
import MainStore from '../stores/MainStore';
import Graph from '../components/Graph';
import Exclusions from '../components/Exclusions';
import Paper from '@material-ui/core/Paper';
import {Slider} from 'material-ui-slider';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        display: 'flex',
        width:'100%',
        height: '100vh',
    }
});

@observer
class TrialPlanningView extends Component {

    componentDidMount() {
        AuthStore.getProfile();
        AuthStore.getDDSApiToken();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Exclusions />
                <Graph />
            </div>
        );
    }
}

TrialPlanningView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrialPlanningView);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import AuthStore from '../stores/AuthStore';
import Graph from '../components/trialPlanning/Graph';
import ExclusionControls from '../components/trialPlanning/Exclusions';

const styles = () => ({
    root: {
        display: 'flex',
        width:'100%',
        height: '100vh',
    }
});

@observer
class TrialPlanning extends Component {

    componentDidMount() {
        AuthStore.getProfile();
        AuthStore.getDDSApiToken();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <ExclusionControls />
                <Graph />
            </div>
        );
    }
}

TrialPlanning.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrialPlanning);
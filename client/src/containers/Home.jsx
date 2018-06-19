import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AuthStore from '../stores/AuthStore'
import MainStore from '../stores/MainStore'
import LinearProgress from '@material-ui/core/LinearProgress';
import DatasetList from '../components/DatasetList.jsx'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        width: '100%',
    }
});

@observer
class Home extends Component {
    componentDidMount() {
        AuthStore.getProfile();
        AuthStore.getDDSApiToken();
        MainStore.test();
        MainStore.getAllDataSets();
    }

    render() {
        const { classes } = this.props;
        const { datasets, loading } = MainStore;

        return (
            <div className={classes.root}>
                {loading ? <LinearProgress /> : <DatasetList />}
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
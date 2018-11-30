import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AuthStore from '../stores/AuthStore'
import MainStore from '../stores/MainStore'
import DatasetList from '../components/dataSharing/DatasetList.jsx'
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    root: {
        width: '100%',
    }
});

@observer
class Home extends Component {
    componentDidMount() {
        AuthStore.getProfile();
        AuthStore.getDDSApiToken();
        MainStore.getAllDataSets();
    }

    render() {
        return (
            <div>
                <DatasetList />
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
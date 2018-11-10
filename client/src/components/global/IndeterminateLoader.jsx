import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MainStore from '../../stores/MainStore'
import LinearProgress from '@material-ui/core/LinearProgress';

@observer
class IndeterminateLoader extends Component {
    render() {
        const { loading } = MainStore;

        return (
            <div>
                {loading && <LinearProgress color="secondary" />}
            </div>
        );
    }
}

IndeterminateLoader.propTypes = {
    loading: PropTypes.bool
};

export default IndeterminateLoader;
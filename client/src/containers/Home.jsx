import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AuthStore from '../stores/AuthStore'
import MainStore from '../stores/MainStore'
import DatasetList from '../components/DatasetList.jsx'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    input: {
        display: 'none',
    },
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

    fileInputChanged = (event) => {
        const f = event.target.files[0];
        MainStore.uploadFile(f);
    };

    download = () => {
        MainStore.downloadFile();
        // this.setState(state => {
        //     file: 1
        // });

    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <input
                    className={classes.input}
                    id="outlined-button-file"
                    multiple
                    type="file"
                    name="file"
                    onChange={this.fileInputChanged}
                />
                <label htmlFor="outlined-button-file">
                    <Button variant="outlined" component="span">
                        Upload
                    </Button>
                </label>
                <Button variant="outlined" component="span" onClick={this.download}>
                    Download
                </Button>
                <DatasetList />
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
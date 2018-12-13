import React, { Component } from 'react';
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import saveAs from 'file-saver';
import CloudDownload from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = () => ({
   downloadButton: {
       float: 'right',
       marginTop: -8
   }
});

@observer
class DownloadGraph extends Component {

    saveGraph = () => {
        const canvas = document.getElementById("canvas_2");
        canvas.toBlob((blob) => {
            saveAs(blob, "trial_planning_graph.png");
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Tooltip title="Download Graph">
                <IconButton className={classes.downloadButton} onClick={() => this.saveGraph()}>
                    <CloudDownload />
                </IconButton>
            </Tooltip>
        );
    }
}

export default withStyles(styles)(DownloadGraph);
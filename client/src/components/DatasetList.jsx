import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MainStore from '../stores/MainStore'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FileDownload from '@material-ui/icons/FileDownload';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    root: {
        width: '100%',
    },
});

@observer
class DatasetList extends Component {

    downloadDataset = (id) => {
        MainStore.downloadDataset(id);
    };

    render() {
        const { classes } = this.props;
        const { datasets } = MainStore;
        return (
            <div>
                {datasets && datasets.map((d) => {
                    return (
                        <ExpansionPanel key={d.id}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{d.file.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    {d.description}
                                </Typography>
                                <Typography>
                                    {d.file.audit.created_by.full_name}
                                </Typography>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                                <Button size="small" color="primary" onClick={() => this.downloadDataset(d.file.id)}>
                                    Download
                                    <FileDownload className={classes.rightIcon} />
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    )
                })
                }
            </div>
        );
    }
}

DatasetList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatasetList);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MainStore from '../../stores/MainStore';
import { formatDate } from '../../util/baseUtils'
import { Color } from '../../theme/theme';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Description from '@material-ui/icons/Description';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Help from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    boldHeadline: {textDecoration: 'underline'},
    button: {padding: '2px 8px'},
    expandedPanel: {
        margin: '10px -10px',
        borderLeft: `solid 4px ${Color.light_blue}`,
        borderRadius: `4px 0px 0px 4px`,
    },
    h5: { marginBottom: 19},
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    headingText: {
        paddingTop: 5
    },
    helpTooltip: {
        marginBottom: -3,
        marginLeft: 10
    },
    panelActions: {padding: 10},
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    leftIcon: {
        margin: '3px 10px 0px -4px'
    },
    root: {
        width: '100%',
        '&::before' :{
            backgroundColor: Color.light_grey
        },
    },
});

@observer
class DatasetList extends Component {

    downloadDataset = (id) => {
        MainStore.toggleModal('dlq');
        MainStore.queueDownload(id);
    };

    expandPanel = (id) => {
        MainStore.toggleExpandedPanel(id)
    };

    render() {
        const { classes } = this.props;
        const { datasets, expandedPanels } = MainStore;
        return (
            <div>
                <Typography variant="h5" gutterBottom className={classes.h5}>
                    Downloadable Data
                    <Tooltip title="Data that the Clinical Trials Transformation Initiative has made available for public download. You will be asked for your name, email address and to answer a few short questions before downloading data.">
                        <Help className={classes.helpTooltip}
                              color="disabled"
                              fontSize="small"
                        />
                    </Tooltip>
                </Typography>
                {datasets && datasets.map((d) => {
                    return (
                        <ExpansionPanel key={d.id}
                                        expanded={expandedPanels.has(d.id)}
                                        onChange={() => this.expandPanel(d.id)}
                                        className={expandedPanels.has(d.id) ? classes.expandedPanel : classes.root}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={`${classes.heading} ${classes.leftIcon}`}>
                                    <Description color="primary" />
                                </Typography>
                                <Typography className={`${classes.heading} ${classes.headingText}`}>
                                    {d.file.name}
                                </Typography>
                            </ExpansionPanelSummary>
                            {d.metadata &&
                            d.metadata.map(m => {
                                return <ExpansionPanelDetails key={m.template_property.id}>
                                    <Typography>
                                        <b className={classes.boldHeadline}>{m.template_property.label}</b>
                                        <br/>
                                        {m.value}
                                    </Typography>
                                </ExpansionPanelDetails>
                            })
                            }
                            <ExpansionPanelDetails>
                                <Typography>
                                    <b className={classes.boldHeadline}>Added on </b><br/>
                                    {formatDate(d.file.audit.created_on)}
                                </Typography>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions className={classes.panelActions}>
                                <Button size="small"
                                        color="primary"
                                        variant="outlined"
                                        className={classes.button}
                                        onClick={() => this.downloadDataset(d.file.id)}
                                >
                                    Download Data
                                    <CloudDownload className={classes.rightIcon} />
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Col, Row } from 'react-grid-system';
import AuthStore from '../stores/AuthStore'
import MainStore from '../stores/MainStore'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

    const styles = theme => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    });


@observer
class Home extends Component {
    componentDidMount() {
        AuthStore.getProfile();
        AuthStore.getDDSApiToken();
    }

    render() {
        let {userProfile} = AuthStore;
        const { classes } = this.props;

        return (
            <span>{userProfile && <img src={userProfile.picture} alt="profile" style={{maxWidth: 80}}/>}
                <div className={classes.root}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Expansion Panel 1</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            <div style={{float: 'right'}}><ExpandMoreIcon /></div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Expansion Panel 2</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
                        </ExpansionPanelSummary>
                    </ExpansionPanel>
                </div>
            </span>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
{/*<Row>*/}
    {/*{*/}
        {/*projects.map((p) => {*/}
            {/*return (*/}
                {/*<Col key={p.id} sm={4} >*/}
                    {/*<Paper>*/}
                        {/*<p style={{padding: 4}}>{p.name}</p>*/}
                        {/*<p style={{padding: 4}}>{p.description}</p>*/}
                    {/*</Paper>*/}
                {/*</Col>*/}
            {/*)*/}
        {/*})*/}
    {/*}*/}
    {/*<Col debug md={12} style={{height: 1000}}>*/}

    {/*</Col>*/}
    {/*<Col debug sm={4} style={{height: 1000}}>*/}
        {/*One of three columns*/}
    {/*</Col>*/}
    {/*<Col debug sm={4} style={{height: 1000}}>*/}
        {/*One of three columns*/}
    {/*</Col>*/}
    {/*<Col debug sm={4} style={{height: 1000}}>*/}
        {/*One of three columns*/}
    {/*</Col>*/}
{/*</Row>*/}
// export default Home;


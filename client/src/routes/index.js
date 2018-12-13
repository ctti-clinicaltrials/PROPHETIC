import React, { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthStore from '../stores/AuthStore';
import DownloadConfirmationModal from '../components/dataSharing/DownloadConfirmationModal.jsx';
import FilterCloud from "../components/trialPlanning/FilterCloud";
import Footer from '../components/global/Footer.jsx';
import Grid from '@material-ui/core/Grid';
import Header from '../components/global/Header.jsx';
import Home from '../containers/Home.jsx';
import IndeterminateLoader from '../components/global/IndeterminateLoader.jsx';
import Login from '../components/global/Login.jsx';
import TrialPlanningView from "../containers/TrialPlanning";
import CookieWarning from "../components/global/CookieWarning";

const styles = {
    innerGrid1: {
        padding: 0
    },
    innerGrid2: {
        padding: '20px 0px',
        marginBottom: 40
    },
};

const handleAuthentication = (nextState) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        AuthStore.handleAuthentication();
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    let redirectURL = `/${window.location.pathname.split('/').filter(i => i.trim() !== '')[0]}`;
    AuthStore.setRedirectURL(redirectURL);
    return <Route {...rest} render={(props) =>
        AuthStore.isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to="/login"/>
        )
    }/>
};

const LoginRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        handleAuthentication(props);
        return <Component {...props} />
    }}/>
};

export default () => (
    <Router>
        <Fragment>
            <CssBaseline />
            <Grid container spacing={16} justify="center">
                <Route component={Header} />
                <Grid item xs={12} style={styles.innerGrid1}>
                    <Route component={IndeterminateLoader} />
                    <DownloadConfirmationModal component={DownloadConfirmationModal}/>
                </Grid>
                {/*<PrivateRoute path="/trial-planning" component={FilterCloud} />*/}
                <Switch>
                    {/*<PrivateRoute exact path="/trial-planning" component={TrialPlanningView} />*/}
                    <Fragment>
                        <Grid item xs={11} s={10} md={10} lg={8} style={styles.innerGrid2}>
                            <LoginRoute path="/login" component={Login} />
                            <PrivateRoute exact path="/data-sharing" component={Home} />
                            <Redirect to={AuthStore.isAuthenticated() ? '/data-sharing' : '/login'}/>
                        </Grid>
                    </Fragment>
                </Switch>
                <CookieWarning />
            <Route component={Footer} />
            </Grid>
        </Fragment>
    </Router>
);

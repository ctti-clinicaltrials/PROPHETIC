import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AuthStore from '../stores/AuthStore';
import Graph from '../containers/Graph.jsx';
import DownloadConfirmationModal from '../components/DownloadConfirmationModal.jsx';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import IndeterminateLoader from '../components/IndeterminateLoader.jsx';
import Grid from '@material-ui/core/Grid';
import Home from '../containers/Home.jsx';
import LeftNav from '../components/LeftNav.jsx';
import Login from '../components/Login.jsx';

const styles = {
    innerGrid1: {
        padding: 0
    },
    innerGrid2: {
        padding: '20px 0px',
        marginBottom: 40
    },
};

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        AuthStore.handleAuthentication();
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) =>
        AuthStore.isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to="/login"/>
        )
    }/>
};

const LoginRoute = ({ component: Component, ...rest }) => {
    const redirectUrl = localStorage.getItem('redirectUrl') ? localStorage.getItem('redirectUrl') : '/';
    return <Route {...rest} render={(props) => {
        handleAuthentication(props);
        return !AuthStore.isAuthenticated() ? <Component {...props} /> : <Redirect to={redirectUrl}/>
    }}/>
};

export default () => (
    <Router>
        <div>
            <Grid container spacing={16} justify="center" >
                <Route component={Header} />
                <Grid item xs={12} style={styles.innerGrid1}>
                    <Route component={IndeterminateLoader} />
                    <DownloadConfirmationModal component={DownloadConfirmationModal}/>
                </Grid>
            </Grid>
            {AuthStore.isAuthenticated() && <Route component={LeftNav} />}
            <Grid container spacing={16} justify="center">
                <Grid item xs={11} s={10} md={10} lg={8} style={styles.innerGrid2}>
                    <Switch>
                        <LoginRoute path="/login" component={Login} />
                        <PrivateRoute exact path="/" component={Home} />
                        <Redirect to="/" />
                    </Switch>
                </Grid>
            </Grid>
            <Grid container spacing={16} justify="center" >
                <Route component={Footer} />
            </Grid>
        </div>
    </Router>
);

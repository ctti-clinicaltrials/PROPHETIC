import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import MainStore from "../../stores/MainStore";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Button from "@material-ui/core/Button";

const styles = () => ({
    snackbar: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        zIndex: 9999
    }
});

@observer
class CookieWarning extends Component {
    componentDidMount() {
        MainStore.checkCookieConsent();
    };

    setCookieConsent = () => {
        MainStore.setCookieConsent();
    };

    render() {
        const { classes, location } = this.props;
        const { showCookieConsent } = MainStore;
        const action = (
            <Button variant="outlined" color="secondary" size="small" onClick={this.setCookieConsent}>
                Agree and Continue
            </Button>
        );
        return (
            showCookieConsent && location.pathname !== '/login' &&
            <SnackbarContent message="This site uses cookies to improve your experience.
                             By using this site you agree to our use of cookies.
                             You are free to manage this via your browser settings at any time
                             but disabling cookies may make parts of this site not work."
                             action={action}
                             className={classes.snackbar}
            />
        );
    }
}

CookieWarning.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(CookieWarning));
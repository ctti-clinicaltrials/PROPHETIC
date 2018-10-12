import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AuthStore from '../stores/AuthStore';
import MainStore from '../stores/MainStore'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    loginBtn: {
        marginTop: 8
    },
};

@observer
class HeaderDropdownMenu extends Component {

    openLink = (li) => {
        let link = '';
        if(li === 'cu') {
            link = 'https://www.ctti-clinicaltrials.org/contact-us';
        } else if(li === 'cp') {
            link = 'https://www.ctti-clinicaltrials.org/briefing-room/citation-policy';
        }
        MainStore.setAnchorElement(null, 'headerMenu');
        if(link.length) window.location.href = link;
    };

    handleLogout = () => AuthStore.logout();

    initiateLogin = () => AuthStore.login();

    openMenu = (event, i) => MainStore.setAnchorElement(event.currentTarget, i);

    render() {
        return (
            AuthStore.isAuthenticated() ?
                <Menu id="simple-menu"
                      anchorEl={MainStore.anchorElements.get('headerMenu')}
                      open={MainStore.anchorElements.has('headerMenu')}
                      onClose={(e) => this.openMenu(e, 'headerMenu')}
                >
                    <MenuItem onClick={() => this.openLink('cu')}>Contact Us</MenuItem>
                    <MenuItem onClick={() => this.openLink('cp')}>Citation Policy</MenuItem>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu> :
                <Button variant="contained"
                        color="secondary"
                        onClick={this.initiateLogin}
                        style={styles.loginBtn}>
                    Login
                </Button>
        );
    }
}

export default withStyles(styles)(HeaderDropdownMenu);
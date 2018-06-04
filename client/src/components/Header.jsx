import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AuthStore from '../stores/AuthStore';
import MainStore from '../stores/MainStore'
import CTTI_logo from '../images/CTTI_logo.png';
import { Color } from '../theme/theme';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Menu as MenuIcon, MoreVert } from '@material-ui/icons'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();

const styles = {
    appBar: {
        backgroundColor: Color.white
    },
    avatar: {
        margin: '16px 10px 10px',
    },
    flex: {
        flex: 1,
    },
    logo: {
        maxWidth: 200,
        marginBottom: -5,
    },
    drawerButton: {
        marginRight: 10,
        marginTop: 6
    },
    menuButton: {
        marginTop: 6
    },
    toolbar: {
        zIndex: theme.zIndex.drawer + 1
    }
};

@observer
class Header extends Component {

    handleLogout = () => AuthStore.logout();

    initiateLogin = () => AuthStore.login();

    menu = (props) => (
        AuthStore.isAuthenticated() ?
            <Menu id="simple-menu"
                anchorEl={MainStore.anchorElements.get('headerMenu')}
                open={MainStore.anchorElements.has('headerMenu')}
                onClose={(e) => this.openMenu(e, 'headerMenu')}
            >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu> :
            <Button variant="raised"
                    color="primary"
                    onClick={this.initiateLogin}
                    styles={{}}>
                Login
            </Button>
    );

    openMenu = (event, i) => {
        MainStore.setAnchorElement(event.currentTarget, i)
    };

    toggleDrawer = (key) => MainStore.toggleDrawer(key);

    render() {
        const { userProfile } = AuthStore;
        const { classes } = this.props;
        const open = MainStore.anchorElements.has('headerMenu');

        return (
            <AppBar position="static"
                    style={styles.appBar}>
                <Toolbar style={styles.toolbar}>
                    {AuthStore.isAuthenticated() &&
                    <IconButton className={classes.drawerButton}
                        aria-label="Menu"
                        onClick={() => this.toggleDrawer('mainNavDrawer')}>
                        <MenuIcon />
                    </IconButton>}
                    <Typography variant="title"
                                color="inherit"
                                className={classes.flex}>
                       <img src={CTTI_logo}
                            alt="CTTI logo"
                            style={styles.logo}
                       />
                    </Typography>
                        {userProfile &&
                            <Avatar alt="your profile avatar" src={userProfile.picture} className={classes.avatar} />
                        }
                        {AuthStore.isAuthenticated() &&
                            <IconButton className={classes.menuButton}
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={(e) => this.openMenu(e, 'headerMenu')}>
                                <MoreVert />
                            </IconButton>
                        }
                        {this.menu()}
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AuthStore from '../stores/AuthStore';
import MainStore from '../stores/MainStore';
import HeaderDropdownMenu from './HeaderDropdownMenu';
import CTTI_logo from '../images/CTTI_logo.png';
import CTTI_logo_crop from '../images/CTTI_logo_crop.png';
import { Color } from '../theme/theme';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Menu as MenuIcon, MoreVert } from '@material-ui/icons'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SocialSharing from "./SocialSharing";

const theme = createMuiTheme();

const styles = {
    appBar: {
        backgroundColor: Color.white
    },
    avatar: {
        // margin: '16px 10px 10px',
        position: 'absolute',
        top: 33,
        right: 126
    },
    flex: {
        flex: 1,
    },
    logo: {
        maxWidth: 200,
        marginBottom: -5,
    },
    logoCropped: {
        maxWidth: 64,
        marginBottom: -5,
        marginTop: 5,
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

    openMenu = (event, i) => MainStore.setAnchorElement(event.currentTarget, i);

    toggleDrawer = (key) => MainStore.toggleDrawer(key);

    render() {
        const { userProfile } = AuthStore;
        const { showSharingIcons } = MainStore;
        const { classes } = this.props;
        const open = MainStore.anchorElements.has('headerMenu');

        return (
            <AppBar position="static"
                    style={styles.appBar}>
                <Toolbar style={styles.toolbar}>
                    {/*{AuthStore.isAuthenticated() &&*/}
                    {/*<IconButton className={classes.drawerButton}*/}
                        {/*aria-label="Menu"*/}
                        {/*onClick={() => this.toggleDrawer('mainNavDrawer')}>*/}
                        {/*<MenuIcon />*/}
                    {/*</IconButton>}*/}
                    <Typography variant="title"
                                color="inherit"
                                className={classes.flex}>
                       <img src={window.innerWidth >= 520 ? CTTI_logo : CTTI_logo_crop}
                            alt="CTTI logo"
                            style={window.innerWidth >= 520 ? styles.logo : styles.logoCropped}
                       />
                    </Typography>
                        {userProfile && !showSharingIcons &&
                            <Avatar alt="your profile avatar" src={userProfile.picture} className={classes.avatar} />
                        }
                        {AuthStore.isAuthenticated() &&
                            <SocialSharing />
                        }
                        {AuthStore.isAuthenticated() &&
                            <IconButton className={classes.menuButton}
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={(e) => this.openMenu(e, 'headerMenu')}>
                                <MoreVert />
                            </IconButton>
                        }
                        <HeaderDropdownMenu />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
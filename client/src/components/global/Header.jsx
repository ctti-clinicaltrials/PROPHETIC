import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AuthStore from '../../stores/AuthStore';
import MainStore from '../../stores/MainStore';
import HeaderDropdownMenu from './HeaderDropdownMenu';
import CTTI_logo from '../../images/CTTI_logo.png';
import CTTI_logo_crop from '../../images/CTTI_logo_crop.png';
import { Color } from '../../theme/theme';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { MoreVert } from '@material-ui/icons'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SocialSharing from "./SocialSharing";

const styles = theme => ({
    appBar: {
        backgroundColor: Color.white,
        minHeight: 105
    },
    avatar: {
        position: 'absolute',
        top: 33,
        right: 126
    },
    flex: {
        flex: 1,
    },
    logo: {
        maxWidth: 200,
        marginBottom: -3,
    },
    logoCropped: {
        maxWidth: 64,
        marginBottom: -3,
        marginTop: 5,
    },
    drawerButton: {
        marginRight: 10,
        marginTop: 6
    },
    menuButton: {
        marginTop: 3
    },
    toolbar: {
        zIndex: theme.zIndex.drawer + 1
    }
});

@observer
class Header extends Component {

    openMenu = (event, i) => MainStore.setAnchorElement(event.currentTarget, i);

    toggleDrawer = (key) => MainStore.toggleDrawer(key);

    render() {
        const { userProfile } = AuthStore;
        const { classes } = this.props;

        return (
            <AppBar position="static"
                    className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    {/*{AuthStore.isAuthenticated() &&*/}
                    {/*<IconButton className={classes.drawerButton}*/}
                        {/*aria-label="Menu"*/}
                        {/*onClick={() => this.toggleDrawer('mainNavDrawer')}>*/}
                        {/*<MenuIcon />*/}
                    {/*</IconButton>}*/}
                    <Typography variant="h6"
                                color="inherit"
                                className={classes.flex}>
                       <img src={window.innerWidth >= 520 ? CTTI_logo : CTTI_logo_crop}
                            alt="CTTI logo"
                            className={window.innerWidth >= 520 ? classes.logo : classes.logoCropped}
                       />
                    </Typography>
                        {userProfile &&
                            <Avatar alt="your profile avatar" src={userProfile.picture} className={classes.avatar} />
                        }
                        {AuthStore.isAuthenticated() &&
                            <SocialSharing />
                        }
                        {AuthStore.isAuthenticated() &&
                            <IconButton className={classes.menuButton}
                                aria-owns={MainStore.anchorElements.has('headerMenu') ? 'menu-appbar' : null}
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
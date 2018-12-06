import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CTTI_logo from '../../images/CTTI_logo.png';
import CTTI_logo_crop from '../../images/CTTI_logo_crop.png';
import { Color } from '../../theme/theme';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = () => ({
    flex: {
        color: Color.gray,
        display: 'flex',
        flex: '1 0 auto',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
    },
    logo: {
        maxWidth: 400,
        marginBottom: -3,
    },
});

@observer
class NoMatch extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h6"
                            className={classes.flex}>
                    <img src={window.innerWidth >= 520 ? CTTI_logo : CTTI_logo_crop}
                         alt="CTTI logo"
                         className={window.innerWidth >= 520 ? classes.logo : classes.logoCropped}
                    />
                </Typography>
                <Typography variant="h6"
                            className={classes.flex} style={{textAlign: 'center'}}>
                    This page you're looking for can not be found. <br/>
                    Please check the address and try again.
                </Typography>
                <Button color="primary"
                        href="/trial-planning"
                        className={classes.flex}
                        style={{ margin: 20}}
                >
                    Trial Planning Application
                </Button>
                <Button color="primary" href="/data-sharing" className={classes.flex} style={{ margin: 20}}>
                    Publicly Available Downloads
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(NoMatch);
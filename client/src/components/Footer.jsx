import React, { Component } from 'react';
import { observer } from 'mobx-react';
import cyan from '@material-ui/core/colors/cyan';
import { Color } from '../theme/theme';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {

};

@observer
class Footer extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper square={true} elevation={2} style={{width: '100%', backgroundColor:  Color.medium_blue, height: 56, position: 'fixed', bottom: 0, left: 0}}>

                </Paper>
            </div>
        );
    }
}

export default Footer;
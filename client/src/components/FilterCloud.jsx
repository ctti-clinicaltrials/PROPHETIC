import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AuthStore from '../stores/AuthStore';
import MainStore from '../stores/MainStore';
import { Color } from '../theme/theme';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { Menu as MenuIcon, MoreVert } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();

const styles = {
    paper: {
        display: 'flex',
        backgroundColor: Color.white,
        minWidth: '100%',
        minHeight: 48,
        padding: 8,
        zIndex: theme.zIndex.drawer + 1,
        overflowX: 'auto',
    }
};

@observer
class FilterCloud extends Component {

    state = {
        chips: new Array(30).fill( Math.random()*Math.random(), 0, 30)
    };

    handleDelete = (i) => {
        console.log(i)
        // const chips = this.state.chips.filter(c => c !== i);
        // this.setState({
        //     chips: chips
        // })
    }

    render() {
        const { classes } = this.props;
        const { chips } = this.state;
        const renderedChips = chips.map((i) =>
            <Chip key={i}
                onDelete={() => this.handleDelete(i)}
                label="This is an exclusion"
                color="primary"
                variant="outlined"
            />
        )
        return (
            <Paper className={`${classes.paper} chipContainer`}>
                {renderedChips}
            </Paper>
        );
    }
}

export default withStyles(styles)(FilterCloud);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Slider} from "material-ui-slider";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    paper: {
        maxWidth: 400,
        minWidth: 400,
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        overflow: 'scroll',
        height: 'calc(100vh + 30px)',
        marginBottom: -40
    }
});

@observer
class ExclusionControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: 10,
            value2: 80,
            error: false
        }
    }

    handleChangeComplete = val => {
        this.setState({
            value1: val[0],
            value2: val[1]
        });
    };

    isBetween = (n, a, b) => {
        return /^\d+$/ && (n - a) * (n - b) >= 0
    };

    validateInput = val => {
        console.log(val.target.value)
        let str = val.target.value
        str = str.split('-').map(s => parseInt(s, 10));
        this.setState({
            value1: str[0],
            value2: str[1],
            error: !str.every(s => Number.isNaN(s) && (this.isBetween(s, 0, 100)))
        })
    };

    render() {
        const { error } = this.state;
        const { classes } = this.props;

        return (
            <Paper classes={classes.paper}>
                <Slider color="#bf4040"
                        value={[this.state.value1, this.state.value2]}
                        range
                        onChangeComplete={this.handleChangeComplete}
                        style={{width: 250, float: 'left'}}
                />
                <TextField
                    value={`${this.state.value1} - ${this.state.value2}`}
                    style={{width: 70, marginLeft: 20, marginBottom: 10}}
                    onChange={this.validateInput}
                    error={error}
                    helperText={error && 'Numbers must be between 0 - 100'}
                />

            </Paper>
        );
    }
}

ExclusionControls.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExclusionControls);
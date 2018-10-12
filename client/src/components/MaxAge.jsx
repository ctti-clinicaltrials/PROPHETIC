import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import {withStyles} from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import {Color} from "../theme/theme";

const styles = theme => ({
    wrapper: {
        margin: '8px 0px',
        padding: '0px 14px'
    },
    label: {marginBottom: 10},
    textField: {
        color: Color.dark_turquoise,
        // padding: '10px 0px 10px 14px'
    },
});

@observer
class MaxAge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxAge: false,
        }
    }

    handleChange = (input) => {
        this.setState({[input]: !this.state[input]})
    };

    render() {
        const {classes} = this.props;

        return (
            <span>
                <FormControlLabel
                    control={
                        <Switch
                            // checked={this.state.antoine}
                            onChange={() => this.handleChange('maxAge')}
                            value="Set Maximum Age Limit"
                        />
                    }
                    label="Set Maximum Age Limit"
                />
                <Collapse in={this.state.maxAge} classes={{wrapper: classes.wrapper}}>
                <TextField
                    // id="outlined-adornment-weight"
                    fullWidth={true}
                    variant="outlined"
                    label="Maximum Age"
                    value={this.state.age}
                    // onChange={this.handleChange('age')}
                    helperText="Must be greater than 18"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Years</InputAdornment>,
                        classes: {
                            input: classes.textField,
                            inputLabel: classes.label
                        },
                    }}
                />
                </Collapse>
            </span>
        );
    }
}

MaxAge.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaxAge)

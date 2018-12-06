import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import {Exc} from '../../exclusions';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import {Color} from '../../theme/theme';
import MainStore from '../../stores/MainStore';
import debounce from 'lodash.debounce';

const styles = () => ({
    wrapper: {
        margin: '8px 0px',
        padding: '0px 14px'
    },
    label: {marginBottom: 10},
    textField: { color: Color.dark_turquoise }
});

@observer
class MaxAge extends Component {

    waitForInput = debounce(value => MainStore.setExclusions(Exc.age, {min: 18, max: value}), 280);

    exclusionToggle = (input) => MainStore.toggleExclusion(input, {min: 18, max: 100});

    handleChange = e => {
        MainStore.setInputValue(Exc.age, e.target.value);
        this.waitForInput(parseInt(e.target.value, 10));
    };

    render() {
        const { classes, exclusions, inputValues } = this.props;
        const error = exclusions.has(Exc.age) && (isNaN(exclusions.get(Exc.age).range.max) || exclusions.get(Exc.age).range.max < 18);

        return (
            <span>
                <FormControlLabel
                    control={
                        <Switch
                            checked={exclusions.has(Exc.age)}
                            onChange={() => this.exclusionToggle(Exc.age)}
                            value="Set Maximum Age Limit"
                        />
                    }
                    label="Set Maximum Age Limit"
                />
                <Collapse in={exclusions.has(Exc.age)} classes={{wrapper: classes.wrapper}}>
                <TextField
                    error={error}
                    fullWidth={true}
                    variant="outlined"
                    label="Maximum Age"
                    value={inputValues.has(Exc.age) ? inputValues.get(Exc.age) : 100}
                    onChange={this.handleChange}
                    helperText={error && "Must be greater than or equal to 18"}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Years</InputAdornment>,
                        classes: { input: classes.textField }
                    }}
                />
                </Collapse>
            </span>
        );
    }
}

MaxAge.propTypes = {
    classes: PropTypes.object.isRequired,
    exclusions: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaxAge)

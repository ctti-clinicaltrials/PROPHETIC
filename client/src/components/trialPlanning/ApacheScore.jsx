import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import MainStore from "../../stores/MainStore";
import { Exc } from "../../exclusions";
import { Color } from '../../theme/theme'
import {Slider} from "material-ui-slider";
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import debounce from "lodash.debounce";

const styles = theme => ({
    wrapper: {
        margin: '8px 0px',
        padding: '0px 14px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: Color.dark_turquoise
    },
    textFieldColor: { color: Color.dark_turquoise },
});

@observer
class ApacheScore extends Component {

    waitForInput = debounce(value => MainStore.setExclusions(Exc.apache, {min: value[0], max: value[1]}), 280);

    exclusionToggle = (input) => MainStore.toggleExclusion(input, {min: 0, max: 71});

    getApacheRange = () => {
        const { exclusions } = MainStore;
        let apacheRange = {min: 0, max: 71};
        if(exclusions.has(Exc.apache)) apacheRange = exclusions.get(Exc.apache).range;
        return apacheRange;
    };

    setSliderRange = value => this.waitForInput(value);

    render() {
        const { classes, exclusions } = this.props;

        return (
           <span>
                <FormControlLabel
                    control={
                        <Switch
                            checked={exclusions.has(Exc.apache)}
                            onChange={() => this.exclusionToggle(Exc.apache)}
                            value="Set Apache II Score Range"
                        />
                    }
                    label="Set Apache II Score Range"
                />
                <Collapse in={exclusions.has(Exc.apache)} classes={{wrapper: classes.wrapper}}>
                        <Slider color="#bf4040"
                                value={[this.getApacheRange().min, this.getApacheRange().max]}
                                range
                                max={71}
                                onChangeComplete={this.setSliderRange}
                                style={{width: 175, float: 'left', marginLeft: 10}}
                        />
                        <TextField
                            disabled={true}
                            value={`${this.getApacheRange().min} - ${this.getApacheRange().max}`}
                            style={{width: 91, marginLeft: 10, marginTop: 7}}
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    input: classes.textFieldColor,
                                },
                            }}
                        />
                </Collapse>
            </span>
        );
    }
}

ApacheScore.propTypes = {
    classes: PropTypes.object.isRequired,
    exclusions: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApacheScore);
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import { Exc } from '../exclusions';
import {withStyles} from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import {Color} from "../theme/theme";
import {Slider} from "material-ui-slider";
import MainStore from "../stores/MainStore";

const styles = theme => ({
    wrapper: {
        margin: '8px 0px',
        padding: '0px 14px'
    },
    slider: {
        width: 175,
        float: 'left',
        marginLeft: 10
    },
    textField: {
        width: 91,
        marginLeft: 10,
        marginTop: 7
    },
    textFieldColor: { color: Color.dark_turquoise },
});

@observer
class WeightRange extends Component {

    exclusionToggle = (input) => {
        MainStore.toggleExclusion(input, {minWeight: 0, maxWeight: 250})
    };

    getWeightRange = () => {
        const { exclusions } = MainStore;
        let weightRange = {minWeight: 0, maxWeight: 250};
        if(exclusions.has(Exc.weight)) weightRange = exclusions.get(Exc.weight);
        return weightRange;
    };

    setSliderRange = val => {
        MainStore.setExclusions(Exc.weight, {minWeight: val[0], maxWeight: val[1]})
    };


    render() {
        const {classes} = this.props;
        const { exclusions } = MainStore;

        return (
            <span>
                <FormControlLabel
                    control={
                        <Switch
                            checked={exclusions.has(Exc.weight)}
                            onChange={() => this.exclusionToggle(Exc.weight)}
                            value="Set Weight Range"
                        />
                    }
                    label="Set Weight Range"
                />
                <Collapse in={exclusions.has(Exc.weight)} classes={{wrapper: classes.wrapper}}>
                    <div>
                        <Slider color="#bf4040"
                                value={[this.getWeightRange().minWeight, this.getWeightRange().maxWeight]}
                                range
                                max={250}
                                onChangeComplete={this.setSliderRange}
                                style={styles().slider}
                                // style={{
                                //     width: 175,
                                //     float: 'left',
                                //     marginLeft: 10
                                // }}
                        />
                        <TextField
                            disabled={true}
                            value={`${this.getWeightRange().minWeight} - ${this.getWeightRange().maxWeight}`}
                            className={classes.textField}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                                disableUnderline: true,
                                classes: { input: classes.textFieldColor }
                            }}
                        />
                    </div>
                </Collapse>
            </span>
        );
    }
}

WeightRange.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeightRange)

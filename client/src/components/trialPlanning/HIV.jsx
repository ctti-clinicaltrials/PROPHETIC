import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import { Exc } from '../../exclusions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MainStore from "../../stores/MainStore";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";

const styles = () => ({
    wrapper: {
        margin: '8px 0px',
        padding: '0px 14px'
    },
});

@observer
class HIV extends Component {

    exclusionToggle = (input) => {
        const { exclusions } = this.props;
        if(input === Exc.HIV && exclusions.has(Exc.HIV)) {
            if(exclusions.has(Exc.CD4400)) MainStore.deleteExclusion(Exc.CD4400);
            if(exclusions.has(Exc.CD4200)) MainStore.deleteExclusion(Exc.CD4200);
        }
        MainStore.toggleExclusion(input, !exclusions.has(input));
    };

    radioToggle = (r1, r2) => {
        MainStore.toggleExclusion(r1, true);
        MainStore.deleteExclusion(r2);
    };

    render() {
        const { classes, exclusions } = this.props;

        return (
            <span>
                <FormControlLabel
                    control={
                        <Switch
                            checked={exclusions.has(Exc.HIV)}
                            onChange={() => this.exclusionToggle(Exc.HIV)}
                            value="HIV"
                        />
                    }
                    label="HIV Positive"
                />
                <Collapse in={exclusions.has(Exc.HIV)} classes={{wrapper: classes.wrapper}}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={exclusions.has(Exc.CD4200)}
                                onChange={() => this.radioToggle(Exc.CD4200, Exc.CD4400)}
                                value="CD4200"
                            />
                        }
                        label="CD4 Count <200/µL"
                    />
                    <br/>
                    <FormControlLabel
                     control={
                         <Radio
                             checked={exclusions.has(Exc.CD4400)}
                             onChange={() => this.radioToggle(Exc.CD4400, Exc.CD4200)}
                             value="CD4400"
                         />
                     }
                     label="CD4 Count <400/µL"
                    />
                </Collapse>
            </span>
        );
    }
}

HIV.propTypes = {
    classes: PropTypes.object.isRequired,
    exclusions: PropTypes.object.isRequired,
};

export default withStyles(styles)(HIV);

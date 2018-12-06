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

    state = {
       radio: null
    };

    exclusionToggle = (exc) => {
        const { exclusions } = this.props;
        if(exclusions.has(Exc.CD4Count)) this.setState({radio: null});
        MainStore.toggleExclusion(exc, false);
    };

    radioToggle = (radio) => {
        let max = radio === Exc.CD4200 ? 200 : 400;
        this.setState({radio: radio});
        MainStore.deleteExclusions(Exc.CD4Count, false);
        if(radio !== null) MainStore.toggleExclusion(Exc.CD4Count, {min: 0, max: max});
    };

    render() {
        const { classes, exclusions } = this.props;
        const { radio } = this.state;

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
                                checked={exclusions.has(Exc.HIV) && !exclusions.has(Exc.CD4Count) && radio === null}
                                onChange={() => this.radioToggle(null)}
                                value="Any CD4 Count"
                            />
                        }
                        label="Any CD4 Count"
                    />
                    <br/>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={exclusions.has(Exc.HIV) && exclusions.has(Exc.CD4Count) && radio === Exc.CD4200}
                                onChange={() => this.radioToggle(Exc.CD4200)}
                                value="CD4200"
                            />
                        }
                        label="CD4 Count <200/µL"
                    />
                    <br/>
                    <FormControlLabel
                     control={
                         <Radio
                             checked={exclusions.has(Exc.HIV) && exclusions.has(Exc.CD4Count) && radio === Exc.CD4400}
                             onChange={() => this.radioToggle(Exc.CD4400)}
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

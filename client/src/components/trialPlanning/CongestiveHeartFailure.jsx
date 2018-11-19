import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import { Exc } from '../../exclusions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MainStore from "../../stores/MainStore";
import Collapse from "@material-ui/core/Collapse";
import Checkbox from "@material-ui/core/Checkbox";

const styles = () => ({
    wrapper: {
        margin: '8px 0px',
        padding: '0px 14px'
    },
});

@observer
class CongestiveHeartFailure extends Component {

    exclusionToggle = (input) => {
        const { exclusions } = this.props;
        MainStore.toggleExclusion(input, !exclusions.has(input));
        if(input === Exc.chf && exclusions.has(Exc.nyha)) {
            MainStore.toggleExclusion(Exc.nyha, !exclusions.has(Exc.nyha));
        }
    };

    render() {
        const { classes, exclusions } = this.props;

        return (
            <span>
                <FormControlLabel
                    control={
                        <Switch
                            checked={exclusions.has(Exc.chf)}
                            onChange={() => this.exclusionToggle(Exc.chf)}
                            value="Congestive Heart Failure"
                        />
                    }
                    label="Congestive Heart Failure"
                />
                <Collapse in={exclusions.has(Exc.chf)} classes={{wrapper: classes.wrapper}}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={exclusions.has(Exc.nyha) && exclusions.has(Exc.chf)}
                                onChange={() => this.exclusionToggle(Exc.nyha)}
                                value="NYHA Class IV or CHF Symptoms at Rest"
                            />
                        }
                        label="NYHA Class IV or CHF Symptoms at Rest?"
                    />
                </Collapse>
            </span>
        );
    }
}

CongestiveHeartFailure.propTypes = {
    classes: PropTypes.object.isRequired,
    exclusions: PropTypes.object.isRequired,
};

export default withStyles(styles)(CongestiveHeartFailure);

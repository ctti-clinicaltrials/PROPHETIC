import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import { Exc } from '../../exclusions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MainStore from "../../stores/MainStore";

@observer
class TrialParticipation extends Component {

    exclusionToggle = (input) => {
        const { exclusions } = this.props;
        MainStore.toggleExclusion(input, !exclusions.has(Exc.prevTrial))
    };

    render() {
        const { exclusions } = this.props;

        return (
            <span>
                <FormControlLabel
                    control={
                        <Switch
                            checked={exclusions.has(Exc.prevTrial)}
                            onChange={() => this.exclusionToggle(Exc.prevTrial)}
                            value="Participation in other clinical trial"
                        />
                    }
                    label="Participation in other clinical trial"
                />
            </span>
        );
    }
}

TrialParticipation.propTypes = {
    exclusions: PropTypes.object.isRequired,
};

export default TrialParticipation;

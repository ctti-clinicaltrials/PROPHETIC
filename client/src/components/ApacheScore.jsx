import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import { Color } from '../theme/theme'
import {Slider} from "material-ui-slider";
import TextField from "@material-ui/core/TextField";

import InputAdornment from '@material-ui/core/InputAdornment';

import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
    constructor(props) {
        super(props);
        this.state = {
            checkRadio: false,
            setApacheScore: false,
            minApacheScore: 0,
            maxApacheScore: 71
        }
    }

    validateInput = val => {

    };

    exclusionToggle = (input) => {
        this.setState({[input]: !this.state[input]})
    };

    setSliderRange = val => {
        this.setState({
            minApacheScore: val[0],
            maxApacheScore: val[1]
        });
    };

    render() {
        const { classes } = this.props;

        return (
           <span>
                <FormControlLabel
                    control={
                        <Switch
                            // checked={this.state.antoine}
                            onChange={() => this.exclusionToggle('setApacheScore')}
                            value="Set Apache II Score Range"
                        />
                    }
                    label="Set Apache II Score Range"
                />
                <Collapse in={this.state.setApacheScore} classes={{wrapper: classes.wrapper}}>
                    <div>
                        <Slider color="#bf4040"
                                value={[this.state.minApacheScore, this.state.maxApacheScore]}
                                range
                                max={71}
                                onChangeComplete={this.setSliderRange}
                                style={{width: 175, float: 'left', marginLeft: 10}}
                        />
                        <TextField
                            disabled={true}
                            value={`${this.state.minApacheScore} - ${this.state.maxApacheScore}`}
                            style={{width: 91, marginLeft: 10, marginTop: 7}}
                            onChange={this.validateInput}
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    input: classes.textFieldColor,
                                },
                            }}
                        />
                    </div>
                    {/*<FormControlLabel value="any"*/}
                                      {/*control={*/}
                                          {/*<Radio checked={this.state.checkRadio}*/}
                                                 {/*onChange={() => this.handleChange('checkRadio')}*/}
                                          {/*/>*/}
                                      {/*}*/}
                                      {/*label="Any"*/}
                    {/*/>*/}
                    {/*<FormGroup row>*/}
                        {/*<FormControlLabel value="min" control={<Radio/>} label="Min"*/}
                                          {/*onChange={() => this.handleChange('checkRadio')}*/}
                        {/*/>*/}
                        {/*<TextField*/}
                            {/*value={100}*/}
                            {/*style={{width: 93, marginLeft: 10, marginTop: 4}}*/}
                            {/*onChange={this.validateInput}*/}
                            {/*InputProps={{*/}
                                {/*startAdornment: <InputAdornment position="start"> ≥ </InputAdornment>,*/}
                            {/*}}*/}
                        {/*/>*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup row>*/}
                        {/*<FormControlLabel value="max" control={<Radio/>} label="Max"*/}
                                          {/*onChange={() => this.handleChange('checkRadio')}*/}
                        {/*/>*/}
                        {/*<TextField*/}
                            {/*value={100}*/}
                            {/*style={{width: 93, marginLeft: 10, marginTop: 4}}*/}
                            {/*onChange={this.validateInput}*/}
                            {/*InputProps={{*/}
                                {/*startAdornment: <InputAdornment position="start"> ≤ </InputAdornment>,*/}
                            {/*}}*/}
                        {/*/>*/}
                    {/*</FormGroup>*/}
                </Collapse>
            </span>
        );
    }
}

ApacheScore.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApacheScore);
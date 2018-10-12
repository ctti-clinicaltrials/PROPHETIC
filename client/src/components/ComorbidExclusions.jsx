import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {observer} from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import { Color } from '../theme/theme'
import Paper from '@material-ui/core/Paper';
import {Slider} from "material-ui-slider";
import GeneralExclusions from "./GeneralExclusions";
import TextField from "@material-ui/core/TextField";

import InputAdornment from '@material-ui/core/InputAdornment';

import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
    wrapper: {
        margin: '8px 0px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: Color.dark_turquoise
    },
    disabledTextFieldColor: { color: Color.dark_turquoise },
});

@observer
class ComorbidExclusions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 100,
            maxAge: false,
            setWeight: false,
            setApacheScore: false,
            showGeneral: false,
            value1: 0,
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

    validateInput = val => {

    };

    handleChange = (input) => {
        this.setState({[input]: !this.state[input]})
    };

    render() {
        const { error } = this.state;
        const { classes } = this.props;

        return (
            <ExpansionPanel>
                {/*<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>*/}
                    {/*<Typography className={classes.heading}>Comorbid Conditions</Typography>*/}
                {/*</ExpansionPanelSummary>*/}
                {/*<ExpansionPanelDetails>*/}
                    {/*<FormControl component="fieldset">*/}
                        {/*<FormGroup>*/}
                            {/*<FormControlLabel*/}
                                {/*control={*/}
                                    {/*<Switch*/}
                                        {/*// checked={this.state.gilad}*/}
                                        {/*// onChange={this.handleChange('gilad')}*/}
                                        {/*value="> 24 hours Prior Antibacterial Therapy"*/}
                                    {/*/>*/}
                                {/*}*/}
                                {/*label="> 24 hours Prior Antibacterial Therapy"*/}
                            {/*/>*/}
                            {/*<Divider/>*/}
                            {/*<FormControlLabel*/}
                                {/*control={*/}
                                    {/*<Switch*/}
                                        {/*// checked={this.state.jason}*/}
                                        {/*// onChange={this.handleChange('Participation in other clinical trial')}*/}
                                        {/*value="Participation in other clinical trial"*/}
                                    {/*/>*/}
                                {/*}*/}
                                {/*label="Participation in other clinical trial"*/}
                            {/*/>*/}
                            {/*<Divider/>*/}
                            {/*<FormControlLabel*/}
                                {/*control={*/}
                                    {/*<Switch*/}
                                        {/*// checked={this.state.antoine}*/}
                                        {/*onChange={() => this.handleChange('maxAge')}*/}
                                        {/*value="Set Maximum Age Limit"*/}
                                    {/*/>*/}
                                {/*}*/}
                                {/*label="Set Maximum Age Limit"*/}
                            {/*/>*/}
                            {/*<Collapse in={this.state.maxAge} classes={{wrapper: classes.wrapper}}>*/}
                                {/*<TextField*/}
                                    {/*// id="outlined-adornment-weight"*/}
                                    {/*// className={classNames(classes.margin, classes.textField)}*/}
                                    {/*fullWidth={true}*/}
                                    {/*variant="outlined"*/}
                                    {/*label="Maximum Age"*/}
                                    {/*value={this.state.age}*/}
                                    {/*// onChange={this.handleChange('age')}*/}
                                    {/*helperText="Must be greater than 18"*/}
                                    {/*InputProps={{*/}
                                        {/*endAdornment: <InputAdornment position="end">Years</InputAdornment>,*/}
                                    {/*}}*/}
                                {/*/>*/}
                            {/*</Collapse>*/}
                            {/*<Divider/>*/}
                            {/*<FormControlLabel*/}
                                {/*control={*/}
                                    {/*<Switch*/}
                                        {/*// checked={this.state.antoine}*/}
                                        {/*onChange={() => this.handleChange('setWeight')}*/}
                                        {/*value="Set Weight Range"*/}
                                    {/*/>*/}
                                {/*}*/}
                                {/*label="Set Weight Range"*/}
                            {/*/>*/}
                            {/*<Collapse in={this.state.setWeight} classes={{wrapper: classes.wrapper}}>*/}
                                {/*<div>*/}
                                    {/*<Slider color="#bf4040"*/}
                                            {/*value={[this.state.value1, this.state.value2]}*/}
                                            {/*range*/}
                                            {/*max={350}*/}
                                            {/*onChangeComplete={this.handleChangeComplete}*/}
                                            {/*style={{width: 190, float: 'left', marginLeft: 10}}*/}
                                    {/*/>*/}
                                    {/*<TextField*/}
                                        {/*disabled={true}*/}
                                        {/*value={`${this.state.value1} - ${this.state.value2}`}*/}
                                        {/*style={{width: 93, marginLeft: 10, marginTop: 4}}*/}
                                        {/*onChange={this.validateInput}*/}
                                        {/*error={error}*/}
                                        {/*helperText={error && 'Numbers must be between 0 - 100'}*/}
                                        {/*InputProps={{*/}
                                            {/*endAdornment: <InputAdornment position="end">Kg</InputAdornment>,*/}
                                            {/*disableUnderline: true,*/}
                                            {/*classes: {*/}
                                                {/*input: classes.disabledTextFieldColor,*/}
                                            {/*},*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                            {/*</Collapse>*/}
                            {/*<Divider/>*/}
                            {/*<FormControlLabel*/}
                                {/*control={*/}
                                    {/*<Switch*/}
                                        {/*// checked={this.state.antoine}*/}
                                        {/*onChange={() => this.handleChange('setApacheScore')}*/}
                                        {/*value="Set Apache II Score Range"*/}
                                    {/*/>*/}
                                {/*}*/}
                                {/*label="Set Apache II Score Range"*/}
                            {/*/>*/}
                            {/*<Collapse in={this.state.setApacheScore} classes={{wrapper: classes.wrapper}}>*/}
                                {/*<RadioGroup*/}
                                    {/*aria-label="apache II score"*/}
                                    {/*name="apacheScore"*/}
                                    {/*// className={classes.group}*/}
                                    {/*// value={this.state.value}*/}
                                    {/*// onChange={this.handleChange}*/}
                                {/*>*/}
                                    {/*<FormControlLabel value="any" control={<Radio/>} label="Any"/>*/}
                                    {/*<FormGroup row>*/}
                                        {/*<FormControlLabel value="min" control={<Radio/>} label="Min"/>*/}
                                        {/*<TextField*/}
                                            {/*value={100}*/}
                                            {/*style={{width: 93, marginLeft: 10, marginTop: 4}}*/}
                                            {/*onChange={this.validateInput}*/}
                                            {/*error={error}*/}
                                            {/*helperText={error && 'Numbers must be between 0 - 100'}*/}
                                            {/*InputProps={{*/}
                                                {/*startAdornment: <InputAdornment position="start"> ≥ </InputAdornment>,*/}
                                            {/*}}*/}
                                        {/*/>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                        {/*<FormControlLabel value="max" control={<Radio/>} label="Max"/>*/}
                                        {/*<TextField*/}
                                            {/*value={100}*/}
                                            {/*style={{width: 93, marginLeft: 10, marginTop: 4}}*/}
                                            {/*onChange={this.validateInput}*/}
                                            {/*error={error}*/}
                                            {/*helperText={error && 'Numbers must be between 0 - 100'}*/}
                                            {/*InputProps={{*/}
                                                {/*startAdornment: <InputAdornment position="start"> ≤ </InputAdornment>,*/}
                                            {/*}}*/}
                                        {/*/>*/}
                                    {/*</FormGroup>*/}
                                {/*</RadioGroup>*/}
                            {/*</Collapse>*/}
                        {/*</FormGroup>*/}
                    {/*</FormControl>*/}
                {/*</ExpansionPanelDetails>*/}
            </ExpansionPanel>
        );
    }
}

ComorbidExclusions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComorbidExclusions);
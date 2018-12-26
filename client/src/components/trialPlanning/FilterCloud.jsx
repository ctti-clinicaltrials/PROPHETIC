import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MainStore from '../../stores/MainStore';
import { Color } from '../../theme/theme';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Collapse from "@material-ui/core/Collapse";
import {Exc} from "../../exclusions";
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const styles = () => ({
    chip: { marginRight: 8 },
    wrapperInner: {
        display: 'flex',
        backgroundColor: Color.white,
        minWidth: '100%',
        minHeight: 48,
        padding: '8px 20px',
        zIndex: 2,
        overflowX: 'scroll',
    },
    wrapper: {
        overflowX: 'scroll',
        minWidth: '100%'
    }
});

@observer
class FilterCloud extends Component {

    componentDidUpdate() { // Todo: Hide/show buttons appropriately
        let width = 0;
        const container = document.getElementById('container');
        let xScrollWidth = container.scrollWidth;
        let b = container.querySelectorAll('[role="button"]');
        if(b.length) b.forEach(v => width = width + v.offsetWidth);
        MainStore.setChipContainerScrollButtonRight(width ,xScrollWidth);
    }

    buttonClick = (direction) => {
        const container = document.getElementsByClassName('chipContainer')[1];
        if(direction === 'right') MainStore.setChipContainerScrollButtonLeft(true);
        this.sideScroll(container,direction,25,100,10);
    };

    sideScroll = (element,direction,speed,distance,step) => {
        let scrollAmount = 0;
        let slideTimer = setInterval(() => {
            if(direction === 'left'){
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if(scrollAmount >= distance){
                window.clearInterval(slideTimer);
            }
        }, speed);
    };

    deleteChip = (i) => {
        const exclusion = i[0];
        const value = i[1].range;
        MainStore.setInputValue(exclusion, value, true);
        MainStore.deleteExclusions(exclusion, value);
    };

    render() {
        const { classes } = this.props;
        const { exclusions, showScrollButtonLeft, showScrollButtonRight } = MainStore;
        {/*<Button variant="fab" mini color="secondary" aria-label="Add">*/}
            {/*<ArrowLeftIcon />*/}
        // </Button>

        return (
            <Paper className={`${classes.wrapper} chipContainer`}>
                <Collapse in={!!exclusions.size}
                          id="container"
                          classes={{wrapper: classes.wrapper, wrapperInner: `${classes.wrapperInner} chipContainer`}}
                >
                    <Button variant="fab" mini
                            color="secondary"
                            style={{position: 'fixed', top: 100, left: 0, opacity: .8, display: showScrollButtonLeft && !!exclusions.size ? 'block' : 'none'}}
                            aria-label="Add" onClick={() => this.buttonClick('left')}>
                        <ArrowLeftIcon />
                    </Button>
                    {
                        exclusions.entries().map((i) => {
                            let info = i[0] === Exc.CD4Count ? `<${exclusions.get(Exc.CD4Count).range.max}/µL` : ``;
                            return <Chip key={i}
                                  className={classes.chip}
                                  onDelete={() => this.deleteChip(i)}
                                  label={`${i[0]} ${info}`}
                                  color="primary"
                                  variant="outlined"
                            />
                        })
                    }
                    {/*position: fixed; top: 100px; right: 0px; opacity: .8;*/}
                    <Button variant="fab" mini
                            color="secondary"
                            style={{position: 'fixed', top: 100, right: 0, opacity: .8, display: showScrollButtonRight && !!exclusions.size ? 'block' : 'none'}}
                            aria-label="Add" onClick={() => this.buttonClick('right')}>
                        <ArrowRightIcon />
                    </Button>
                </Collapse>
            </Paper>
        );
    }
}

export default withStyles(styles)(FilterCloud);
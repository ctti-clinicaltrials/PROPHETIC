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

    componentDidUpdate() {
        let width = this.calculateTotalChipWidth().width;
        let xScrollWidth = this.calculateTotalChipWidth().xScrollWidth;
        if(!MainStore.onlyShowScrollButtonRight) MainStore.setChipContainerScrollButtonRight(width, xScrollWidth, null, null);
    };

    calculateTotalChipWidth() {
        let width = 0;
        const container = document.getElementById('container');
        let xScrollWidth = container.scrollWidth;
        let b = container.querySelectorAll('[role="button"]');
        if(b.length) b.forEach(v => width = width + v.offsetWidth);
        return {
            width: width,
            xScrollWidth: xScrollWidth
        }
    }

    deleteChip = (i) => {
        const exclusion = i[0];
        const value = i[1].range;
        MainStore.setInputValue(exclusion, value, true);
        MainStore.deleteExclusions(exclusion, value);
    };

    scrollButtonClick = (direction) => {
        const container = document.getElementsByClassName('chipContainer')[1];
        const width = this.calculateTotalChipWidth().width;
        const xScrollWidth = this.calculateTotalChipWidth().xScrollWidth;
        if(direction === 'right') MainStore.setChipContainerScrollButtonLeft(true);
        if(direction === 'left') MainStore.setChipContainerScrollButtonRight(width, xScrollWidth, null, null);
        this.sideScroll(container, direction, 25, 200, 10);
    };

    showScrollButtons = (element) => {
        const scrollWidth = element.scrollWidth;
        const offsetWidth = element.offsetWidth;
        const scrollLeft = element.scrollLeft;
        if(scrollWidth - offsetWidth === scrollLeft) MainStore.setChipContainerScrollButtonRight(offsetWidth, scrollWidth, true, true);
        if(scrollLeft === 0) MainStore.setChipContainerScrollButtonLeft(false);
    };

    sideScroll = (element,direction,speed,distance,step) => {
        let scrollAmount = 0;
        let slideTimer = setInterval(() => {
            direction === 'left' ? element.scrollLeft -= step : element.scrollLeft += step;
            this.showScrollButtons(element);
            scrollAmount += step;
            if(scrollAmount >= distance) window.clearInterval(slideTimer);
        }, speed);
    };

    render() {
        const { classes } = this.props;
        const { exclusions, showScrollButtonLeft, showScrollButtonRight } = MainStore;

        return (
            <Paper className={`${classes.wrapper} chipContainer`}>
                <Collapse in={!!exclusions.size}
                          id="container"
                          ref={this.collapse}
                          classes={{wrapper: classes.wrapper, wrapperInner: `${classes.wrapperInner} chipContainer`}}
                >
                    <Button variant="fab" mini
                            color="secondary"
                            style={{position: 'fixed', top: 102, left: 0, opacity: .8, display: showScrollButtonLeft && !!exclusions.size ? 'block' : 'none'}}
                            aria-label="Add" onClick={() => this.scrollButtonClick('left')}>
                        <ArrowLeftIcon />
                    </Button>
                    {
                        exclusions.entries().map((i, index) => {
                            let info = i[0] === Exc.CD4Count ? `<${exclusions.get(Exc.CD4Count).range.max}/µL` : ``;
                            return <Chip key={index}
                                      id={index === 0 ? 'firstChip' : ''}
                                      className={classes.chip}
                                      onDelete={() => this.deleteChip(i)}
                                      label={`${i[0]} ${info}`}
                                      color="primary"
                                      variant="outlined"
                                    />
                        })
                    }
                    <Button variant="fab" mini
                            color="secondary"
                            style={{position: 'fixed', top: 102, right: 0, opacity: .8, display: showScrollButtonRight && !!exclusions.size ? 'block' : 'none'}}
                            aria-label="Add" onClick={() => this.scrollButtonClick('right')}>
                        <ArrowRightIcon />
                    </Button>
                </Collapse>
            </Paper>
        );
    }
}

export default withStyles(styles)(FilterCloud);
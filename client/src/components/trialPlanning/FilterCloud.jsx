import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MainStore from '../../stores/MainStore';
import { Color } from '../../theme/theme';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Collapse from "@material-ui/core/Collapse";
import {Exc} from "../../exclusions";

const styles = theme => ({
    chip: { marginRight: 8 },
    wrapperInner: {
        display: 'flex',
        backgroundColor: Color.white,
        minWidth: '100%',
        minHeight: 48,
        padding: '8px 20px',
        zIndex: 2,
        overflowX: 'auto',
    },
    wrapper: {
        overflowX: 'auto',
        minWidth: '100%'
    }
});

@observer
class FilterCloud extends Component {

    deleteChip = (i) => {
        const exclusion = i[0];
        const value = i[1].range;
        MainStore.setInputValue(exclusion, value, true);
        MainStore.deleteExclusions(exclusion, value);
    };

    render() {
        const { classes } = this.props;
        const { exclusions } = MainStore;

        return (
            <Paper className={`${classes.wrapper} chipContainer`}>
                <Collapse in={!!exclusions.size}
                          classes={{wrapper: classes.wrapper, wrapperInner: `${classes.wrapperInner} chipContainer`}}
                >
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
                </Collapse>
            </Paper>
        );
    }
}

export default withStyles(styles)(FilterCloud);
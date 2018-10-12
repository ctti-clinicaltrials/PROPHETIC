import React, { Component } from 'react';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        display: 'flex'
    },
    content: {
        margin: '10px 10px 10px 0px',
        flexGrow: 1,
        alignSelf: 'start',
        padding: theme.spacing.unit * 3,
        height: '92vh',
        overflow: 'auto',
    },
});

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { action: 'one', pv: 50000 },
                { action: 'two', pv: 35000 },
                { action: 'three', pv: 25000 },
                { action: 'four', pv: 15000 },
                { action: 'five', pv: 8000 }
            ]
        }
    }

    render() {

        const { Text } = Guide;
        const { DataView } = DataSet;
        const { classes } = this.props;
        const dv = new DataView().source(this.state.data);
        dv.transform({
            type: 'percent',
            field: 'pv',
            dimension: 'action',
            as: 'percent'
        });
        let data = dv.rows;
        const cols = {
            percent: {
                nice: false
            }
        };
        return (
            <Paper className={classes.content} square>
                <Chart height={400}
                       data={data}
                       scale={cols}
                       padding={[ 20, 120, 95 ]}
                       forceFit
                >
                    <Tooltip showTitle={false}
                             itemTpl='<li data-index={index} style="margin-bottom:4px;">
                                        <span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/>
                                        <span style="padding-left: 16px">group：{pv}</span><br/><span style="padding-left: 16px">amount：{percent}</span><br/>
                                      </li>'/>
                    <Coord type='rect'
                           transpose scale={[1,-1]}
                    />
                    <Legend />
                    <Guide>
                        {data.map((obj) => {
                            return  (
                                <Text
                                    key={obj.action}
                                    top={true}
                                    position={{
                                        action: obj.action,
                                        percent: 'median'}}
                                    content={parseInt(obj.percent * 100) + '%'}
                                    style={{
                                        fill: '#fff',
                                        fontSize: '12',
                                        textAlign: 'center',
                                        shadowBlur: 2,
                                        shadowColor: 'rgba(0, 0, 0, .45)'}}
                                />
                            )
                        })}
                    </Guide>
                    <Geom type="intervalSymmetric"
                          position="action*percent"
                          shape='funnel'
                          color={['action', '#ff0000-#00ff00']}
                          tooltip={['action*pv*percent', (action, pv, percent) => {
                              return {
                                  name: action,
                                  percent: parseInt(percent * 100) + '%',
                                  pv: pv
                              };
                          }]}
                    >
                        <Label content={['action*pv',(action, pv) => {
                            return action + ' ' + pv;
                        }]}
                               offset={35}
                               labeLine={{lineWidth: 1,
                                   stroke: 'rgba(0, 0, 0, 0.15)'}}
                        />
                    </Geom>
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(styles)(Graph);
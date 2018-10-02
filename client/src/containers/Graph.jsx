import React, { Component } from 'react';
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
//     ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
//     Label, LabelList } from 'recharts';
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
import { Slider } from 'material-ui-slider';
import TextField from '@material-ui/core/TextField';

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
            ],
            value1: 10,
            value2: 80,
            error: false
        }
    }

    handleChangeComplete = val => {
        this.setState({
            value1: val[0],
            value2: val[1],
            data: [
                { action: 'one', pv: 55000 },
                { action: 'two', pv: 30000 },
                { action: 'three', pv: 28000 },
                { action: 'four', pv: 12000 },
                { action: 'five', pv: 2000 }
            ]
        });
    };

    isBetween = (n, a, b) => {
        return /^\d+$/ && (n - a) * (n - b) >= 0
    };

    validateInput = val => {
        console.log(val.target.value)
        let str = val.target.value
        str = str.split('-').map(s => parseInt(s, 10));
        this.setState({
            value1: str[0],
            value2: str[1],
            error: !str.every(s => Number.isNaN(s) && (this.isBetween(s, 0, 100)))
        })
    };

    render() {

        const { Text } = Guide;
        const { DataView } = DataSet;
        const { error } = this.state;
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
            <div>
                <h2>Graph</h2>
                <Slider color="#bf4040"
                    value={[this.state.value1, this.state.value2]}
                    range
                    onChangeComplete={this.handleChangeComplete}
                    style={{width: 300, float: 'left'}}
                />
                <TextField value={`${this.state.value1} - ${this.state.value2}`}
                           style={{width: 70, marginLeft: 20, marginBottom: 10}}
                           onChange={this.validateInput}
                           error={error}
                           helperText={error && 'Numbers must be between 0 - 100'}
                />
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
                {/*<LineChart*/}
                    {/*width={800}*/}
                    {/*height={400}*/}
                    {/*data={data}*/}
                    {/*margin={{ top: 5, right: 20, left: 10, bottom: 5 }}*/}
                {/*>*/}
                    {/*<XAxis dataKey="name" />*/}
                    {/*<Tooltip />*/}
                    {/*<CartesianGrid stroke="#f5f5f5" />*/}
                    {/*<Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />*/}
                    {/*<Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />*/}
                {/*</LineChart>*/}

                {/*<LineChart*/}
                    {/*width={1200}*/}
                    {/*height={200}*/}
                    {/*data={data03}*/}
                    {/*margin={{ top: 5, right: 20, left: 10, bottom: 5 }}*/}
                {/*>*/}
                    {/*<YAxis dataKey="price"/>*/}
                    {/*<XAxis dataKey="date" />*/}
                    {/*<Tooltip />*/}
                    {/*<CartesianGrid stroke="#f5f5f5" />*/}
                    {/*<Line type="monotone" dataKey="price" stroke="#66BB6A" yAxisId={0} />*/}
                {/*</LineChart>*/}
            </div>
        );
    }
}

export default Graph;
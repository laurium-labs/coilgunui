
import * as React from 'react';
import './App.css';
import Plot from 'react-plotly.js';
import { Typography, Button } from 'antd'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Link } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LoadingSpin from './LoadingSpin';
const { Text } = Typography
interface IState {
    result: ISimulationResult;
    simulationRunning: boolean | undefined;
    params: any,
}
const apiUrl = "http://localhost:8009"

interface ISimulationResult {
    magnetization: number[];
    velocity: number[];
    displacement: number[];
    irreversibleMagentization: number[];
    endTime: number
}

export default class Plots extends React.Component {

    public readonly state: IState = {
        result: { magnetization: [], velocity: [], displacement: [], irreversibleMagentization: [], endTime: 1 },
        simulationRunning: false,
        params: {},

    }
    public async componentDidMount() {
        // Get simulation params
        const params = await fetch(`${apiUrl}/params`)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                return myJson
            });
        this.setState({ params })
    }

    private paramChanged(event: any, path: string[]) {
        let currentParams = this.state.params
        path.forEach(k => {
            currentParams = currentParams[k]
        })
        currentParams.val = event.target.value
        this.setState({ params: this.state.params })
    }
    fetchXAxis() {
        const axis: number[] = []
        var i = 0
        const length = this.state.result.magnetization.length
        const halfLength = length / 2
        var dis = this.state.result.endTime / length
        var double = dis * 1.5
        var half = dis / 2
        for (i; i < length; i++) {
            //These if statements will emphasize the change that happens in the returned data, not the stable line that takes up most of the graph
            //you would think this would lead to inaccuracy, but end time doesnt change graph shape at all on current simulator
            //will just show the same line, willl take 40 seconds to complete or 2, will be the same
            if (i > halfLength) {
                axis.push(double + axis[i - 1])
            }
            if (i <= halfLength) {
                if (i > 0) {
                    axis.push(half + axis[i - 1])
                }
                else {
                    axis.push(half)
                }
            }
        }
        return axis
    }
    public render() {
        const paramsComponents = this.getParams(this.state.params, [])

        return <>
            <div style={{ flexDirection: 'column' }}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Text style={{ color: 'black' }}>Parameters</Text>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="Params">
                            <div className="ParamsContainer" style={{ flexDirection: 'row' }}>
                                {paramsComponents}
                            </div>
                            <Typography style={{ paddingTop: 15, color: 'black' }}>These parameters are generated from <Link
                                href={"https://github.com/laurium-labs/CoilGun.jl/blob/master/src/api/default_components.jl"}
                                target="_blank"
                            >
                                CoilGun.jl
                </Link></Typography>
                        </div >
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <div>
                    {this.state.simulationRunning && <>
                        <Text style={{ fontSize: '12', color: 'white' }}>Processing</Text>
                        <LoadingSpin />
                    </>
                    }
                    {!this.state.simulationRunning && <Button disabled={this.state.simulationRunning} onClick={this.runSimulationClicked} style={{ margin: 10, color: 'black' }}>Run Simulation</Button>}
                </div>
                <div>
                    <Plot
                        data={[
                            {
                                x: this.fetchXAxis(),
                                y: this.state.result.velocity,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: 'red' },
                            },
                        ]}
                        layout={{
                            title: 'velocity',
                            xaxis: { title: "Time (seconds)" },
                            yaxis: { title: "m/s" },
                            width: 500,
                            height: 300,
                            plot_bgcolor: "#F8F8F8"


                        }}
                    />
                    <Plot
                        data={[
                            {
                                x: this.fetchXAxis(),
                                y: this.state.result.magnetization,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: 'red' },
                            },
                        ]}
                        layout={{
                            title: 'Magnetization',
                            xaxis: { title: "Time (seconds)" },
                            yaxis: { title: "[A/m]" },
                            width: 500,
                            height: 300,
                            plot_bgcolor: "#F8F8F8"


                        }}
                    />
                </div>
                <div>
                    <Plot
                        data={[
                            {
                                x: this.fetchXAxis(),
                                y: this.state.result.irreversibleMagentization,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: 'red' },
                            },
                        ]}
                        layout={{
                            title: 'Irriversible Magnetization',
                            xaxis: { title: "Time (seconds)" },
                            yaxis: { title: "[A/m]" },
                            width: 500,
                            height: 300,
                            plot_bgcolor: "#F8F8F8"


                        }} />
                    <Plot
                        data={[
                            {
                                x: this.fetchXAxis(),
                                y: this.state.result.displacement,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: 'red' },
                            },
                        ]}
                        layout={{
                            title: 'Displacement',
                            xaxis: { title: "Time (seconds)" },
                            yaxis: { title: "m" },
                            width: 500,
                            height: 300,
                            plot_bgcolor: "#F8F8F8"


                        }} />
                </div>
            </div>
        </>
    }


    private getParams(params: any, path: string[]) {
        var idCount = 0
        return <React.Fragment key={path.join(".")}>
            <div>
                {path.length > 0 && <h4 style={{ textAlign: 'center' }}>{(path[path.length - 1] !== "ip") && path[path.length - 1]}</h4>}
                {
                    Object.keys(params)
                        .filter(k => Object.keys(params[k]).length > 0)
                        .sort((a, b) => {
                            if (this.isUnit(params[a]) && !this.isUnit(params[b])) {
                                return -1
                            } else if (!this.isUnit(params[a]) && this.isUnit(params[b])) {
                                return 1
                            } else {
                                return 0
                            }
                        })
                        .map(k => {
                            idCount++
                            const newPath = [...path]
                            newPath.push(k)
                            const onChange = (event: any) => this.paramChanged(event, newPath)
                            if (this.isUnit(params[k])) {
                                return <div className="ParamRow" key={newPath.join(".")} style={{ textAlign: 'right', alignContent: 'center', paddingTop: 2, width: '80%' }} >
                                    <label style={{ fontSize: 17 }} htmlFor={path.join(".") + idCount}>{k}({params[k].unit})</label>
                                    <input style={{ fontSize: 15 }} id={path.join(".") + idCount} value={params[k].val} className="Param" onChange={onChange} ></input>
                                </div>
                            } else {
                                return this.getParams(params[k], newPath)
                            }
                        })}
            </div>
        </React.Fragment>
    }



    private paramsToUrl() {
        const noUnits = this.stripUnits(this.state.params)
        return this.toDotNotation(noUnits, [], []).join('&')

    }
    private stripUnits(ob: any) {
        const retval: any = {}
        Object.keys(ob).forEach(k => {
            if (this.isUnit(ob[k])) {
                retval[k] = ob[k].val
            } else {
                retval[k] = this.stripUnits(ob[k])
            }
        })
        return retval
    }

    private isUnit(ob: any) {
        const isSetsEqual = (a: any, b: any) => {
            return a.size === b.size && Array.from(a).every(value => b.has(value));
        }
        const set1 = new Set(Object.keys(ob))
        const set2 = new Set(["val", "unit"])
        return isSetsEqual(set1, set2)
    }

    private toDotNotation(ob: any, currentPath: string[], result: string[]) {
        Object.keys(ob).forEach(k => {
            const newPath = [...currentPath]
            newPath.push(k)
            if (isNaN(ob[k])) {
                this.toDotNotation(ob[k], newPath, result)
            } else {
                const dotPath = newPath.join(".")
                if (dotPath === "start_time") {
                    if (ob[k] < 0) {
                        ob[k] = 0
                    }
                }
                if (dotPath === "end_time") {
                    if (ob[k] > 4) {
                        ob[k] = 4
                    }
                }
                result.push(dotPath + "=" + ob[k])
            }
        })
        return result
    }
    private runSimulationClicked = async () => {
        this.setState({ simulationRunning: true })
        const urlParams = this.paramsToUrl()

        const result = await fetch(`${apiUrl}/simulate?${urlParams}`).then((response) => {
            return response.json();
        })
            .then((myJson) => {
                return myJson
            });
        this.setState({ result })

        this.setState({ simulationRunning: false })
    }

}
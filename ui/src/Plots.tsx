
import * as React from 'react';
import './App.css';
import Plot from 'react-plotly.js';
import { Typography, Button } from 'antd'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Link, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LoadingSpin from './LoadingSpin';
const { Text } = Typography
interface IState {
    result: ISimulationResult;
    simulationRunning: boolean | undefined;
    params: any,
    errorMessage: string
}

// const apiUrl = "http://localhost:8009"

const apiUrl = "https://quiet-beach-96378.herokuapp.com"

interface ISimulationResult {
    time: number[]
    magnetization: number[];
    velocity: number[];
    displacement: number[];
    irreversibleMagentization: number[];
}

export default class Plots extends React.Component {

    public readonly state: IState = {
        result: { time: [], magnetization: [], velocity: [], displacement: [], irreversibleMagentization: [] },
        simulationRunning: false,
        params: {},
        errorMessage: ''

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
                            <Text style={{ fontSize: 18 }} >The less coils the faster the simulation, parameters may take a second to load</Text>

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

                {
                    this.state.errorMessage && <p style={{ color: '#ff6666' }}>{this.state.errorMessage}</p>
                }

                <div>
                    {this.state.simulationRunning && <>
                        <Text style={{ fontSize: '12', color: 'white' }}>Processing</Text>
                        <LoadingSpin />
                    </>
                    }
                    {!this.state.simulationRunning && <Button type="primary" disabled={this.state.simulationRunning} onClick={this.runSimulationClicked} style={{ margin: 20, color: 'white' }}>Run Simulation</Button>}
                </div>
                <div>
                    <Plot
                        data={[
                            {
                                x: this.state.result.time,
                                y: this.state.result.velocity,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: 'red' },
                            },
                        ]}
                        layout={{
                            title: 'Velocity',
                            xaxis: { title: "Time (seconds)" },
                            yaxis: { title: "m/s" },
                            width: 600,
                            height: 400,
                            plot_bgcolor: "#F8F8F8"


                        }}
                    />
                    <Plot
                        data={[
                            {
                                x: this.state.result.time,
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
                            width: 600,
                            height: 400,
                            plot_bgcolor: "#F8F8F8"


                        }}
                    />
                </div>
                <div>
                    <Plot
                        data={[
                            {
                                x: this.state.result.time,
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
                            width: 600,
                            height: 400,
                            plot_bgcolor: "#F8F8F8"


                        }} />
                    <Plot
                        data={[
                            {
                                x: this.state.result.time,
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
                            width: 600,
                            height: 400,
                            plot_bgcolor: "#F8F8F8"


                        }} />
                </div>
            </div>
        </>
    }
    private correctHeader(str: string) {
        if (str === "coil") {
            return "Coil"
        }
        else if (str === "magnetic") {
            return "Magentic"
        }
        else if (str === "physical") {
            return "Projectile"
        }
        else if (str === "barrel") {
            return "Barrel"
        }
        else {
            return str
        }
    }
    private getParams(params: any, path: string[]) {
        var idCount = 0
        return <React.Fragment key={path.join(".")}>
            <div>
                {path.length > 0 && <h4 style={{ textAlign: 'center' }}>{(path[path.length - 1] !== "ip") && this.correctHeader(path[path.length - 1])}</h4>}
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
                                var unit = "(" + params[k].unit + ")"
                                return <div className="ParamRow" key={newPath.join(".")} style={{ textAlign: 'right', alignContent: 'center' }}  >
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-evenly"
                                        alignItems="center"
                                    >
                                        <Grid xs={6} alignItems='center'>
                                            <label style={{ fontSize: 17, verticalAlign: 'center' }} htmlFor={path.join(".") + idCount}>{k}{params[k].unit && unit}</label>
                                        </Grid>
                                        <Grid>
                                            <input style={{ fontSize: 15, verticalAlign: 'center' }} id={path.join(".") + idCount} value={params[k].val} className="Param" onChange={onChange} ></input>
                                        </Grid>
                                    </Grid>
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


        if (parseInt(this.state.params['numberOfCoils']['val']) > 4) {
            this.setState({ errorMessage: 'Error: Cannot have more than 4 coils as it taxes our server too much! Please clone from GitHub and run locally!' })
            return
        }

        this.setState({ errorMessage: '' })

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
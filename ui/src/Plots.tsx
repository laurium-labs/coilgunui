
import * as React from 'react';

import './App.css';
import Plot from 'react-plotly.js';
import { Typography, InputNumber, Button, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio';
import { urlExtension } from './Inputs'
const { Text } = Typography
interface IState {
    simulationRunning: boolean | undefined;
    params: any,
}
const apiUrl = "http://localhost:8000"

export default class Plots extends React.Component {
    public readonly state: IState = {
        simulationRunning: false,
        params: {},
    }
    public async componentDidMount() {
        // Get simulation params
        const params = await fetch(`${apiUrl}/simulate?${urlExtension()}`)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                return myJson
            });
        this.setState({ params })
    }
    public fetchData(start: number, end: number) {
        const data: number[] = []
        for (var i = start; i <= end; i++) {
            data.push(this.state.params[i])
        }
        return data
    }
    public render() {
        console.log(this.state.params)
        return <>
            <div style={{ flexDirection: 'column' }}>
                <div>
                    <Button disabled={false} onClick={this.runSimulationClicked} style={{ margin: 15 }}>Run Simulation</Button>
                </div>
                {/* p1 = plot(sln, vars=(0,2), title = "Displacement", ylabel = "[m]")
                p2 = plot(sln, vars=(0,3), title = "Velocity", ylabel = "[m/s]")
                p3 = plot(sln, vars=(0,1), title = "Magnetization", ylabel = "[A/m]", legend = false)
                p4 = plot(sln, vars=(0,4), title = "Irriversible Magnetization", ylabel = "[A/m]") */}
                {/* <Text>{thisetchData(1, 1)}rfd</Text> */}
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            y: this.fetchData(0, 632),
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },
                    ]}
                    layout={{ width: 320, height: 240, title: 'Displacement' }}
                />
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            y: this.fetchData(633, 1265),
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },
                    ]}
                    layout={{ width: 320, height: 240, title: 'Magnetization' }}
                />
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            y: this.fetchData(1265, 1898),
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },
                    ]}
                    layout={{ width: 320, height: 240, title: 'Irreversible Magnetization' }}
                />
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            y: this.fetchData(1899, 2532),
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },
                    ]}
                    layout={{ width: 320, height: 240, title: 'Velocity' }}
                />
            </div>
        </>
    }

    // private paramsToUrl() {
    //     // const noUnits = this.stripUnits(this.state.params)
    //     return this.toDotNotation( [], []).join('&')

    // }
    // private stripUnits(ob: any) {
    //     // Input {"a": {"val": 1, "unit": "Kg"}}
    //     // Output {"a": 1}
    //     const retval: any[] = []
    //     Object.keys(ob).forEach(k => {
    //         // if (this.isUnit(ob[k])) {
    //         //     retval.push(ob[k].val)
    //         // } else {
    //         retval.push(this.stripUnits(ob[k]))
    //         // }
    //     })
    //     return retval
    // }

    // private isUnit(ob: any) {
    //     // return true if it looks like {"val": 1, "unit": "kg"}
    //     const isSetsEqual = (a: any, b: any) => {
    //         return a.size === b.size && Array.from(a).every(value => b.has(value));
    //     }
    //     const set1 = new Set(Object.keys(ob))
    //     const set2 = new Set(["val", "unit"])
    //     return isSetsEqual(set1, set2)
    // }

    private toDotNotation(ob: any, currentPath: string[], result: string[]) {
        // Input: {"a": {"b" : 1}, "c": 2}
        // Output: a.b=1&c=2
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

        // const urlParams = this.paramsToUrl()

        const result = await fetch(`${apiUrl}/simulate?${urlExtension()}`).then((response) => {
            return response.json();
        })
            .then((myJson) => {
                return myJson
            });
        // googleAnalyticsEvent({ category: 'User', action: 'Ran a simulation' })
        // if (result.error) {
        //     this.setState({ error: true })
        //     googleAnalyticsEvent({ category: 'User', action: 'Got a simulation error' })
        // } else {

        //     this.setState({ result, error: false })
        // }
        this.setState({ simulationRunning: false })
    }

}

import * as React from 'react';

import './App.css';
import Plot from 'react-plotly.js';
import { Typography, InputNumber, Button, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio';
const { Text } = Typography
interface IState {
    params: any,
}
export default class Plots extends React.Component {
    public readonly state: IState = {
        params: {},
    }
    public async componentDidMount() {
        var apiUrl = "http://localhost:8000/simulate"
        // Get simulation params
        const params = await fetch(`${apiUrl}`)
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
        for (var i = start; i < end; i++) {
            data.push(this.state.params[i])

        }
        return data
    }
    public render() {
        console.log(this.state.params)
        return <>
            <Plot
                data={[
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                        y: this.fetchData(0, 9),
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                ]}
                layout={{ width: 320, height: 240, title: 'acceleration' }}
            />
            <Plot
                data={[
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: this.fetchData(10, 19),
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                ]}
                layout={{ width: 320, height: 240, title: 'deriviteve of magnetic field' }}
            />
        </>
    }

}
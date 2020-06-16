
import * as React from 'react';

import './App.css';
import Plot from 'react-plotly.js';
import { Typography, InputNumber, Button, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio';
import { urlExtension } from './Inputs'
const { Text } = Typography
interface IState {
    params: any,
}
export default class Plots extends React.Component {
    public readonly state: IState = {
        params: {},
    }
    public async componentDidMount() {
        var apiUrl = "http://localhost:8000"
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
            data.push(this.state.params.barrelLength)

        }
        return data
    }
    public render() {
        console.log(this.state.params)
        return <>
            <Text>{this.state.params.barrelLength}rfd</Text>
            {/* <Plot
                data={[
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: this.fetchData(1, 10),
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
                        y: this.fetchData(11, 20),
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                ]}
                layout={{ width: 320, height: 240, title: 'deriviteve of magnetic field' }}
            /> */}
        </>
    }

}
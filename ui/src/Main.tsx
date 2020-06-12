
import * as React from 'react';

import './App.css';

import Plot from 'react-plotly.js';

export default function Home() {


    interface doubleArray {
        x: number[]
        y: number[]
    }
    const apiUrl = "julia/packages/HTTP/BOJmV/src/Servers.jl:273"

    async function getSim<T>() {
        await fetch(`${apiUrl}`).then((response) => {
            if (response) {
                return response.json();
            }
        })
    }
    // const tree =getSim();
    // tree((value: any)=>{
    //     value
    // })

    return (
        <Plot
            data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                },
                { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
            ]}
            layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
        />
    )
};

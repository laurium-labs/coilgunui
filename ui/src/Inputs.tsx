
import React, { useState } from 'react';

import './App.css';
import Plot from 'react-plotly.js';
import { Typography, InputNumber, Button, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio';
const { Text } = Typography
//can pry do regular style

export default function Inputs() {
    const [physical, setPhysical] = useState<boolean>(false)
    const [magnetic, setMagnetic] = useState<boolean>(false)
    const [iron, setIron] = useState<boolean>(false)

    return <>
        <div style={{ width: , height: 480, flexDirection: 'column' }}>
            <Radio.Group size='large' style={{ width: 50, height: 50 }}>

                <Button title="Physical" style={{ width: 90, height: 50, }} onClick={() => {
                    setPhysical(true)
                }}>Physical</Button>

                <Button title="Magnetic" style={{ width: 90, height: 50, }} onClick={() => {
                    setMagnetic(true)
                }}>Magnetic</Button>

                <Button size='large' title="Iron" style={{ width: 90, height: 50, }} onClick={() => {
                    setIron(true)

                }}>Iron</Button>
            </Radio.Group>
        </div>


        {/* 
        <div style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
            <div>
                <Text>Radius</Text>
            </div>
            <div>
                <Text>Length</Text>
            </div>
            <Text>Density</Text>
        </div> */}
    </>
}
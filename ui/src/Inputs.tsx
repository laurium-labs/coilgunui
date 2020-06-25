
import React, { useState, useEffect } from 'react';

import './App.css';
import Plot from 'react-plotly.js';
import { Typography, InputNumber, Button, Radio, Input } from 'antd'
const { Text } = Typography

//Jason said maybe change projectile type/ variables, we will default these for now
var barrelParameters = ''
var coilParameters = ''
export function urlExtension() {
    return barrelParameters + coilParameters //+projectileType + projectileData
}
export default function Inputs() {
    //Projectile type
    const [physical, setPhysical] = useState<boolean>(false)
    const [magnetic, setMagnetic] = useState<boolean>(false)
    const [iron, setIron] = useState<boolean>(false)


    //defaluted variables for now, will likely be deleted anyway

    //physical projectile variables
    // const [physicalRadius, setPhysicalRadius] = useState<number>(2)
    // const [physicalLength, setPhysicalLength] = useState<number>(10)
    // const [physicalDensity, setPhysicalDenstity] = useState<number>(56)

    // //magnet projectie variables
    // const [magneticDomainSize, setMagneticDomainSize] = useState<number>(23)
    // const [magneticInterdoaminCoupling, setMagneticInterdoaminCoupling] = useState<number>(2)
    // const [magneticMagnetization, setMagneticMagnetization] = useState<number>(2)
    // const [magneticSaturationMagnetization, setMagneticSaturationMagnetization] = useState<number>(2)

    //Iron Projectile variables
    // const [ironPhysical, setIronPhysical] = useState<number>(2)
    // const [ironMagnetic, setIronMagnetic] = useState<number>(2)
    // const [ironPosition, setIronPosition] = useState<number>(2)
    // const [ironVelocity, setIronVelocity] = useState<number>(2)

    //Barrel Variables
    const [barrelLength, setBarrelLength] = useState<string>('4')
    const [barrelThickness, setBarrelThickness] = useState<string>('4')

    //coil Variables
    const [numberOfCoils, setNumberOFCoils] = useState<string>('4')
    const [coilLength, setCoilLength] = useState<string>('4')
    const [coilWireRadius, setCoilWireRadius] = useState<string>('4')
    function url() {
        barrelParameters = `? length=${barrelLength ? barrelLength : 0}&thickness=${barrelThickness ? barrelThickness : 0}`
        coilParameters = `&numberOfCoils=${numberOfCoils ? numberOfCoils : 0}&coilLength=${coilLength ? coilLength : 0}&wireRadius=${coilWireRadius ? coilWireRadius : 0}`
    }
    useEffect(() => {
        url()
    })
    return <>
        {/* <div style={{ width: 900, height: 480, flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center' }}> */}
        <div style={{ flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center' }}>
            <Text>Coil Gun Simulation</Text>
            <div style={{ marginTop: 30, flexDirection: 'row', alignItems: 'flex-start', alignContent: 'center' }}>
                <Text>Barrel Variables</Text>
                <div>
                    <div>
                        <Text style={{ fontSize: 20 }}>Length:</Text>
                        <Input size='large' defaultValue='4' title='Density' onChange={(text) => {
                            setBarrelLength(text.target.value)
                            url()
                        }} />
                        <Text style={{ fontSize: 20 }}>m</Text>
                    </div>
                    <div>
                        <Text style={{ fontSize: 20 }}>Thickness:</Text>
                        <Input size='large' defaultValue='4' title='Density' onChange={(text) => {
                            setBarrelThickness(text.target.value)
                            url()
                        }} />
                        <Text style={{ fontSize: 20 }}>mm</Text>

                    </div>
                </div>
            </div>
            <div style={{ marginTop: 30, flexDirection: 'column' }}>
                <Text>Coil Variables</Text>
                <div>
                    <div>
                        <Text style={{ fontSize: 20 }}>Number of coils:</Text>
                        <Input size='large' defaultValue='4' title='Length' onChange={(text) => {
                            setNumberOFCoils(text.target.value)
                            url()
                        }} />
                    </div>
                    <div>
                        <Text style={{ fontSize: 20 }}>Coil Length:</Text>
                        <Input size='large' defaultValue='4' title='Density' onChange={(text) => {
                            setCoilLength(text.target.value)
                            url()
                        }} />
                        <Text style={{ fontSize: 20 }}>mm</Text>

                    </div>
                    <div>
                        <Text style={{ fontSize: 20 }}>Wire Radius:</Text>
                        <Input size='large' defaultValue='4' title='Density' onChange={(text) => {
                            setCoilWireRadius(text.target.value)
                            url()
                        }} />
                        <Text style={{ fontSize: 20 }}>mm</Text>
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* <div style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Radio.Group size='large' style={{ width: 50, height: 50 }}>

                    <Button title="Physical" style={{ width: 90, height: 50, }} onClick={() => {
                        projectileType = '?'
                        projectileType = 'projectile=1 &'
                        setPhysical(true)
                        setMagnetic(false)
                        setIron(false)
                    }}>Physical</Button>

                    <Button title="Magnetic" style={{ width: 90, height: 50, }} onClick={() => {
                        projectileType = '?'
                        projectileType = 'projectile=2&'
                        setPhysical(false)
                        setMagnetic(true)
                        setIron(false)
                    }}>Magnetic</Button>

                    <Button size='large' title="Iron" style={{ width: 90, height: 50, }} onClick={() => {
                        projectileType = '?'
                        projectileType = 'projectile=3 &'
                        setPhysical(false)
                        setMagnetic(false)
                        setIron(true)
                    }}>Iron</Button>
                </Radio.Group>
            </div> */}
            {/* <div style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Projectile Variables</Text>
                {physical && <div style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Input size='large' placeholder='Radius' title='Radius' onChange={(value) => {

                    }} />
                    <Input size='large' placeholder='Length' title='Length' onChange={(value) => {

                    }} />
                    <Input size='large' placeholder='Density' title='Density' onChange={(value) => {

                    }} />
                </div>
                }

                {magnetic && <div style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Input size='large' placeholder='Domian size' title='Radius' onChange={(value) => {
                        console.log(value)
                    }} />
                    <Input size='large' placeholder='Interdomain Coupling' title='Length' onChange={(value) => {

                    }} />
                    <Input size='large' placeholder='Magnetization' title='Density' onChange={(value) => {

                    }} />
                    <Input size='large' placeholder='Saturation Magnetization' title='Density' onChange={(value) => {

                    }} />
                </div>
                }

                {iron && <div style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Input size='large' defaultValue='Physical' title='Radius' onChange={(value) => {
                        console.log(value)
                    }} />
                    <Input size='large' placeholder='Magnetic' title='Length' onChange={(value) => {

                    }} />
                    <Input size='large' placeholder='Position' title='Density' onChange={(value) => {

                    }} />
                    <Input size='large' placeholder='Velocity' title='Density' onChange={(value) => {

                    }} />
                </div>
                }
            </div> */}


        </div>
    </>
}
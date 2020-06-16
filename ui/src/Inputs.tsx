
import React, { useState } from 'react';

import './App.css';
import Plot from 'react-plotly.js';
import { Typography, InputNumber, Button, Radio, Input } from 'antd'
const { Text } = Typography
//can pry do regular style

//Jason said maybe change projectile type/ variables, we will default these for now
//export var urlExtension = ''
//var projectileType = '' // on change of any of these, set entire thing to null
//var projectileData = '' // and restart making it from changes again
var barrelParameters = '' //this is greasy code?
var coilParameters = ''
export function urlExtension() {
    return barrelParameters + coilParameters //+projectileType + projectileData
}
//might be able to get rid of all variables, just add to url extension
export default function Inputs() {
    //Projectile type
    const [physical, setPhysical] = useState<boolean>(false)
    const [magnetic, setMagnetic] = useState<boolean>(false)
    const [iron, setIron] = useState<boolean>(false)

    function url() {
        barrelParameters = `?barrelInnerRadius=>${barrelInnerRadius ? barrelInnerRadius : '0'} & barrelLength=${barrelLength ? barrelLength : '0'} & barrelThickness=${barrelThickness ? barrelThickness : '0'}`
        coilParameters = `& coilInnerRadius=${coilInnerRadius ? coilInnerRadius : '0'} & coilOuterRadius=${coilOuterRadius ? coilOuterRadius : '0'} & coilLength=${coilLength ? coilLength : '0'} & coilWireRadius=${coilWireRadius ? coilWireRadius : ''}`
    }
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
    const [barrelInnerRadius, setBarrelInnerRadius] = useState<string>('')
    const [barrelLength, setBarrelLength] = useState<string>('')
    const [barrelThickness, setBarrelThickness] = useState<string>('')

    //coil Variables
    const [coilInnerRadius, setCoilInnerRadius] = useState<string>('')
    const [coilOuterRadius, setCoilOuterRadius] = useState<string>('')
    const [coilLength, setCoilLength] = useState<string>('')
    const [coilWireRadius, setCoilWireRadius] = useState<string>('')


    //will not make call to BE from here, rather create a apiURL, export it, and call it 
    //from Plots, safest way to go about it, Button in Plots, fill with default values
    //so button can be clicked with no changes to parameters
    // state?state:'name'=default value
    return <>
        <div style={{ width: 900, height: 480, flexDirection: 'row' }}>
            <Text style={{ marginBottom: 50 }}>This is using an iron projectile with defualt inputs</Text>

            <div style={{ marginTop: 30 }}>
                <Text>Barrel Variables</Text>
                <div>
                    <Input size='large' placeholder='Inner Radius' title='Radius' onChange={(text) => {
                        setBarrelInnerRadius(text.target.value)
                        url()
                    }} />
                    <Input size='large' placeholder='Length' title='Density' onChange={(text) => {
                        setBarrelLength(text.target.value)
                        url()

                    }} />
                    <Input size='large' placeholder='Thickness' title='Density' onChange={(text) => {
                        setBarrelThickness(text.target.value)
                        url()

                    }} />
                </div>
            </div>
            <div>
                <Text>Coil Variables</Text>
                <div>
                    <Input size='large' placeholder='Inner Radius' title='Radius' onChange={(text) => {
                        setCoilInnerRadius(text.target.value)
                        url()

                    }} />
                    <Input size='large' placeholder='Outer Radius' title='Length' onChange={(text) => {
                        setCoilOuterRadius(text.target.value)
                        url()

                    }} />


                    <Input size='large' placeholder='Length' title='Density' onChange={(text) => {
                        setCoilLength(text.target.value)
                        url()

                    }} />
                    <Input size='large' placeholder='Wire Radius' title='Density' onChange={(text) => {
                        setCoilWireRadius(text.target.value)
                        url()

                    }} />
                </div>

            </div>
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
import './css/App.css';
import './css/Fonts.css';
import './css/Texture.css'
import React, { useState, useEffect } from 'react';

import Socket from './CAN-subscriber.js'
import TemperatureGauge from './components/temperature.js';
import Speedometer from './components/speedometer.js'
import DateTime from './components/date-time.js';
import RadialBar from './components/radial-progress.js';
import ValueBox from './components/valuebox.js'
import Battery from './components/battery.js'
import MotorTemp from './components/motor-temp.js'

import motorIcon from './images/motor.png';
import mosfetIcon from './images/mosfet.png';
import vescIcon from './images/VESC-Project_Logo_small.png'

function App() {

    const [data, setData] = useState({})
    const [config, setConfig] = useState({})

    // Connect and recieve CAN data from socket
    // NOTE: this is inefficient. 
    // It updates the data state, which refreshes ALL gui elements.
    // Ideally, only the elements that change should be updated.
    // This would require a major rewrite, where each component
    // is specialized and has a socket connection within the
    // component specifically for its data crumb
    useEffect(() => {
        const socket = new Socket(5002)

        socket.getSocket().on('data', (data) => {
            setData(data)
        })

        socket.getSocket().on('config', (config) => {
            setConfig({
                'capacity_ah': config['battery']['capacity_ah'],
                'max_speed': config['dash']['max_speed']
            })
            console.log(config)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const max_speed = config['max_speed'];
    const capacity_ah = config['capacity_ah'];
    const soc = (capacity_ah - data.ah_consumed) / capacity_ah
    const power_in = data.battery_current * data.battery_voltage/1000;
    const power_out = data.motor_current * data.motor_voltage/1000;

    return (
        <div className="center-screen">
            <div className="viewport">
                <div className='viewport-overlay' />
                
                {/* Uncomment this for full CANbus debug information */}
                {/* {Object.entries(data).map(([key, value]) => <label key={key} className='rawtext'>{key} = {Math.trunc(value * 100) / 100}</label>)} */}

                <Battery className="battery" soc={soc} voltage={data.battery_voltage} width={150} height={40}/>

                <MotorTemp className="motor-temp" value={data.mot_temp} width={150} height={40}/>
                <ValueBox className="mosfet-temp font-face-sf" value={data.mos_temp} units={'°C'} fontsize={40} width={200} justify={'right'} />

                <Speedometer value={Math.abs(data.mph)} className="speedometer center-gauge" title="" min={0} max={max_speed} ticks={11} size={550} />

                <DateTime className="clock-new font-face-rubik" fontsize={30} width={600} justify={'center'} />

                <ValueBox className="speed-ro center-gauge font-face-segment" value={data.mph} fontsize={100} width={250} justify={'right'} />
                <ValueBox className="speed-ro-bg center-gauge font-face-segment" value={'~~~'} fontsize={100} width={250} justify={'right'} />

                <ValueBox className="efficiency font-face-rubik" value={power_out/power_in*100} units={'%'} fontsize={40} width={200} justify={'right'} />

                <ValueBox className="odometer font-face-dot" value={data.odometer} fontsize={30} decimals={2} units=" MI" width={250} justify={'right'} />

                <ValueBox className="power-battery font-face-dot" value={power_in} fontsize={40} decimals={2} units=" kW" width={175} justify={'right'} />
                {/* <ValueBox className="power-motor font-face-dot" value={power_out} fontsize={40} decimals={2} units="kW" width={175} justify={'right'} /> */}

                <img src={motorIcon} id="motor-icon" alt="motor temp icon" />
                <img src={mosfetIcon} id="mosfet-icon" alt="mosfet temp icon" />
                <img src={vescIcon} id="vesc-icon" alt="vesc icon" />

                <RadialBar className="center-gauge" value={data.motor_current} units='A' primaryColor={['lightcoral', 'plum']} secondaryColor={['palegreen', 'seagreen']} max={150} radius={615} strokeWidth={20} start={.6} end={.9} tx='20%' ty='6%' showValue={true} />
                <RadialBar className="center-gauge" value={data.battery_current} units='A' primaryColor={['khaki', 'orange']} secondaryColor={['palegreen', 'seagreen']} max={80} radius={700} strokeWidth={30} start={.63} end={.87} tx='12%' ty='11.5%' showValue={true} />

                <RadialBar className="center-gauge" mirror={true} value={data.rpm} units='RPM' primaryColor={['lightcoral', 'plum']} secondaryColor={['lightcoral', 'plum']} max={8000} radius={615} strokeWidth={20} start={.6} end={.9} tx='10%' ty='6%' showValue={true} />

            </div>
        </div>
    );
}

export default App;
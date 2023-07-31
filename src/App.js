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
import IconBox from './components/icon-box.js'

import motorIcon from './images/motor.png'
import mosfetIcon from './images/mosfet.png'
import vescIcon from './images/VESC-Project_Logo_small.png'
import chargeIcon from './images/charge.png'

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
                'max_speed': config['dash']['max_speed'],
                'max_rpm': config['motor']['max_rpm'],
                'max_amps_bat': config['battery']['max_amps'],
                'max_amps_mot': config['motor']['max_amps'],
                'warn_temp_mot': config['motor']['warn_temp'],
                'warn_temp_mos': config['controller']['warn_temp'],
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
    const power_in = data.battery_current * data.battery_voltage / 1000;
    const power_out = data.motor_current * data.motor_voltage / 1000;
    const regen = power_in<0? true : false

    return (
        <div className="center-screen">
            <div className="viewport">
                <div className='viewport-overlay' />

                <div id='info-box'>
                    <div id="battery-box">
                        <img src={chargeIcon} id="charge-icon" alt="charging" style={{opacity: regen? 1 : 0}}/>
                        <Battery soc={.45} voltage={data.battery_voltage} width={150} height={40} charging={regen}/>
                    </div>
                    <div id="temperature-box">
                        <IconBox value={data.mot_temp} units='°C' image={motorIcon} width={125} height={40} align='left' warn={config['warn_temp_mot']}/>
                        <IconBox value={data.mos_temp} units='°C' image={mosfetIcon} width={125} height={40} align='right' warn={config['warn_temp_mos']}/>
                    </div>
                </div>

                {/* <ValueBox className="mosfet-temp font-face-sf" value={data.mos_temp} units={'°C'} fontsize={40} width={200} justify={'right'} /> */}

                <Speedometer value={Math.abs(data.mph)} className="speedometer center-gauge" title="" min={0} max={max_speed} ticks={11} size={550} />

                <DateTime className="clock-new font-face-rubik" fontsize={30} width={600} justify={'center'} />

                <ValueBox className="speed-ro center-gauge font-face-segment" value={data.mph} fontsize={100} width={250} justify={'right'} />
                <ValueBox className="speed-ro-bg center-gauge font-face-segment" value={'~~~'} fontsize={100} width={250} justify={'right'} />

                <ValueBox className="efficiency font-face-rubik" value={power_out / power_in * 100} units={'%'} fontsize={40} width={200} justify={'right'} />

                <ValueBox className="odometer font-face-dot" value={data.odometer} fontsize={30} decimals={2} units=" MI" width={250} justify={'right'} />

                <ValueBox className="power-battery font-face-dot" value={power_in} fontsize={40} decimals={2} units=" kW" width={175} justify={'right'} />
                {/* <ValueBox className="power-motor font-face-dot" value={power_out} fontsize={40} decimals={2} units="kW" width={175} justify={'right'} /> */}

                <img src={vescIcon} id="vesc-icon" alt="vesc icon" />

                <RadialBar className="center-gauge" value={data.battery_current} units='A' primaryColor={['white', 'white']} secondaryColor={['palegreen', 'seagreen']} max={config['max_amps_bat']} radius={615} strokeWidth={20} start={.6} end={.9} tx='20%' ty='6%' showValue={true} strokeLinecap='round' />
                <RadialBar className="center-gauge" value={data.motor_current} units='A' primaryColor={['white', 'white']} secondaryColor={['palegreen', 'seagreen']} max={config['max_amps_mot']} radius={700} strokeWidth={30} start={.67} end={.82} tx='5%' ty='20%' showValue={true} strokeLinecap='round'/>

                <RadialBar className="center-gauge" mirror={true} value={data.rpm} units='RPM' primaryColor={['white', 'red']} secondaryColor={['white', 'pink']} max={config['max_rpm']} radius={615} strokeWidth={20} start={.6} end={.9} tx='10%' ty='6%' showValue={true} strokeLinecap='round'/>

            </div>
        </div>
    );
}

export default App;
import React from 'react'
import ValueBox from './valuebox.js'

const MotorTemp = ({ className, value, units, fontsize, width, decimals, justify }) => {
    ValueBox.defaultProps = {
        units: '',
        decimals: 0,
        justify: 'right'
    }

    //variable conditioning
    const height = fontsize * 1.1;
    const padding = fontsize / 10;
    let display = padZeros(decimals, value)

    if (isNaN(display))
        display = value

    return (
        <div className={className} style={{
            height: `${height}px`,
            width: `${width}px`,
        }}>
            <label style={{
                fontFamily: "San Francisco",
                fontSize: `${height}px`,
            }}>
                {padZeros(0, value)}°C
            </label>
        </div>
    );
}

//create a string from a number with a set amount of decimal places
const padZeros = (decimals, value) => {
    const decimal_mp = Math.pow(10, decimals);
    value = Math.round(value * decimal_mp) / decimal_mp

    if (decimals === 0)
        return String(value)

    const [front, rear] = String(value).split('.')
    let output = rear !== undefined ? front + '.' + rear : front + '.'
    return output.padEnd(front.length + 1 + decimals, '0')
}


export default MotorTemp
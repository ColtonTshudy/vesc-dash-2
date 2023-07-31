import React from 'react'
import ValueBox from './valuebox.js'

const IconBox = ({ className, value, units, image, height, width, align, warn }) => {
    IconBox.defaultProps = {
        units: '',
        align: 'left',
    }

    return (
        <div className={`${className}`} style={{
            height: `${height}px`,
            width: `${width}px`,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            flexDirection: `${align === 'left' ? 'row' : 'row-reverse'}`
        }}>
            <img src={image} alt="motor temp icon" style={{
                height: `${height}px`,
                opacity: `${value > warn ? 1 : 0.5}`,
            }} />
            <label style={{
                fontFamily: "San Francisco",
                fontSize: `${height * 0.7}px`,
                textAlign: 'left',
                overflow: 'hidden',
            }}>
                &nbsp;{padZeros(0, value)}{units}&nbsp;
            </label>
        </div >
    );
}

//create a string from a number with a set amount of decimal places
const padZeros = (decimals, value) => {
    if (isNaN(value))
        return '0';

    const decimal_mp = Math.pow(10, decimals);
    value = Math.round(value * decimal_mp) / decimal_mp

    if (decimals === 0)
        return String(value)

    const [front, rear] = String(value).split('.')
    let output = rear !== undefined ? front + '.' + rear : front + '.'
    return output.padEnd(front.length + 1 + decimals, '0')
}

export default IconBox
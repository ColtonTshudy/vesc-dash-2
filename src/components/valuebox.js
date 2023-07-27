import React from 'react'

const ValueBox = ({ className, value, units, fontsize, width, decimals, justify }) => {
    ValueBox.defaultProps = {
        units: '',
        decimals: 0,
        justify: 'right'
    }

    const height = fontsize * 1.1;
    const padding = fontsize / 10;
    const decimal_mp = Math.pow(10, decimals);
    let display = padZeros(decimals, Math.round(value * decimal_mp) / decimal_mp)

    if (isNaN(display))
        display = value

    return (
        <div className={className} style={{
            margin: `${-height / 2-padding}px 0 0 ${-width / 2-padding}px`,
            width: `${width}px`,
            height: `${height}px`,
            textAlign: justify,
            fontSize: `${fontsize}px`,
            padding: `${padding}px`,
        }}>
            {display} {units}
        </div>
    );
}

// Adds zeroes to the end to fill up desired decimal places
const padZeros = (decimals, value) => {
    if (decimals === 0)
        return String(value)
    
    const [front, rear] = String(value).split('.')
    let output = rear !== undefined ? front + '.' + rear : front + '.'
    return output.padEnd(front.length + 1 + decimals, '0')
}


export default ValueBox
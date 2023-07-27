import React, { useState, useEffect } from 'react'

const DateTime = ({ className, fontsize, width, justify }) => {
    DateTime.defaultProps = {
        justify: 'right'        
    }

    const height = fontsize * 1.1;
    const padding = fontsize / 10;

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    }, []);

    return (
        <div className={className} style={{
            margin: `${-height / 2}px 0 0 ${-width / 2}px`,
            position: 'absolute',
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: '10px',
            textAlign: justify,
            fontSize: `${fontsize}px`,
            padding: `${padding}px`,
        }}>
            {date.toLocaleTimeString('en-us',{hour:'2-digit', minute:'2-digit'})} <span style={{color:'#aaa'}}>{date.toLocaleDateString('en-us',{ weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
    )
}

export default DateTime
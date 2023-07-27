import React, { useRef, useEffect } from 'react';
import { LinearGauge } from 'canvas-gauges';

const TemperatureGauge = ({ className, value, min, max, size }) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    // const danger = 0.5; // Start making number red at this percent

    let val = value
    if (isNaN(value))
        val = 0

    const height = size * 2
    const width = size / 2
    var justify = Math.floor(Math.log10(val)) < 1 ? 'center' : 'left'

    // let valColor = `rgb(255,${255 * (max * danger) / value},${255 * (max * danger) / value})`
    // if (isNaN(valColor))
    //     valColor = 'white'

    useEffect(() => {
        gaugeRef.current = new LinearGauge({
            renderTo: canvasRef.current,
            width: width,
            height: height,
            minValue: min,
            maxValue: max,
            highlights: [],
            majorTicks: [0],
            minorTicks: 2,
            colorMajorTicks: 'rgb(0,0,0,0)',
            borders: false,
            colorPlate: 'rgb(0,0,0,0)',

            value: val,
            valueBox: false,

            barProgress: true,
            barStrokeWidth: 0,
            colorBarProgress: 'tomato',
            colorBar: 'rgb(0,0,0,0.5)',
            needle: true,
            needleSide: 'right',
            needleWidth: 10,
        });
        gaugeRef.current.draw();

        return () => {
            gaugeRef.current.destroy();
        };
    });

    // rgb(255,100,100,${(value/max-danger)/(1-danger)})

    return (
        <div className={className}>
            <canvas ref={canvasRef} style={{ zIndex: 1 }} />
            <div style={{
                position: 'absolute',
                width: `57px`,
                height: `40px`,
                bottom: '-2%',
                left: '20%',
                borderRadius: '10px',
                fontFamily: 'Rubik',
                fontSize: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: justify,
                textShadow: '0 0 10px black, 0 0 10px black',
            }}>
                {Math.floor(val)}
            </div>
        </div >
    )
};

export default TemperatureGauge;
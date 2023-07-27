import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';

const Speedometer = ({ className, value=0, min=0, max=0, ticks=0, size }) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();

    useEffect(() => {
        gaugeRef.current = new RadialGauge({
            barStartPosition: 'left',
            renderTo: canvasRef.current,
            width: size,
            height: size,
            minValue: min,
            maxValue: max,
            value: value,
            highlights: [],
            majorTicks: __linspace(min, max, ticks),
            minorTicks: 5,
            needleType: "line",
            needleWidth: 5,
            colorNeedleEnd: "rgb(255,0,0,1)",
            colorNeedleShadowDown: "rgb(0,0,0,1)",
            needleStart: 55,
            needleEnd: 100,
            colorPlate: 'rgb(255, 255, 230)',
            fontValueSize: 60,
            fontNumbersSize: 25,
            valueInt: 2,
            valueDec: 0,
            colorValueText: 'black',
            fontUnitsSize: 25,
            ticksAngle: 270,
            startAngle: 45,
            valueBox: false,
            borders: true,
            borderShadowWidth: 0,
            exactTicks: false,
            needleCircleSize: 0,
            needleCircleInner: 0,
            colorNeedleCircleOuter: 'black',
            colorNeedleCircleOuterEnd: 'black',
        });
        gaugeRef.current.draw();

        return () => {
            gaugeRef.current.destroy();
        };
    });

    return (
        <>
            <div className={className} style={{ margin: `${-size / 2}px 0 0 ${-size / 2}px` }}>
                <canvas ref={canvasRef} />
            </div>
            <div className={className} style={{
                margin: `${-300 / 2}px 0 0 ${-300 / 2}px`,
                position: 'absolute',
                width: '300px',
                height: '300px',
                backgroundColor: '#aaa',
                borderRadius: '50%',
                boxShadow:
                    `inset -20px -20px 50px 50px rgb(33, 44, 56),` +
                    `inset -15px -15px 10px 20px black,` +
                    `0 0 20px 5px black,` +
                    `0 0 50px 20px white`,
                zIndex: 5,
            }} />
            <div className={className} style={{
                position: 'absolute',
                margin: `${-size / 2}px 0 0 ${-size / 2}px`,
                width: size,
                height: size,
                borderRadius: '50%',
                boxShadow: `inset 0 0 50px 30px black, ` +
                    `0 0 1px 2px black`,
                zIndex: 5,
            }} />
        </>
    )
};

function __linspace(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
        arr.push(startValue + (step * i));
    }
    return arr;
}

export default Speedometer;
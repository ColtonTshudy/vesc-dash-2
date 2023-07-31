import './battery.css';
import '../css/Fonts.css'

const Battery = ({ className, soc, voltage, width, height, charging }) => {
    //variable conditioning
    const fontHeight = Math.min(width*0.25, height*0.8);
    const soc_per = isNaN(soc)? 0 : 100*soc;
    const voltage_trunc = isNaN(voltage)? 0 : padZeros(1, voltage)
    
    //bar color
    let barColor = 'white';
    if(soc_per < 25){
        barColor = 'rgb(255,0,0)';
    }
    if(charging){
        barColor = 'rgb(0,255,0)';
    }

    return (
        <div className={`${className} main`} style={{
            height: `${height}px`,
            width: `${width}px`,
            zIndex: 100,
        }}>
            <div className="body">
                <div className="fill" style={{
                    background: `linear-gradient(to right, ${barColor} ${soc_per}%, transparent ${soc_per}%)`,
                }}>
                    <label style={{
                        fontSize:  `${fontHeight}px`,
                        lineHeight: `${height}px`,
                        backgroundImage: `linear-gradient(to right, rgb(0,0,0,.9) ${soc_per}%, white ${soc_per}%)`,
                    }}>
                        {voltage_trunc}V
                    </label>
                </div>
            </div>
            <div className="nub" />
        </div>
    )
};

// Create a string from a number with a set amount of decimal places
const padZeros = (decimals, value) => {
    const decimal_mp = Math.pow(10, decimals);
    value = Math.round(value * decimal_mp) / decimal_mp

    if (decimals === 0)
        return String(value)
    
    const [front, rear] = String(value).split('.')
    let output = rear !== undefined ? front + '.' + rear : front + '.'
    return output.padEnd(front.length + 1 + decimals, '0')
}

export default Battery;
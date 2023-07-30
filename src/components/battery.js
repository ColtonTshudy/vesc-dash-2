import './battery.css';
import '../css/Fonts.css'

const Battery = ({ className, soc, voltage, width, height }) => {
    return (
        <div className={`${className} main`} style={{
            height: `${height}`,
            width: `${width}`,
            zIndex: 100,
        }}>
            <div className="body">
                <div className="fill" style={{
                    background: `linear-gradient(to right, aqua ${100*soc}%, transparent ${100*soc}%)`,
                }}>
                    <label>{voltage}V</label>
                </div>
            </div>
            <div className="nub"/>
        </div>
    )
};

export default Battery;
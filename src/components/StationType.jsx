import './stationType.css';

export default function StationType({ stationType, setStationType }) {
    return (
        <div className="station-type" >
            <div className="all">
                <input 
                    type='radio' 
                    checked={stationType==='ALL'} 
                    value="ALL" 
                    onChange={(e)=>setStationType(e.target.value)}
                /> All
            </div>
            {/* <div className="normal">
                <input 
                    type='radio' 
                    checked={stationType==='NORMAL'} 
                    value="NORMAL"  
                    onChange={(e)=>setStationType(e.target.value)}
                /> Normal Chargers
            </div> */}
            <div className="fast">
                <input 
                    type='radio' 
                    checked={stationType==='FAST'} 
                    value="FAST"  
                    onChange={(e)=>setStationType(e.target.value)}
                /> Fast Chargers
            </div>
        </div>
    )
}

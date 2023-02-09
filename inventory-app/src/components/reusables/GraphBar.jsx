import React from 'react';
import "../../styles/bar.css"
function GraphBar(props) {

    let color = (props.height >=80)? "green": ((props.height < 80 )&& (props.height >30))? "yellow": "red" 
    return (
        <div className="bar">
            <div className='outerbar'>
                <div className='innerbar' style={{backgroundColor:color, height:`${props.height}%`}}>
                </div>
            </div>
            <p>{props.item}</p>
        </div>
    );
}

export default GraphBar;
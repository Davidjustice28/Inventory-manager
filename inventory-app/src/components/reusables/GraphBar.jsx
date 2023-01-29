import React from 'react';
import "../../styles/bar.css"
function GraphBar(props) {
    return (
        <div className="bar">
            <div className='outerbar'>
                <div className='innerbar' style={{backgroundColor:props.color, height:props.height}}>
                </div>
            </div>
            <p>{props.item}</p>
        </div>
    );
}

export default GraphBar;
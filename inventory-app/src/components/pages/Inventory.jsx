import React from 'react';
import "../../styles/Inventory.css"

function Inventory(props) {
    let list = [0,1,2,3,4,5,6,7,8,9]
    
    return (
        <div id="inventory-page">
            <div id='inventory-display'>
                {list.map((item,index) => {
                    return (
                        <div className='item-div' key={index}>item {index+1}</div>
                    )
                })}
            </div>
        </div>
    );
}

export default Inventory;
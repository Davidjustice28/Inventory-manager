import React, {useContext, useState} from 'react';
import "../../styles/Inventory.css"
import { loggedInContext } from '../../App';
import { Link } from 'react-router-dom';
import ItemSearchBar from '../reusables/ItemSearchBar';

function Inventory(props) {
    let list = [0,1,2,3,4,5,6,7,8,9]
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers] = useContext(loggedInContext)
    const [inventory,setInventory] = useState(loggedUser.Inventory)

    
    function resetInventory(items) {
        if(items.length > 0) {
            setInventory(items)
        }else {
            setInventory(loggedUser.Inventory)
        }
    }

    return (
        <div id="inventory-page">
            <ItemSearchBar func={resetInventory} items={loggedUser.Inventory} dropdown={false} buttonDisplay={true}/>
            <div id='inventory-display'>
                {inventory.map((item,index) => {
                    return (
                    <div className='item-div' key={index}><Link to={`/item/${item.SKU}`}>{item.name}</Link></div>
                    )
                })}
            </div>
        </div>
    );
}

export default Inventory;
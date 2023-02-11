import React, {useContext} from 'react';
import { useParams } from 'react-router';
import { loggedInContext } from '../../App';
import "../../styles/Item.css"

function Item(props) {
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers] = useContext(loggedInContext)
    const urlParams = useParams()
    const item = loggedUser.Inventory.filter((i) => {
        if(i.SKU == urlParams.itemSku) {
            return i
        }
    })[0]
    return (
        <div id='item-page'>
            <div id='item-left'>
                <img src={item.image} ></img>
            </div>
            <div id='item-right'>
                <h1>{item.name.toUpperCase()}</h1>        
                <p>SKU: {item.SKU}</p>
                <p>Cost: {item.cost}</p>
                <p>Retail: {item.salesPrice}</p>
                <p>Instock: {item.stock}</p>
                <p>Category: {item.category}</p>
                <p>Supplier: {item.supplier}</p>
            </div>
        </div>
    );
}

export default Item;
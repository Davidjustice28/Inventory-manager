import React, {useContext} from 'react';
import { useParams } from 'react-router';
import { loggedInContext } from '../../App';

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
            <h1>Item: {item.name}</h1>
            <p>SKU {item.SKU}</p>
            <p>Cost: {item.cost}</p>
            <p>Retail: {item.salesPrice}</p>
            <p>Instock: {item.salesPrice}</p>
            <p>Category: {item.category}</p>
            <p>Supplier: {item.supplier}</p>
        </div>
    );
}

export default Item;
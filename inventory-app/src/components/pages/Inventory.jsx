import React, {useContext, useEffect, useRef, useState} from 'react';
import "../../styles/Inventory.css"
import { loggedInContext } from '../../App';
import { Link } from 'react-router-dom';
import ItemSearchBar from '../reusables/ItemSearchBar';
import { Item } from '../../utilities/classes';
import { addItem, deleteItem, reloggedUser } from '../../utilities/database-functions';

function Inventory(props) {
    let list = [0,1,2,3,4,5,6,7,8,9]
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers] = useContext(loggedInContext)
    const [inventory,setInventory] = useState(loggedUser.Inventory)
    const CostRef = useRef(null)
    const NameRef = useRef(null)
    const RetailRef = useRef(null)
    const SupplierRef = useRef(null)
    const StockRef = useRef(null)
    const CategoryRef = useRef(null)
    
    function resetInventory(items) {
        if(items.length > 0) {
            setInventory(items)
        }else {
            setInventory(loggedUser.Inventory)
        }
    }

    function NewItemForm(props) {
        return (
            <form id='new-itemform' style={{display:"none"}}>
                <p>New Item Form</p>
                <label>Name:</label>
                <input type="text" ref={NameRef}></input>
                <label>Cost:</label>
                <input type="text" ref={CostRef}></input>
                <label>Retail:</label>
                <input type="text" ref={RetailRef}></input>
                <label>Supplier:</label>
                <input type="text" ref={SupplierRef}></input>
                <label>Category:</label>
                <input type="text" ref={CategoryRef}></input>
                <label>Stock:</label>
                <input type="text" ref={StockRef}></input>
                <button type='button' onClick={createItem}>Create Item</button>
            </form>
        )
    }

    function loadForm() {
        let form = document.getElementById("new-itemform")
        if(form.style.display = "none") {
            form.style.display = "flex"
        }
        else {
            form.style.display = "none"
        }
    }

    async function createItem() {
        let newItem = new Item(NameRef.current.value,RetailRef.current.value,CostRef.current.value,StockRef.current.value,CategoryRef.current.value,SupplierRef.current.value)
        let response = await addItem(newItem,loggedUser._id)
        await setUsers(response)
        let user = users.filter((u) => {
            return (u._id == loggedUser._id)
        })[0]
    
        localStorage.setItem("user", JSON.stringify(user))
        NameRef.current.value = ""
        RetailRef.current.value =""
        CostRef.current.value =""
        StockRef.current.value =""
        CategoryRef.current.value =""
        SupplierRef.current.value =""
    }

    async function removeItem(itemName) {
        let newUsers = await deleteItem(loggedUser._id,itemName)
        await setUsers(newUsers)
        let user = users.filter((u) => {
            return (u._id == loggedUser._id)
        })[0]
        localStorage.setItem("user", JSON.stringify(user))
    
    }

    useEffect(() => {
        //console.log("current logged user updated or changed")
        setInventory(props.user.Inventory)
    },[props.user])
    return (
        <div id="inventory-page">
            <div id="inventory-options">
                <ItemSearchBar func={resetInventory} items={loggedUser.Inventory} dropdown={false} buttonDisplay={true}/>
                <button onClick={loadForm} style={{display:"flex",alignItems:"center", fontSize:"small", borderRadius:"10px", backgroundColor:"green",color:"white", position:"absolute",right:"16%",top:"10%"}}><span className='material-symbols-outlined'>add</span>New Item</button>
                
            </div>
            <table id='inventory-table' className='inventory-dashboard'>
                <tr>
                    <th>Preview</th>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Supplier</th>
                    <th>Retail</th>
                    <th>D</th>
                </tr>
                {inventory.map((item,index) => {
                    return (
                    <tr key={index}>
                        <td><img src={item.image}/></td>
                        <td><Link to={`/item/${item.SKU}`}>{item.SKU}</Link></td>
                        <td>{item.name}</td>
                        <td>{item.stock}</td>
                        <td>{item.category}</td>
                        <td>{item.supplier}</td>
                        <td>{item.salesPrice}</td>
                        <td><span className='material-symbols-outlined' style={{color:"red"}} onClick={() => removeItem(item.name)}>cancel</span></td>

                    </tr>
                    )
                })}
            </table>
            <NewItemForm/>
        </div>
    );
}

export default Inventory;
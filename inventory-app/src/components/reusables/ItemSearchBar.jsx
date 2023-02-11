import React, { useRef, useState } from "react";
import "../../styles/ItemSearchBar.css"

function ItemSearchBar(props) {
    const ItemSearchRef = useRef(null)
    const [foundItems,SetFoundItems] = useState([])
    let buttonDisplay = (props.buttonDisplay == false)? "none": "block"
    function searchItems() {
        let itemsFound = props.items.filter(item => {
            return (item.SKU == ItemSearchRef.current.value) || (item.name == ItemSearchRef.current.value) || (item.supplier == ItemSearchRef.current.value)
        })
        
        SetFoundItems(itemsFound)
        console.log(foundItems)
    }

    function searchInventory() {
        if(props.func) {
            props.func(foundItems)
        }
    }
    //console.log(props.items)
    function BarDropdown() {
        if(props.dropdown == true) {
            if(foundItems.length > 0) {
                return (
                    <div className="searchbar-dropdown">
                        {foundItems.map(item => {
                            return (
                                <div className="searchbar-item">
                                    <p>{item.name}</p>
                                    <button>Add</button>
                                </div>
                            )
                        })}
                    </div>
                )
            }else {
                return null
            }
        }else {
            return null
        }
    }
    return (
        <div style={{display:"flex", flexDirection: "column", alignItems:"center"}} className="searchbar">
            <label style={{marginBottom:"5px"}}>Inventory Search</label>
            <div className="item-searchbar">
                <input type="text" placeholder='Search item by SKU' ref={ItemSearchRef} onChange={searchItems}></input>
                <button type='button' onClick={searchInventory} style={{display:buttonDisplay}}>Search</button>
            </div>
            <BarDropdown/>
        </div>
    )
}

export default ItemSearchBar
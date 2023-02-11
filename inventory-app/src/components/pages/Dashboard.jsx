import React,{useContext, useEffect} from 'react';
import "../../styles/Dashboard.css"
import GraphBar from '../reusables/GraphBar';
import NavBar from '../reusables/NavBar';
import { loggedInContext } from '../../App';


function Dashboard(props) {
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers] = useContext(loggedInContext)
    const months = ["Jan","Feb", "Mar", "Apr","May", "Jun","Jul", "Aug","Sep","Oct","Nov","Dec", ]
    let currentdate = new Date()
    let dateString = `${months[currentdate.getMonth()]} ${currentdate.getDate()}, ${currentdate.getFullYear()}`
    
    let inventory = loggedUser.Inventory
    inventory.sort((a,b) => a.stock - b.stock)
    let stoppingIndex = (inventory.length >= 8)? 4 : Math.ceil(inventory.length /2)
    let lowestItems = inventory.slice(0,stoppingIndex)

    

    return (
        <div id="dashboard">
            <div id='dash'>
                    <div id='dash-greeting' className='grid-item'>
                        <h2>Welcome {loggedUser.Name}</h2>
                    </div>
                    <div id='grid-date' className='grid-item'><h2>{dateString}</h2></div>
                    <div id='quick-stats' className='grid-item'>
                        <h2>Quick Stats</h2>
                        <table>
                            <tr>
                                <th>Stat</th>
                                <th>Data</th>
                            </tr>
                            <tr>
                                <th># of Units</th>
                                <td>{inventory.reduce((total,currItem) => {
                                    return total += currItem.stock
                                },0)}</td>
                            </tr>
                            <tr>
                                <th># of SKUs</th>
                                <td>{inventory.length}</td>
                            </tr>
                            <tr>
                                <th># of Projects</th>
                                <td>{loggedUser.Projects.length}</td>
                            </tr>
                            <tr>
                                <th>Out-of-Stock</th>
                                <td>{inventory.reduce((total,curr) => {
                                    if(curr.stock == 0) {
                                        return total+=1
                                    }else {
                                        return total
                                    }
                                },0)}</td>
                            </tr>
                        </table>
                    </div>
                    <div id="empty1" className='grid-item'>empty 1</div>
                    <div id="empty2" className='grid-item'>empty 2</div>
                    <div id="empty3" className='grid-item'>empty 3</div>
                    <div id='low-items' className='grid-item'>low items
                        <div id='lowitems-graph'>
                            {lowestItems.map(item => <GraphBar height={item.stock} item={item.name}/>)}
                       
                        </div>
                    </div>
                    <div id='finances'className='grid-item'>finances</div>
            </div>
        </div>
    );
}

export default Dashboard;
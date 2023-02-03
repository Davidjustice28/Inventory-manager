import React,{useContext} from 'react';
import "../../styles/Dashboard.css"
import GraphBar from '../reusables/GraphBar';
import NavBar from '../reusables/NavBar';
import { loggedInContext } from '../../App';


function Dashboard(props) {
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers] = useContext(loggedInContext)
    const months = ["Jan","Feb", "Mar", "Apr","May", "Jun","Jul", "Aug","Sep","Oct","Nov","Dec", ]
    let currentdate = new Date()
    let dateString = `${months[currentdate.getMonth()]} ${currentdate.getDate()}, ${currentdate.getFullYear()}`
    
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
                                <td>78</td>
                            </tr>
                            <tr>
                                <th># of SKUs</th>
                                <td>12</td>
                            </tr>
                            <tr>
                                <th># of Projects</th>
                                <td>8</td>
                            </tr>
                            <tr>
                                <th>Out-of-Stock</th>
                                <td>3</td>
                            </tr>
                        </table>
                    </div>
                    <div id="empty1" className='grid-item'>empty 1</div>
                    <div id="empty2" className='grid-item'>empty 2</div>
                    <div id="empty3" className='grid-item'>empty 3</div>
                    <div id='low-items' className='grid-item'>low items
                        <div id='lowitems-graph'>
                            <GraphBar color="red" height="80%" item="carrots"/>
                            <GraphBar color="blue" height="55%" item="plum"/>
                            <GraphBar color="green" height="70%" item="strawberry"/>
                            <GraphBar color="yellow" height="50%" item="orange"/>
                        </div>
                    </div>
                    <div id='finances'className='grid-item'>finances</div>
            </div>
        </div>
    );
}

export default Dashboard;
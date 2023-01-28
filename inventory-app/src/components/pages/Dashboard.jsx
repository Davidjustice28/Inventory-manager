import React from 'react';
import "../../styles/Dashboard.css"
import NavBar from '../reusables/NavBar';

function Dashboard(props) {
    return (
        <div id="dashboard">
            <div id='dash'>
                <div id='dash-top'>
                    <div id='dash-greeting'>
                        <h1>Welcome David</h1>
                    </div>
                    <div id='quick-stats'>
                        <h2>Quick Stats</h2>
                        <ul>
                            <li>Total Items: 12</li>
                            <li>Total Units: 258</li>
                            <li>SKUs Out-Of-Stock: 3</li>
                            <li>Total Projects: 8</li>
                        </ul>
                    </div>
                </div>
                <div id='dash-bottom'>
                    <div id='low-items'>
                        <h3>Items Low On Stock:</h3>
                        <ol>
                            <li>Bananas</li>
                            <li>Apples</li>
                            <li>Oranges</li>
                            <li>Grapes</li>
                        </ol>
                    </div>
                    <div id='finances'></div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
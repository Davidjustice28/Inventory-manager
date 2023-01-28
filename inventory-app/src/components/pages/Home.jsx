import React, { useState } from "react";
import SkipImg from "../../assets/skip.jpg"
import PensImg from "../../assets/pens.jpg"
import GearImg from "../../assets/gear.jpg"
import MechanicImg from "../../assets/mechanic.jpg"
import "../../styles/Home.css"

function Home(props) {
    const images =[SkipImg,PensImg,GearImg,MechanicImg]

    function changeImage() {
        let index = images.indexOf(image)
        if(index == (images.length-1)) {
            setImage(images[0])
        }else {
            setImage(images[index+1])
        }
    }

    
    return (
        <div id="home-page" style={{backgroundImage:`url(${images[2]})`,backgroundPosition:"center", backgroundSize:"cover"}} >
            <h1>Inventory Manager</h1>
            <p>Helping Small Business Owners Keep Track Of What Matters Most</p>
        </div>
    );
}

export default Home;
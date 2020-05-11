import React from 'react';

import people from '../data/pics/people-icon.png'

function Footer(){
    return(
        <div className="container" style={{textAlign: "left"}}>
            <hr/>
            <p className="infoMainSmall">
                <a href="/Home/About">
                    <img style={{marginLeft: "5px", marginTop: "-2px", width: "18px"}} src={people}/>
                </a>
                © 2020 - FINKI e-System
            </p>
        </div>
    );
}

export default Footer;

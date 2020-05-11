import {BrowserRouter, Link} from "react-router-dom";
import React from 'react'

import logo from '../data/pics/CASlogo.png'

const Header = (props) => {
    return(
        <div className="navbar navbar-inverse navbar-fixed-top" style={{marginBottom: "50px"}}>
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target=".navbar-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">
                        <img height="35px" style={{marginTop: "-8px"}} src={logo} alt=" body"/>
                    </a>
                    <Link to="/" className={"navbar-brand"}>e-System</Link>
                </div>
                <div className=" navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to={"/Students"}>Студенти</Link>
                        </li>
                        <li>
                            <Link to={"/Subjects"}>Предмети</Link>
                        </li>
                        <li>
                            <Link to={"/Sessions"}>Сесии</Link>
                        </li>
                        <li>
                            <Link to={"/Professors"}>Професори</Link>
                        </li>
                        <li>
                            <Link to={"/Programs"}>Студиски програми</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

{/*
export default class Header extends Component{
    render(){
        return(
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="">
                            <img height="25px" src={logo} alt=" body" />
                        </a>
                        <Link to={"/test"} className="navbar-brand">e-System</Link>
                    </div>
                    <div class=" navbar-collapse collapse">
                        <ul class=" nav navbar-nav">

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
 */}

export default Header;

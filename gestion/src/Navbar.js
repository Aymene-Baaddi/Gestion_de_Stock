import React ,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css"
import {FaBars} from 'react-icons/fa6'
import {ImCross} from 'react-icons/im'

export default function Navbar({ isAuthenticated, onLogout }) {
    const [Mobile, setMobile] = useState(false)
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/')
    };


    return(
        <nav className="navbar">

            <h3 className="logo">Fruits-Sec Benacer </h3>
            <ul className={Mobile ? "links-mobile" : "links"} onClick={() => setMobile(false)}>
                <Link to='/home'><li style={{color : "white"}}>Produits</li></Link>
                <Link to='/frigo'><li style={{color : "white"}}>Frigo</li></Link>
                <Link to='/homefruits'><li style={{color : "white"}}>Fruit-sec</li></Link>
                <Link to='/historique'><li style={{color : "white"}}>Historique</li></Link>
                {isAuthenticated ? (
                    
                    <li className="log" style={{color : "white"}} onClick={handleLogout}>Log-out</li>
                ) : (
                    <Link to='/'><li>Log-in</li></Link>
                )}
            </ul>
            <button className="menu" onClick={() => setMobile(!Mobile)}>
                {Mobile? <ImCross/> : <FaBars/>}
            </button>


        </nav>



    )
}
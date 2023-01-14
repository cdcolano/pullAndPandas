// Navbar.js
import "./styles/navbar.css";
import logo from "./imagenes/logo.png"
import { useEffect, useState } from "react";
import { isAuthenticated } from ".";



export default function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const [isAdmin, setIsAdmin]=useState(false)
    useEffect(()=>{
        const auth=isAuthenticated()
        if (auth){
            const ob=JSON.parse(auth)
            if (ob.role==1){
                setIsAdmin(true)
            }
        }
    },[null])
    return (
        <nav className="navigation">
            <div className="ContenidoHam">
                <div className="logoEmpr">
                    <img className="logo" src={logo} alt="Logo"></img>
                    <a href="/" className="brand-name">
                        Pull and Pandas
                    </a>
                </div>
            <button className="hamburger"
                onClick={() => {
                setIsNavExpanded(!isNavExpanded);
                }}
            >
                {/* icon from heroicons.com */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="white"
                >
                <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                />
                </svg>
            </button>
        </div>
        <div
            className={ 
                isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }
        >
            <ul>
                <li>
                    <a href="/">Products</a>
                </li>
                <li style={{
                   display:isAdmin?'none':'inline' 
                }}>
                    <a href="/user/update">Me</a>
                </li> 
                <li style={{
                    display:isAdmin?'inline' :'none'
                }}>
                    <a href="/prendas/admin">Create Product</a>
                </li>
                <li data-id="1" onClick={(event)=>{localStorage.removeItem('jwt')}}>
                {/* onClick={localStorage.removeItem('jwt')} */}
                    <a  href="/signin">Logout</a>
                </li>
            </ul> 
        </div>
        </nav>
    );
    }
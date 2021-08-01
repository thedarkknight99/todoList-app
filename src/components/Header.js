import React from 'react';
//import logo from '../assets/images/logo.png';
import ReorderSharpIcon from '@material-ui/icons/ReorderSharp';


const Header = () => {
    return (
        <header className="header">
            <nav>
                <div className="logo">
                    <ReorderSharpIcon />
                    {/* <img src={logo} alt="Todo List" /> */}
                </div>
                <div className="heading">
                    Todo List
                </div>
            </nav>
        </header>
    )
}

export default Header

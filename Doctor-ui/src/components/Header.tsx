import logo from '../assets/hygia_branco.png'

import '../styles/header.css'

export function Header(){
    return(
        <div className="header-container">
            <img src={logo} alt="logo" />
        </div>
    );
}
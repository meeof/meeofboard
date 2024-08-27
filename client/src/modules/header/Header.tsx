import * as style from './Header.module.css';
import logo from '../../assets/react.svg'
import AddContent from "../addContent/addContent.tsx";
import {useNavigate} from "react-router-dom";
import {forwardRef} from "react";
import * as React from "react";

const Header = forwardRef((props, ref) => {
    const navigate = useNavigate();
    return (
        <div ref={ref} className={style.header}>
            <img src={logo} className={style.logo} alt="logo" onClick={() => navigate('/')}/>
            <AddContent/>
        </div>
    );
});

export default Header;
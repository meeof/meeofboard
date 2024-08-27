import * as style from './Spinner.module.css'
import logo from "../../assets/react.svg";

const Spinner = () => {
    return (
        <img src={logo} className={style.logo} alt="logo"/>
    );
};

export default Spinner;
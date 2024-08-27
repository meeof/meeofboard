import Header from "./modules/header/Header.tsx";
import * as style from './App.module.css';
import {Outlet} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

function App() {
    const headerRef = useRef<HTMLElement | null>(null);
    const [isScroll, setIsScroll] = useState<boolean>(false);
    const [labelPosition, setLabelPosition] = useState<'fixed' | 'absolute'>('fixed');
    const checkScroll = ():void => {
        if (window.scrollY > 0) {
            setIsScroll(true)
        }
        else {
            setIsScroll(false);
        }
        if (window.scrollY > headerRef.current?.offsetHeight) {
            setLabelPosition('fixed')
        }
        else {
            setLabelPosition('absolute')
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", checkScroll)
    }, []);
  return (
    <div style={{minHeight: window.innerHeight}}>
        <Header ref={headerRef}/>
        <div className={style.app} style={{minHeight: window.innerHeight - 70}}>
            <div className={style.left}
            onClick={() => {
                window.scrollTo({
                    behavior: "smooth",
                    top: 0,
                    left: 0
                });
            }}>
                {isScroll && <div className={style.back}>
                    <div className={style.label} style={{position: labelPosition}}>Наверх ^</div>
                </div>}
            </div>
            <Outlet/>
            <div className={style.right}></div>
        </div>
    </div>
  )
}

export default App


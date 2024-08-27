import {useState} from 'react';
import * as style from "./AddContent.module.css";
import {$authHost} from "../../axios/hosts.ts";
import {postsApi} from "../posts/postsApi.ts";
import Login from "../user/Login.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/redux.ts";
import {auth} from "../user/userSlice.ts";
import {useLocation} from "react-router-dom";
const AddContent = () => {
    const location = useLocation();
    const mainPage:boolean = location.pathname === '/';
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [header, setHeader] = useState<string>('');
    const authorization:boolean = useAppSelector(auth);
    const dispatch = useAppDispatch();
    return (
        <div className={style.container}> {!showAdd ?
            <button className={style.button} onClick={() => {
                setShowAdd(true);
            }}>{mainPage ? 'Опубликовать пост' : 'Оставить комментарий'}</button>
                :
            <>{authorization ?
                <div className={style.createPostBox}>
                    {mainPage && <input type={"text"} value={header} placeholder={'Заголовок'}
                                        onChange={(e) => setHeader(e.target.value)}/>}
                <textarea value={text} placeholder={'Текст'}
                          onChange={(e) => setText(e.target.value)}/>
                <button onClick={():void => {
                    $authHost.post(mainPage ? '/posts' : '/comments', {
                        text,
                        header,
                        postId: location.pathname.slice(1),
                    }).then(data => {
                        setText('');
                        setHeader('');
                        setShowAdd(false);
                        if (mainPage) {
                            dispatch(postsApi.util.invalidateTags(["Posts"]))
                        }
                        else {
                            dispatch(postsApi.util.invalidateTags(["Comments"]))
                        }
                    })
                }} className={style.button}>{mainPage ? 'Опубликовать' : 'Отправить'}</button>
            </div>
                :
            <Login/>}</>}
        </div>
    );
};

export default AddContent;
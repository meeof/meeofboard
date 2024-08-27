import * as style from "./Block.module.css";
import {dateString} from "../../utils.ts";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {JSX} from "react";
import {useAppSelector} from "../../redux/redux.ts";
import {auth} from "../user/userSlice.ts";
interface IContent {
    id: number,
    userId: number,
    picture: string,
    createdAt: string,
    name: string,
    header: string,
    text: string,
}
interface IBlockProps {
    content : IContent,
    open: boolean,
    comment: boolean,
    delFun: (id:number) => void
}

const Block = ({content, open, comment, delFun}:IBlockProps) => {
    const navigate = useNavigate();
    const isAuth:boolean = useAppSelector(auth)
    let delButton: JSX.Element | null = null
    if (comment) {
        const token = localStorage.getItem('token');
        let myId: number | null = null;
        token && (myId = jwtDecode(token)['id']);
        ((myId === content.userId) && isAuth) && (delButton = <div className={style.delButton} onClick={() => {
            delFun && delFun(content.id)
        }}>&times;</div>)
    }
    return (
        <div className={`${style.container} ${comment && style.containerComment} ${(!comment && open) && style.containerOpenPost}`}>
            <div className={style.userInfo} style={{
                width: comment ? '100%' : '',
                marginBottom: comment ? '10px' : ''
            }}>
                <img className={style.picture} src={content.picture ?? '#'} alt={''}/>
                <div className={style.name}>{content.name}</div>
                <div className={style.date} style={{
                    marginLeft: comment ? 'auto' : ''
                }}>{dateString(content.createdAt)}</div>
            </div>
            {!comment && <div className={style.header}>{content.header}</div>}
            <div className={style.text}>{content.text}</div>
            {!open && <div className={style.toComments} onClick={() => navigate(`${content.id}`)}></div>}
            {delButton}
        </div>
    );
};

export default Block;
import {GoogleLogin} from '@react-oauth/google';
import {$authHost} from "../../axios/hosts.ts";
import {useAppDispatch} from "../../redux/redux.ts";
import {checkAuthFun} from "./checkAuth.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    return (
        <div style={{
            width: 'min-content',
        }}>
            <GoogleLogin
                onSuccess={async credentialResponse => {
                    localStorage.setItem('token', credentialResponse.credential.toString());
                    const {data} = await $authHost.get('/user/login');
                    localStorage.setItem('token', data);
                    dispatch(checkAuthFun.fulfilled())
                }}
                onError={() => {
                    dispatch(checkAuthFun.rejected())
                    console.log('Login Failed');
                }}
            />
        </div>
    );
};

export default Login;
import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton'
import { AuthContext } from '../context';

const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }
    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={login}>
                <input type="text" placeholder="Login"/>
                <input type="password" placeholder="Password"/>
                <MyButton>Log in</MyButton>
            </form>
        </div>
    );
};

export default Login;
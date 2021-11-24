import React, { useContext } from "react"
import {Link} from 'react-router-dom'
import { AuthContext } from "../../../context"
import MyButton from '../button/MyButton'

const Navigation = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }
    return (
        <div className="navbar">
            {isAuth && <MyButton onClick={logout}>Log out</MyButton>}
            <Link to="/about">About</Link>
            <Link to="/posts">Posts</Link>
        </div>
    )
}

export default Navigation
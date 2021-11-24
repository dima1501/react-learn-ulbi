import React, { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import { publicRoutes, privateRoutes } from "../router";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        isAuth
        ?
            <Routes>
                <Route path="*" element={<Navigate to="/posts"/>}/>
                {privateRoutes.map(route =>
                    <Route element={route.component} path={route.path} key={route.path}/>
                )}
            </Routes>
        :
            <Routes>
                {publicRoutes.map(route => 
                    <Route 
                        element={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
    )
}

export default AppRouter
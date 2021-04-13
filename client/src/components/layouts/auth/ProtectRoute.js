import React, {createContext, useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from './AuthContext'

const ProtectRoute = ({component: Component, ...rest}) =>{
    const authContext = useContext(AuthContext)
    const {isAuthenticated, loading} = authContext
    return(
        <div>
            <Route
                {...rest}
                render = {props =>
                    !isAuthenticated && !loading ? (
                        <Redirect to='/login' />
                    ): (
                        <Component {...props} />
                    )
                }
            />
        </div>
    )
} 

export default ProtectRoute
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Loading from './Loading'

export default function ProtectedRouter({children,log=false}) {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (log){
        if (!user){
            return children
        }else{
            return <Navigate to="/"/>
        }
    }else{
        if (!user){
            return <Navigate to="/login"/>
        }else{
            return children
        }
    }
}

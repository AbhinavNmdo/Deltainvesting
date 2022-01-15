import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('admin_auth_token')){
            navigate('/');
        }
    }, [])
    return (
        <>
            Admin
        </>
    )
}

export default Admin

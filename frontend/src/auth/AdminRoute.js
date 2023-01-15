import React, { Component, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../index';
import { useNavigate } from 'react-router-dom';

const AdminRoute = ({children }) => {
    const navigate = useNavigate();
    const[auth, setAuth]=useState(false)
    // useEffect(() => {
    useEffect(() => {
        const jwt=isAuthenticated()
        if (jwt){
            const object=JSON.parse(jwt);
            console.log(object);
            if (object.role==1){
                setAuth(true);
            }else{
                navigate('/loginAdmin');
            }
        }
    },[null]);
    return(children)  
    //  },[null]);


}

export default AdminRoute;
import React, { Component ,useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../index';
import { useNavigate } from 'react-router-dom';

const ClientRoute = ({children }) => {
    const navigate = useNavigate();
    const[auth, setAuth]=useState(false)
    // useEffect(() => {
    useEffect(() => {
        const jwt=isAuthenticated()
        if (jwt){
            const object=JSON.parse(jwt);
            console.log(object);
            if (object.role==0){
                setAuth(true);
            }else{
                navigate('/signin');
            }
        }
    },[null]);
    return(children)  
    //  },[null]);
}

export default ClientRoute;
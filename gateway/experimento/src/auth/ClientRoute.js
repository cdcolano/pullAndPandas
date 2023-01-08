import React, { Component ,useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../index';
import { useNavigate } from 'react-router-dom';

const ClientRoute = ({children }) => {
    const navigate = useNavigate();
    // useEffect(() => {
        const auth=isAuthenticated()
        if (auth){
            const object=JSON.parse(auth);
            console.log(object);
            if (object.role==0){
                return children;
            }
        }
        return navigate('/signin');
      
    //  },[null]);
}

export default ClientRoute;
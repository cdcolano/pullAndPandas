import React, { Component, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../index';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children }) => {
  const navigate = useNavigate();
  const[auth, setAuth]=useState(false)
   useEffect(() => {
      const auth=isAuthenticated()
      if (auth){
        setAuth(true)
      }else{
        navigate('/loginAdmin');
      }
    },[null]);
    return(children)
}

export default ProtectedRoute;
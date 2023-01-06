import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';
import { useNavigate } from 'react-router-dom';

const AdmindRoute = ({children }) => {
    const navigate = useNavigate();
    const auth=isAuthenticated()
    if (auth && auth.role==1) {
        return children;
    }
    return navigate('/signin');
  };

export default AdmindRoute;
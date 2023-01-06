import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const ProtectedRoute = ({children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

export default ProtectedRoute;
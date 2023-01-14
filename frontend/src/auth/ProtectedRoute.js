import React, { Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../index';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children }) => {
  const navigate = useNavigate();
  if (!isAuthenticated()) {
    return navigate("/signin" )
  }
  return children;
}

export default ProtectedRoute;
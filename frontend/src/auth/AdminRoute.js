import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../index';
import { useNavigate } from 'react-router-dom';

const AdminRoute = ({children }) => {
  const navigate = useNavigate();
  // useEffect(() => {
      const auth=isAuthenticated()
      if (auth){
          const object=JSON.parse(auth);
          console.log(object);
          if (object.role==1){
              return children;
          }
      }
      return navigate('/loginAdmin');
    }

export default AdminRoute;
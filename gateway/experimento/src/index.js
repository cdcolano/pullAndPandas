import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { API } from './config.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const signin = (user) => {
  // console.log(name, email, password);
 // return fetch(`${API}/signin`, {
  console.log(user)
  return fetch(`http://localhost:4000/clientes/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return({error:"Error en el inicio de sesion"})
    });
};

export const getUser = () => {
  // console.log(name, email, password);
 // return fetch(`${API}/signin`, {
  return fetch(`http://localhost:4000/clientes/user`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization:localStorage.getItem('jwt')
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return({error:"Error en el inicio de sesion"})
    });
};


export const signup= (user) => {
  // console.log(name, email, password);
 // return fetch(`${API}/signin`, {
  console.log(user)
  return fetch(`http://localhost:4000/clientes/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return({error:"Error en el inicio de sesion"})
    });
};



export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data))
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return localStorage.getItem('jwt');
  } else {
    return false;
  }
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

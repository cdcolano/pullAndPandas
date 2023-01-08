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
  return fetch(`${API}/signin`, {
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
  let item=JSON.parse(localStorage.getItem('jwt'))
  return fetch(`${API}/clientes/user`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${item.access_token}` 
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return({error:"Error al acceder al usuario"})
    });
};

export const updateUser = (data, cliente_id) => {
  // console.log(name, email, password);
 // return fetch(`${API}/signin`, {
  console.log(data)
  let item=JSON.parse(localStorage.getItem('jwt'))
  return fetch(`${API}/clientes/${cliente_id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${item.access_token}` 
    },
    body:JSON.stringify(data)
  })
    // .then((response) => {
    //   return response.json();
    // })
    .catch((err) => {
      console.log(err);
      return({error:"Error en la modificacion de los datos"})
    });
};



export const signup= (user) => {
  // console.log(name, email, password);
 // return fetch(`${API}/signin`, {
  console.log(user)
  return fetch(`${API}/signup`, {
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

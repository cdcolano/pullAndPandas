import React, { Component } from 'react'
import Login from './Login';
import NavbarLogIn from './NavbarLogIn';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useState, useEffect } from "react";
import { signup, authenticate, isAuthenticated } from './index';
export default function SignUp() {
    const[user, setUser]=useState(null)
    const [values, setValues]=useState({
        email:"",
        nombre:"",
        password:"",
        peso:0,
        edad:0,
        altura:0
    });
    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    const { email,nombre, password, peso, edad, altura} = values;
    const clickSubmit = (event) => {
        event.preventDefault(); // so that browser does not reload
        console.log("Entra")
        setValues({ ...values, error: false, loading: true });
        signup({ email,nombre, password ,peso, edad, altura}).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
              });
            });
            setUser(isAuthenticated())
         }
        });
      };
    const navigate=useNavigate();
    useEffect(() => {
        // Checking if user is not loggedIn
        if (user) {
          navigate(`/`);
        }
      }, [navigate, user])
    
    return (
        <div className="TotalContenedor">
            <div className="Contenedor">
                <NavbarLogIn></NavbarLogIn>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>Sign Up</h3>
                            <div className="mb-3">
                            <label>Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Last name" 
                                onChange={handleChange('nombre')}/>
                            </div>
                            <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={handleChange('email')}
                            />
                            </div>
                            <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={handleChange('password')}
                            />
                            </div>
                            <div className="mb-3">
                                <label>Peso</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="form-control"
                                    placeholder="Peso en KG"
                                    onChange={handleChange('peso')}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Altura</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    placeholder="Altura en cm"
                                    onChange={handleChange('altura')}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Edad</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    placeholder="Edad"
                                    onChange={handleChange('edad')}
                                />
                            </div>

                            <div className="d-grid">
                            <button id="bSignIn" type="submit" className="btn btn-primary" onClick={clickSubmit}>
                                {/* TODO CHANFE TO FETCH */}
                                Sign Up
                            </button>
                            </div>
                            <p className="forgot-password text-right">
                            Already registered <a href="/loginClient">sign in?</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
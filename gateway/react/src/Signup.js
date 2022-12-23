import React, { Component } from 'react'
import Login from './Login';
import NavbarLogIn from './NavbarLogIn';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function SignUp() {
    const navigate=useNavigate();
    const navigateToClient = () => {
        // 👇️ navigate to /contacts
        navigate('/loginClient');
    };
    
    return (
        <div className="TotalContenedor">
            <div className="Contenedor">
                <NavbarLogIn></NavbarLogIn>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>Sign Up</h3>
                            <div className="mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Last name" />
                            </div>
                            <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                            />
                            </div>
                            <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                            />
                            </div>
                            <div className="mb-3">
                                <label>Weight</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="form-control"
                                    placeholder="Weight in KG"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Height</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    placeholder="Height in cm"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Edad</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    placeholder="Edad"
                                />
                            </div>

                            <div className="d-grid">
                            <button id="bSignIn" type="submit" className="btn btn-primary" onClick={navigateToClient}>
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
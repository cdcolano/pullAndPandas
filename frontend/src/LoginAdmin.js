import React, { Component, useEffect } from 'react'
import "./styles/login.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {useState } from "react";
import NavbarLogIn from './NavbarLogIn';
import { redirect } from 'react-router-dom';
import { API } from './config.js';
import { Navigate} from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from './index';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from './index';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
export default function LoginAdmin(){
    const navigate = useNavigate();
    const [openPopup, setOpenPopup]= useState(false);
    const closePopup = () => setOpenPopup(false);
    const [values, setValues]=useState({
        id:0,
        password:"",
    });
    const { id, password} = values;
    const [ user,setUser ] = useState(null);

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    
      const clickSubmit = (event) => {
        event.preventDefault(); // so that browser does not reload
        setValues({ ...values, error: false, loading: true });
        loginAdmin({ id, password }).then((data) => {
          if (data.error) {
            setOpenPopup(true)
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
      useEffect(() => {
        console.log(isAuthenticated())
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
                        <h3>Sign In</h3>
                        <div className="mb-3">
                        <label>Codigo de empleado</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="0"
                            onChange={handleChange('id')}
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
                        <div className="custom-control custom-checkbox">
                            <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                            </label>
                        </div>
                        </div>
                        <div className="d-grid">
                        <button onClick={clickSubmit} id="bSignIn" type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        </div>
                        <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                        </p>
                        <Popup style={{height:"100px"}} open={openPopup} onClose={closePopup}>
                          <button className="close" onClick={closePopup}>
                            &times;
                          </button>
                            <span> Usuario o contraseña incorrectos </span>
                        </Popup>
                    </form>
                </div>
                </div>
            </div>
        </div>
        )
};
import React, { Component } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Login from './Login';
import NavbarLogIn from './NavbarLogIn';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useState, useEffect } from "react";
import { Button } from '@mui/material';
import Navbar from './Navbar';
import Popup from 'reactjs-popup';
import './styles/createProduct.css'
import 'reactjs-popup/dist/index.css';
import { signup, authenticate, isAuthenticated, getUser, updateUser, deleteUser } from './index';
export default function UpdateUser() {
    const[user, setUser]=useState(null);
    const loadUser = async() => {
        getUser().then((data) => {
            if (data.error) {
              console.log(data.error);
            } else {
              setUser(data);
            }
        }
        );
     }; 
    const [values, setValues]=useState({
        email:"",
        nombre:"",
        password:"",
        peso:0,
        edad:0,
        altura:0
    });
    const [openPopup, setOpenPopup]= useState(false);
    const closePopup = () => setOpenPopup(false);
    const [openPopupDelete, setOpenPopupDelete]= useState(false);
    const closePopupDelete = () => setOpenPopup(false);
    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    const { email,nombre, password, peso, edad, altura} = values;
    const clickSubmitUpdate = (event) => {
        event.preventDefault(); // so that browser does not reload
        setValues({ ...values, error: false, loading: true });
        updateUser({ email,nombre, password ,peso, edad, altura}, user.id_cliente).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          }else{
            setOpenPopup(true)
          }
        });
      };
      const clickSubmitDelete= (event) => {
        event.preventDefault(); // so that browser does not reload
        setValues({ ...values, error: false, loading: true });
        deleteUser(user.id_cliente).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          }else{
            setOpenPopupDelete(true)
          }
        });
      };
      useEffect(() => {
        // const [productId,setProductId] = useSearchParams();
         loadUser();
         //getImage(productId);
     },[null]);
      useEffect(() => {
        // const [productId,setProductId] = useSearchParams();
        if (user!=null){
            setValues({ email:user.email,nombre:user.nombre, password:user.password ,peso:user.peso, edad:user.edad, altura:user.altura});
        }
     },[user]);
    
    return (
        <div className="TotalContenedor">
            <div className="Contenedor">
                <Navbar></Navbar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>Configuracion</h3>
                            <div className="mb-3">
                            <label>Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={nombre}
                                onChange={handleChange('nombre')}/>
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
                                    placeholder={peso}
                                    onChange={handleChange('peso')}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Altura</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    placeholder={altura}
                                    onChange={handleChange('altura')}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Edad</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    placeholder={edad}
                                    onChange={handleChange('edad')}
                                />
                            </div>

                            <div className="d-grid">
                            <div className="d-grid">
                                <Button color="primary"  onClick={clickSubmitUpdate} variant="outlined" startIcon={<DeleteForeverIcon />}>Modificar</Button>
                                {/* TODO CHANFE TO FETCH */}
                            </div>
                            <div className="d-grid">
                                <Button color="error" onClick={clickSubmitDelete} style={{marginTop:"10px"}} variant="outlined" startIcon={<DeleteForeverIcon />}>Eliminar</Button>
                                {/* TODO CHANFE TO FETCH */}
                            </div>
                            </div>
                            <Popup className='create-product-popup' open={openPopup} onClose={closePopup}>
                            <button className="close" onClick={closePopup}>
                            &times;
                            </button>
                            <span> Usuario modificado correctamente</span>
                        </Popup>
                        <Popup className='create-product-popup' open={openPopupDelete} onClose={closePopupDelete}>
                            <button className="close" onClick={closePopupDelete}>
                            &times;
                            </button>
                            <span> Usuario eliminado</span>
                        </Popup>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
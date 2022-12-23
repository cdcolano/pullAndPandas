import { Component } from 'react'
import Login from './Login';
import Navbar from './Navbar';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Textarea from '@mui/joy/Textarea';
import { Button } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { FileUploader } from "react-drag-drop-files";
import {React,useEffect, useState } from "react";
import './styles/fileUploader.css';

export default function CreateProduct() {
    const navigate=useNavigate();
    const navigateToClient = () => {
        // 👇️ navigate to /contacts
        navigate('/loginClient');
    };
    const [file, setFile] = useState([{}]);
    const handleChange = (file) => {
        console.log(file[0].name)
        setFile(file);
    };
    const fileTypes = ["JPEG", "PNG", "GIF"];
    
    return (
        <div className="TotalContenedor">
            <div className="Contenedor">
                <Navbar></Navbar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>Crea una nueva prenda!</h3>
                            <div className="mb-3">
                                <label>Nombre</label>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>
                            <div className="mb-3">
                            <label>Descripcion</label>
                                <Textarea
                                    placeholder="Type in here…"
                                    defaultValue="Describe el producto"
                                    minRows={4}
                                    maxRows={4}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="form-control"
                                    placeholder="Precio en €"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Imagen</label>
                                <FileUploader
                                    multiple={true} //DE MOMENTO LO DEJAMOS EN FALSE
                                    className="fileUploader"
                                    handleChange={handleChange}
                                    name="file"
                                    types={fileTypes}
                                />
                                <p>{file[0].name ? `File name: ${file[0].name}` : ""}</p>
                            </div>
                            <div className="d-grid">
                                <Button color="success"  variant="outlined" startIcon={<DoneAllIcon />}>Crear</Button>
                                {/* TODO CHANFE TO FETCH */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
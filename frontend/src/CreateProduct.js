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
import Popup from 'reactjs-popup';
import './styles/createProduct.css'
import 'reactjs-popup/dist/index.css';
import { API } from './config';


export default function CreateProduct() {
    const createProductFunc=async(prenda)=>{
        let item=JSON.parse(localStorage.getItem('jwt'))
        return fetch(`${API}/prendas`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${item.access_token}`
        },
        body: JSON.stringify(prenda),
      })
        .then(async(response) => {
            const body=await response.json()
            // var myHeaders = new Headers();
            // myHeaders.append("Accept", "application/json");
            // // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJh");
    
            // // var formdata = new FormData();    
            // // formdata.append("image", fileInput.files[0], file[0].name );
    
            // var requestOptions = {
            // method: 'POST',
            // headers: myHeaders,
            // body: formdata,
            // redirect: 'follow'
            // };
            if (file[0]){
            const formData2 = new FormData();
            formData2.append("files", file[0]);
            return fetch(`${API}/uploadfiles/${body.id_prenda}`, {
                method: 'POST',
                // headers: {
                //   Accept: 'application/json',
                //   'Content-Type': 'application/json',
                // },
                body: formData2,
            });
            
        } 
        })
        .catch((err) => {
          console.log(err);
          return({error:"Error en la creacion de la prenda"})
        });
    }
    const [openPopup, setOpenPopup]= useState(false);
    const closePopup = () => setOpenPopup(false);

    const [values, setValues]=useState({
        nombre:"",
        marca:"",
        description:"",
        precio:0
    });
    const handleChangeValues = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    const { nombre,marca, description,precio} = values;
    const clickSubmit=(event)=>{
        event.preventDefault(); // so that browser does not reload
        setValues({ ...values, error: false, loading: true });
        createProductFunc({ nombre,marca, description, precio}).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            setOpenPopup(true)
           //showMessageSuccess();
         }
        });
    }
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
                                <input onChange={handleChangeValues('nombre')} type="text" className="form-control" placeholder="Last name" />
                            </div>
                            <div className="mb-3">
                                <label>Marca</label>
                                <input type="text" onChange={handleChangeValues('marca')} className="form-control" placeholder="Marca" />
                            </div>
                            <div className="mb-3">
                            <label>Descripcion</label>
                                <Textarea
                                    placeholder="Type in here…"
                                    defaultValue="Describe el producto"
                                    minRows={4}
                                    maxRows={4}
                                    onChange={handleChangeValues('description')}
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
                                    onChange={handleChangeValues('precio')}
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
                                <Button color="success" onClick={clickSubmit} variant="outlined" startIcon={<DoneAllIcon />}>Crear</Button>
                                {/* TODO CHANFE TO FETCH */}
                            </div>
                            <Popup className='create-product-popup' open={openPopup} onClose={closePopup}>
                            <button className="close" onClick={closePopup}>
                            &times;
                            </button>
                            <span> Producto creado </span>
                        </Popup>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
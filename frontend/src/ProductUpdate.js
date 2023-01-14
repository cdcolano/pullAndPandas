import { Component } from 'react'
import Login from './Login';
import Navbar from './Navbar';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Textarea from '@mui/joy/Textarea';
import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FileUploader } from "react-drag-drop-files";
import {React,useEffect, useState } from "react";
import './styles/fileUploader.css';
import { API } from './config.js';
import Popup from 'reactjs-popup';
import './styles/createProduct.css'
import 'reactjs-popup/dist/index.css';
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

  export const read = (productId) => {
    return fetch(`${API}/prendas/${productId}`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

export default function ProductUpdate() {
    const navigate = useNavigate();
    const [product, setProduct] = useState([])
    const [error, setError] = useState(false);
    const [image, setImage] = useState({})
    const loadProduct = async(productId) => {
        read(productId).then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setProduct(data);
            }
        }
        );
     }; 
    const getImage = async(productId) => {
        const res=await fetch(`${API}/prendas/${productId}/img`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);
    }
    const { productId } = useParams();
    const deleteProductFunc=()=>{
        let item=JSON.parse(localStorage.getItem('jwt'))
        return fetch(`${API}/prendas/${productId}`, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${item.access_token}`
            }
        }
        );
    }
    const updateProductFunc=async(prenda)=>{
        console.log(prenda)
        let item=JSON.parse(localStorage.getItem('jwt'))
        return fetch(`${API}/prendas/update/${productId}`, {
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
                return fetch(`${API}/uploadfiles/${productId}`, {
                    method: 'POST',
                    // headers: {
                    //   Accept: 'application/json',
                    //   'Content-Type': 'application/json',
                    // },
                    body: formData2,
                })
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
        updateProductFunc({ nombre,marca, description, precio}).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
           setOpenPopup(true)
         }
        });
    }

    const clickSubmitDelete=(event)=>{
        event.preventDefault(); // so that browser does not reload
        deleteProductFunc();
        navigate("/")
    }
    const [file, setFile] = useState([null]);
    const handleChange = (file) => {
        console.log(file[0].name)
        setFile(file);
    };
    useEffect(() => {
        // const [productId,setProductId] = useSearchParams();
         loadProduct(productId);
         //getImage(productId);
     },[null]);
     useEffect(() => {
        // const [productId,setProductId] = useSearchParams();
         setValues({nombre:product.nombre, marca:product.marca,description:product.description,precio:product.precio});
     },[product]);

    //  useEffect(() => {
    //     // const [productId,setProductId] = useSearchParams();
    //      //setValues({nombre:product.nombre, marca:product.marca,description:product.description,precio:product.precio});
    //      setFile(image);
    //  },[image]);
     if (!product.nombre){
         getImage(productId)
         return null
     }
    const fileTypes = ["JPEG", "PNG", "GIF"];
    
    return (
        <div className="TotalContenedor">
            <div className="Contenedor">
                <Navbar></Navbar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>Modifica esta prenda!</h3>
                            <div className="mb-3">
                                <label>Nombre</label>
                                <input onChange={handleChangeValues('nombre')} placeholder={product.nombre} type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label>Marca</label>
                                <input type="text" onChange={handleChangeValues('marca')} placeholder={product.marca} className="form-control"/>
                            </div>
                            <div className="mb-3">
                            <label>Descripcion</label>
                                <Textarea
                                    // placeholder="Type in here…"
                                    //defaultValue="Describe el producto"
                                    minRows={4}
                                    maxRows={4}
                                    placeholder={product.description}
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
                                    placeholder={`${product.precio}`}
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
                                    fileOrFiles={image}
                                />
                                {/* <p>{file[0].name ? `File name: ${file[0].name}` : ""}</p> */}
                            </div>
                            <div className="d-grid">
                                <Button color="primary" onClick={clickSubmit} variant="outlined" startIcon={<DeleteForeverIcon />}>Modificar</Button>
                                {/* TODO CHANFE TO FETCH */}
                            </div>
                            <div className="d-grid">
                                <Button color="error" style={{marginTop:"10px"}} onClick={clickSubmitDelete} variant="outlined" startIcon={<DeleteForeverIcon />}>Eliminar</Button>
                                {/* TODO CHANFE TO FETCH */}
                            </div>
                            <Popup className='create-product-popup' open={openPopup} onClose={closePopup}>
                            <button className="close" onClick={closePopup}>
                            &times;
                            </button>
                            <span> Producto modificado correctamente</span>
                        </Popup>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
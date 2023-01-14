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
import ComboBox from 'react-responsive-combo-box';
import Popup from 'reactjs-popup';
import './styles/createProduct.css'
import 'reactjs-popup/dist/index.css';
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";


export default function UpdateStock() {
    const { productId } = useParams();
    const update_stock = (stock) => {
        // console.log(name, email, password);
       // return fetch(`${API}/signin`, {
        let item=JSON.parse(localStorage.getItem('jwt'))
        return fetch(`http://localhost:8002/prendas/stock/${productId}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${item.access_token}`
          },
          body: JSON.stringify(stock),
        })
          .then((response) => {
            setOpenPopup(true)
            return response.json();
          })
          .catch((err) => {
            console.log(err);
            return({error:"Error en la modificacion del stock"})
          });
      };
      const [openPopup, setOpenPopup]= useState(false);
      const closePopup = () => setOpenPopup(false);
      
    const [values, setValues]=useState({
        size:"",
        quantity:0
    });
    const handleChangeValues = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    const { size,quantity} = values;
    const clickSubmit = (event) => {
        event.preventDefault(); // so that browser does not reload
        setValues({ ...values, error: false, loading: true });
        console.log(size)
        update_stock({ size, quantity });
      };
    
    
    return (
        <div className="TotalContenedor">
            <div className="Contenedor">
                <Navbar></Navbar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>Modifcia el stock!</h3>
                            <div className="mb-3">
                                <label>Talla</label>
                                <ComboBox onSelect={(option)=>{setValues({...values,'size':option})}}
                                    style={{
                                    margin: "0 auto",
                                    marginTop:"5px",
                                    marginBottom:"15px",
                                    width:"100%"
                                    }}
                                    placeholder="Elija una talla"
                                    options={["XS", "S", "M","L", "XL"]}
                        // onSelect={(option) => ChangeStock(product.stocks.find(stock_tmp => {
                        //     return stock_tmp.size === option
                        // }).quantity>0)
                        //}
                        />
                            </div>
                           
                         <div className="mb-3">
                                <label>Cantidad</label>
                                <input onChange={handleChangeValues('quantity')} type="text" className="form-control" placeholder="Nueva cantidad" />
                            </div>
                            <div className="d-grid">
                                <Button id="bSignIn" onClick={clickSubmit} variant="outlined" startIcon={<DoneAllIcon />}>Modificar Stock</Button>
                                {/* TODO CHANFE TO FETCH */}
                            </div>
                            <Popup className='create-product-popup' open={openPopup} onClose={closePopup}>
                            <button className="close" onClick={closePopup}>
                            &times;
                            </button>
                            <span> Stock modificado correctamente</span>
                        </Popup>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
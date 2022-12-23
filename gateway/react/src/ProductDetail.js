// Navbar.js
//TO RUN npm install --legacy-peer-deps
import Navbar from "./Navbar.js";
import {React,useEffect, useState } from "react";
import { API } from './config.js';
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme } from '@mui/material/styles';
import { green, deepOrange } from '@mui/material/colors';
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



export default function ProductDetail(props) {
    const { productId } = useParams();
    const [product, setProduct] = useState([])
    const [error, setError] = useState(false);
    const [hayStock, setHayStock] = useState(false)
    const [image, setImage] = useState({})
   // const [productId, setProductId]=useState({})
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

    const ChangeStock=(hay) => {
        setHayStock(hay)
    };
    
    useEffect(() => {
       // const [productId,setProductId] = useSearchParams();
        loadProduct(productId);
        //getImage(productId);
    });

    if (!product.nombre){
        getImage(productId)
        return null
    }
    return (
        <div className='Product' >
            <Navbar/>
            <div className='row'>
                <div className='col-md-2'></div>
                    <div className='col-md-4 col-sm-12'>
                        <h4>{product.nombre}</h4>
                        <h5>{product.marca}</h5>
                        <p>{product.description}</p> 
                        <p>{product.img}</p>
                        <p>{product.precio} €</p>
                        <img src={image}></img>
                        <p>IMAGEN</p>
                        <ComboBox options={ product.stocks ? product.stocks.map(function(a) {return a.size;}) : []}
                        onSelect={(option) => ChangeStock(product.stocks.find(stock_tmp => {
                            return stock_tmp.size === option
                        }).quantity>0)
                        }/>
                        <button disabled={!hayStock} id={hayStock ? "bSignIn": "bSignInDesactivado"} type="submit" className="btn btn-primary">
                            Submit
                        </button>
                       
                    {/* {product && product.description && (
                        //<Card product={product} showViewProductButton={false} />
                    )} */}

                    </div>
                    <div className="img">
                    </div>

                {/* <div className='col-md-4'>
                {/* <h4>Related products</h4> */}
                {/* {relatedProduct.map((p, i) => (
                    <div className='mb-3' key={i}>
                    <Card product={p} />
                    </div>
                ))} }
                </div> */}
            <div className='col-md-2'></div>
        </div>
        
        </div>
    );
    }
// Navbar.js
//TO RUN npm install --legacy-peer-deps
import Navbar from "./Navbar.js";
import './styles/product.css';
import {React,useEffect, useState } from "react";
import { API } from './config.js';
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, useRadioGroup } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme } from '@mui/material/styles';
import { green, deepOrange } from '@mui/material/colors';
import StarRatingComponent from 'react-star-rating-component';
import 'react-comments-section/dist/index.css'
import { useNavigate } from 'react-router-dom';
import { CommentSection} from 'react-comments-section';
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";
import { isAuthenticated } from "./index.js";


export const read = (productId) => {
    return fetch(`${API}/prendas/${productId}`,{//`${API}/prendas/${productId}`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

export const getTalla=()=>{
    let item=JSON.parse(localStorage.getItem('jwt'))
    return fetch(`${API}/recomendador`,{
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${item.access_token}` ,
    }})
    .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

export const comentar=(data, productId)=>{
    let item=JSON.parse(localStorage.getItem('jwt'))
    return fetch(`${API}/prendas/comentar/${productId}`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${item.access_token}` ,
        },
        body: JSON.stringify(data)});
}




export default function ProductDetail(props) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([])
    const [error, setError] = useState(false);
    const [hayStock, setHayStock] = useState(false)
    const [image, setImage] = useState({})
    const[talla, setTalla]=useState(null)
    const[comentariosFormateados,setComentariosFormateados]=useState([]);
    const[isAdmin, setIsAdmin]=useState(false);
    const[controladorTalla, setControladorTalla]=useState(false)
    const comprarButton=()=>{
        navigate(`/prendas/payment/${productId}`)
    }
    const getComentariosFormateados=(product)=>{
        const coms=product.comentarios.map((data)=>{
            const com= {'fullName':data.fullName,'avatarUrl':data.avatarUrl,'text':data.text,'replies':[]};
            console.log(com)
            return com
        })
        setComentariosFormateados(coms)
        return comentariosFormateados
    }
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
     const loadTalla=async()=>{
       getTalla().then((data)=>{
        setTalla(data.talla)
       });
     }
    const getImage = async(productId) => {
        const res=await fetch(`${API}/prendas/${productId}/img`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);
    }
    const makeComment=async(data)=>{
        const texto={"text": data.text}
        comentar(texto, productId);
    }

    const ChangeStock=(hay) => {
        setHayStock(hay)
    };
    const [rating, setRating] = useState(0)

    // Catch Rating value
    const handleRating = (rate) => {
      setRating(rate)
  
      // other logic
    }
    // Optinal callback functions
    
    useEffect(() => {
       // const [productId,setProductId] = useSearchParams();
        const auth=isAuthenticated()
        const ob=JSON.parse(auth)
        console.log(ob.role)
        if (ob.role==1){
            setIsAdmin(true)
        }
        loadProduct(productId);
        loadTalla();
        //getImage(productId);
    },[null]);
    useEffect(() => {
        if(product.comentarios){
            console.log(getComentariosFormateados(product));
        }
     },[product]);

     useEffect(() => {
        if(product.comentarios){
            console.log(getComentariosFormateados(product));
        }
     },[product]);

    if (!product.nombre){
        getImage(productId)
        return null
    }
    return (
        <div className='Product' >
            <Navbar/>
            <div className="separador">
            <Row className='align-items-center'>  
                <Col md="6">
                    <img className="imgProd" src={image}></img>
                </Col>
                <Col md="6">
                    <div className="colocador">
                        <h1>{product.nombre}</h1>
                        <h2>{product.marca}</h2>
                        <p>{product.description}</p> 
                        <p>{product.precio} €</p>
                        <Row className='align-items-center'>
                        {/* <div className='align-items-center'> */}
                            <Col md="6">
                                <p className="dudaTalla">¿No conoce su talla?</p>
                            </Col>
                            <Col md="6">
                                <button onClick={()=>setControladorTalla(!controladorTalla)} className="buscadorTalla">Encontrar mi talla</button> 
                            </Col>
                        {/* </div> */}
                        </Row>
                        <Row>
                            <p style={{
                                display:controladorTalla?'block':'none'
                            }

                            }>Su talla es: {talla}</p>
                        </Row>
                        <ComboBox  style={{
                            margin: "0 auto",
                            marginTop:"5px",
                            marginBottom:"15px",
                            width:"100%"
                            }}
                            placeholder="Elija una talla"
                        options={ product.stocks ? product.stocks.map(function(a) {return a.size;}) : []}
                        onSelect={(option) => ChangeStock(product.stocks.find(stock_tmp => {
                            return stock_tmp.size === option
                        }).quantity>0)
                        }/>
                        <button onClick={comprarButton} disabled={(!hayStock) ||isAdmin} id={(hayStock && (!isAdmin)) ? "bSignIn": "bSignInDesactivado"} type="submit" className="btn btn-primary compra-producto">
                            Comprar
                        </button>
                    </div>
                </Col>
          </Row>
          </div>
          <Row className='align-items-center'>
            <Col md="1"></Col>
            <Col md="4">
                <p className="valoracionMedia">Por favor valore nuestro producto</p>
            </Col>
            <Col md="2">
                {/* <StarRatingComponent 
                                    name="rate2" 
                                    editing={false}
                                    style={{
                                        fontSize:20
                                    }}
                                    //renderStarIcon={() => <span></span>}
                                    starCount={5}
                                    value={3}
                                /> */}
                <StarRatingComponent 
                            name="rate2" 
                            style={{
                                fontSize:20
                            }}
                            //renderStarIcon={() => <span></span>}
                            starCount={5}
                            onStarClick={(nextValue, prevValue, name)=>{
                               // realizaValoracion(nextValue)
                            }}//realizaValoracion}
                        />


            </Col>
        </Row>
        <Row>
            <Col>
                <CommentSection
                currentUser={{
                    currentUserFullName:"alfredo",
                    currentUserImg: 'https://ui-avatars.com/api/name=Lily&background=random',
                }
                }
                 commentData={
                    comentariosFormateados
                //     fullName: 'Riya Negi',
                //     avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
                //     text: 'Hey, Loved your blog! ',
                //     replies: []
                 }
                logIn='http:localhost:3000/logInClient'
                onSubmitAction={(data)=>makeComment(data)}
                >
                </CommentSection>
            </Col>
        </Row>

    </div>
    );
    }
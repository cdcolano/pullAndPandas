import React, { useEffect, useState } from 'react';
//  import { Redirect } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles/Card.css';
import { API } from './config.js';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CardM from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { width } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { purple, red } from '@mui/material/colors';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';

//import { addItem, updateItem, removeItem } from './cartHelpers';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  productDescription: {
    height: '100px',
    marginBottom:'15px',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));



export default function Card ({
  product,
  isAdmin=false,
  // showViewProductButton = true,
  // showAddToCartButton = false,
  // cartUpdate = false,
  // showUpdateBtn=false,
  // showRemoveProductButton = false,
  // setRun = (f) => f, // default value of function
  // run = undefined, // default value of undefined
}) {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const [image, setImage]=useState({})

  const getImage = async(productId) => {
    const res=await fetch(`${API}/prendas/${productId}/img`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImage(imageObjectURL);
}
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
         <Link href={`/prendas/${product.id_prenda}`} className='mr-2'>
          <Button id='bShowView' 
          className={classes.button}
          startIcon={<VisibilityIcon/>} style={{width:"100%"} }>
              View Product
          </Button>
        </Link>
      )
    );
  };

  const showUpdateButton = (showUpdateBtn) => {
    return (
        showUpdateBtn && (
         <Link href={`/prendas/update/${product.id_prenda}`} className='mr-2 bSignIn'>
         <Button variant="contained" color='primary' style={{width:"100%",marginBottom:  "15px"}} startIcon={<UpdateRoundedIcon/>}>
            Update Product
          </Button>
        </Link>
      )
    );
  };


//   const addToCart = () => {
//     // console.log('added');
//     addItem(product, setRedirect(true));
//   };

  const shouldRedirect = (redirect) => {
    if (redirect) {
    //   return <Redirect to='/cart' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button 
        // onClick={addToCart} 
        variant='contained' color='secondary'>
          Add to cart
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock </span>
    ) : (
      <span className='badge badge-primary badge-pill'>Out of Stock </span>
    );
  };

//   const handleChange = (productId) => (event) => {
//     setRun(!run); // run useEffect in parent Cart
//     setCount(event.target.value < 1 ? 1 : event.target.value);
//     if (event.target.value >= 1) {
//       updateItem(productId, event.target.value);
//     }
//   };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='mt-2'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              //onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showStockUpdateButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Link href={`/update/stock/${product.id_prenda}`} className='mr-2'> 
          <Button
            onClick={() => {
            // removeItem(product._id);
              //clickSubmitDelete; // run useEffect in parent Cart
            }}
            variant='contained'
            style={{
                backgroundColor:"#9F2B68",
                width:"100%",
                color:"#FFF"}}
            className={classes.button}
            startIcon={<LocalShippingIcon />}
          >
            Update Stock
          </Button>
        </Link>
      )
    );
  };
  useEffect(()=>{
    getImage(product.id_prenda)
  },[product.id_prenda]);
  
  const classes = useStyles();

  return (
    // <div className='card'>
    //   <div className='card-header name'>{product.name}</div>
    //   <div className='card-body'>
    //     {shouldRedirect(redirect)}
    //     <ShowImage item={product} url='product' />
    //     <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
    //     <p className='black-10'>${product.price}</p>
    //     <p className='black-9'>
    //       Category: {product.category && product.category.name}
    //     </p>
    //     <p className='black-8'>
    //       Added on {moment(product.createdAt).fromNow()}
    //     </p>

    //     {showStock(product.quantity)}
    //     <br></br>

    //     {showViewButton(showViewProductButton)}

    //     {showAddToCartBtn(showAddToCartButton)}

    //     {showRemoveButton(showRemoveProductButton)}

    //     {showCartUpdateOptions(cartUpdate)}
    //   </div>
    // </div>

    <Container className={classes.cardGrid} maxWidth='md'>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <CardM className={classes.card}>
            {/* {shouldRedirect(redirect)} */}
            <img style={{width:"100%", height:"400px"}} src={image}></img>
            {/* { <ShowImage item={product} url='product' /> } */}
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant='h5' component='h2'>
                {product.nombre}
              </Typography>
              <Typography className={classes.productDescription}>{product.description.substring(0, 97)}{product.description.length<97? '':'...'}</Typography>
              <p className='black-10'>Precio: {product.precio}€</p>
              {/* <p className='black-9'>
                Category: {product.category && product.category.name}{' '}
              </p>{' '} */}
              {/* {showStock(product.quantity)} */}
              <br></br>
              <Row>
                {showViewButton(true)}
              </Row>
              <Row>
                {showUpdateButton(isAdmin)}
              </Row>
                {/* <Row>
                {/* {showAddToCartBtn(showAddToCartButton)} 
                </Row> */}
              <Row>
                {showStockUpdateButton(isAdmin)}
              </Row>
  
              {/* {showCartUpdateOptions(cartUpdate)} */}
            </CardContent>
          </CardM>
        </Grid>
      </Grid>
    </Container>
  );
};

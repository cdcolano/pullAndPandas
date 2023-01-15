import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API } from './config.js';
import {React,useEffect, useState } from "react";
import Card from './Card.js'
import Navbar from './Navbar.js';
import { isAuthenticated } from './index.js';
export const readAllProducts = () => {
    return fetch(`${API}/prendas/`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

export default function ProductList(){
    const [role, setRole]=useState(0)
    const [filteredResults, setFilteredResults] = useState([]);
    const loadProducts = async() => {
        readAllProducts().then((data) => {
            if (data.error) {
              //setError(data.error);
            } else {
                setFilteredResults(data);
            }
        }
        );
     }; 
    useEffect(()=>{
      loadProducts();
      const jwt=JSON.parse(isAuthenticated())
      setRole(jwt.role)
    },[null]);
    if (!filteredResults[0]){
        //getImage(productId)
        return null
    }
    return (
        <div className='Product' >
        <Navbar></Navbar>
    <Row>
    {filteredResults.map((product, i) => (
        <Col key={i} md="4">
        <Card product={product } isAdmin={role==0 ? false: true}
        />
        </Col>
    ))}
    </Row>
    </div>
    );
}
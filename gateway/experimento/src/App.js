import logo from './logo.svg';
import './App.css';
import './Navbar.js'
import Navbar from './Navbar.js';
import ProductDetail from './ProductDetail';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom' 
import Payment from './Payment';
import CreateProduct from './CreateProduct';
import ProductList from './ProductList';
import ProductUpdate from './ProductUpdate';
import UpdateStock from './UpdateStock';
import UpdateUser from './UpdateUser';


function App() {
  return (
    // <div className="App">
      /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
      //ProductDetail productId={1}/>
      
    //   <Login></Login>
    // </div>
    <Router>
    <div className="App">
          <Routes>
          <Route exact path="/" element={<ProductList />} />
            <Route exact path="user/update/" element={<UpdateUser />} />
            <Route exact path="/loginClient" element={<Login />} />
            <Route exact path="/loginAdmin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/prendas/:productId" element={<ProductDetail/>} />
            <Route path="/prendas/create" element={<CreateProduct/>} />
            <Route path="/prendas/update/:productId" element={<ProductUpdate/>} />
            <Route path="/prendas/payment/:productId" element={<Payment/>} />
            <Route path="/update/stock/:productId" element={<UpdateStock/>} />
            <Route path="/prendas/admin" element={<CreateProduct/>} />
          </Routes>
    </div>
  </Router>
  );
}

export default App;

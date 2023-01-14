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
import ProtectedRoute from './auth/ProtectedRoute';
import AdminRoute from './auth/AdminRoute';
import ClientRoute from './auth/ClientRoute';
import  LoginAdmin  from './LoginAdmin';


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
            <Route exact path="/" element={
                  <ProtectedRoute>
                    <ProductList/>
                </ProtectedRoute>
            }
            /> 
            <Route exact path="user/update/" element={
                <ClientRoute>
                    <UpdateUser />
                </ClientRoute>} />
            <Route exact path="/signin" element={<Login />} />
            <Route exact path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/prendas/:productId" element={
                <ProtectedRoute>
                  <ProductDetail/>
                </ProtectedRoute>
              } />
            <Route path="/prendas/create" element={
                <AdminRoute>
                  <CreateProduct/>
                </AdminRoute>} />
            <Route path="/prendas/update/:productId" element={
            <AdminRoute>
                <ProductUpdate/>
            </AdminRoute>}/>
            <Route path="/prendas/payment/:productId" element={
                <ClientRoute>
                    <Payment/>
                </ClientRoute>} />
            <Route path="/update/stock/:productId" element={
              <AdminRoute>
                  <UpdateStock/>
              </AdminRoute>}/>
            <Route path="/prendas/admin" element={
             <AdminRoute>
                <CreateProduct/>
              </AdminRoute>}/>
          </Routes>
    </div>
  </Router>
  );
}

export default App;

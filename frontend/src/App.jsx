import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import { Api } from './apiConfig';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import AdminSignIn from './pages/AdminSignIn';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import Users from './pages/Users';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <Router>
        <Routes>
          < Route path='/' element = {< Home />} />
          < Route path = '/signin' element = {< SignIn />} />
          < Route path = '/signup' element = {< SignUp />} />
          < Route path = '/products' element = {< Products />} />
          < Route path = "/cart" element = {< Cart />} />
          < Route path = "/productDetails/:id?" element = {< ProductDetails />} />
          < Route path = '/profile' element = {< Profile />} />
          < Route path = '/admin' element = {< AdminSignIn />} />
          < Route path = '/dashboard' element = {< AdminDashboard />} />
          < Route path = '/addproduct' element = {< AddProduct />} />
          < Route path = '/allusers' element = {< Users />} />
          < Route path = "*" element = { <h1>Invalid Route</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

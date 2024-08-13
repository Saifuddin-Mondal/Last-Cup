import './App.css';
import {Routes,Route} from "react-router"
import Home from "./Component/Pages/Home"
// import About from './Component/Pages/About';
import Login from "./Component/Pages/Login"
import Signup from "./Component/Pages/Signup"
import Otp from "./Component/Pages/Otp"
import Profile from './Component/Pages/Profile';
import Cart from './Component/Pages/Cart'
import Checkout from './Component/Pages/Checkout'
import Product from './Component/Pages/Product'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/about' element={<About/>}/> */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/product-listing' element={<Product/>}/>
      </Routes>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/SignUp/SignUp';
import PrivateComponents from './Components/PrivateComponent/PrivateComponents';
import Login from './Components/Login/Login'
import AddProduct from './Components/AddProduct/AddProduct';
import ProductList from './Components/ProductList/ProductList';
import Update from './Components/Update/Update';
import Profile from './Components/Profile/Profile';
function App() {
 
  return (
    
    <div className="App">
    
      <BrowserRouter> 
      <Header />
        <Routes>
          <Route element={<PrivateComponents/>} >
          <Route path='/' element={<ProductList/>} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/profile' element={<Profile/>} />
         <Route path='/logout' element={<h1>logout</h1>} /> 
          </Route>

          <Route path='/signup' element={<SignUp />} /> 
          <Route path='/login' element={<Login/>} /> 
          </Routes> 
        {/* <Footer/>  */}
      </BrowserRouter>  
    {/* <SignUp />
    <Login /> */}
      
    </div>
  );
}

export default App;

import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import GoogleLogin from './GoogleLogin';
import Dashboard from './Dashboard';
import PageNotFound from './PageNotFound';
import {GoogleOAuthProvider} from '@react-oauth/google';
import RefreshHandler from './refreshHandler';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const GoogleAuthWrapper = ()=>{
    return(
      <GoogleOAuthProvider clientId='1036484322855-g1fq710725b6h9b2gbinhahge64bjbdn.apps.googleusercontent.com'>
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    )
  }
  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }

  return (
    <BrowserRouter>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/login' element={<GoogleAuthWrapper/>}/>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>} />}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

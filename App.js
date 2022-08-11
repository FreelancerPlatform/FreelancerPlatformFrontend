import React from 'react';
import { Routes,Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './App.css'
const App = () => {
    return (
        <div className='LS'>
            <Link to='/login' className='link'>Login</Link>
            <span>/</span>
            <Link to='/register' className='link'>Register</Link>
            <Routes>
                <Route path='/login' element={<Login/> }/>
                <Route path='/register' element={<Register/> }/>
            </Routes>
        </div>
    )
}

export default App
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Layout from './pages/Layout'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login';
import Profile from './pages/Profile'
import Friends from './pages/Friends';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/signup' element= {<SignUp />} />
          <Route path='/login' element = {<Login/>} />
          <Route path='/profile' element = {<Profile/>} />
          <Route path='/friends' element = {<Friends/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

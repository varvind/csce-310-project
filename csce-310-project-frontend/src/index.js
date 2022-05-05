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
import ChangeStatus from './pages/ChangeStatus'
import Settings from './pages/user_settings/Settings'
import Search from './pages/Search';
import UserProfile from './pages/UserProfile'
import All_Comments from './pages/All_Comments'
import ChangeComment from './pages/ChangeComment'
import All_Events from './pages/All_Events'
import YourPages from './pages/YourPages';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import EditEvent from './pages/EditEvent';
import PageEvents from './pages/PageEvents';

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
          <Route path='/settings' element = {<Settings/>} />
          <Route path='/change/status/:friend_id' element = {<ChangeStatus/>} />
          <Route path='/search/:query' element = {<Search/>}/>
          <Route path ='/profile/:user_id' element = {<UserProfile/>} />
          <Route path ='/allcomments' element = {<All_Comments/>} />
          <Route path ='/change/comment/:comment_id' element = {<ChangeComment/>} />
          <Route path='/allevents' element = {<All_Events/>}/>
          <Route path='/profile/:user_id' element = {<UserProfile/>} />
          <Route path='/yourpages' element = {<YourPages />} />
          <Route path='/addpage' element = {<AddPage />} />
          <Route path='/editpage' element = {<EditPage />} />
          <Route path='/pageevents' element = {<PageEvents />} />
          <Route path='/editevent' element = {<EditEvent />} />
          <Route path='/page/:page_id' />
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

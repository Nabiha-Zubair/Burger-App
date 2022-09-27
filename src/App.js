import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar/navbar'
import { Burger } from './components/Burger/burger'
import { Order } from './components/Orders/orders'
import { Authentication } from './components/Authentication/signin'
import firebase from 'firebase/app';
import { getAuth } from "firebase/auth";
import AuthContext from './components/Authentication/auth-context';
import { firebaseConfig } from './Firebase/firebaseConfig';
// import { Signin } from './components/Authentication/signin'


function App() {
  let app;
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
    console.log("connected");
  }

  const auth = firebase.auth();

  return (
    <AuthContext.Provider value={{ auth }}>
      <Router>
        <Navbar page={window.location.pathname} />
        <Routes>
          <Route exact path="/" element={<Burger />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

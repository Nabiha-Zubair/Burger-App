import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

import './App.css';
import { Navbar } from './pages/Navbar/navbar'
import { Burger } from './pages/Burger/burger'
import { Order } from './pages/Orders/orders'
import { Authentication } from './pages/Authentication/auth-page'
import firebase from 'firebase/app';
import AuthContext from './pages/Authentication/auth-context';
import { firebaseConfig } from './Firebase/firebaseConfig';


function App() {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("connected");
  }

  const auth = firebase.auth();

  return (
    <AuthContext.Provider value={{ auth }}>
      <Router>
        <Navbar />
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

import React, { useState, useContext } from 'react'
import { Form } from './form';
import firebase from 'firebase/app';
import { getAuth } from "firebase/auth";
import AuthContext from './auth-context';
import { Navigate } from "react-router-dom";
import { firebaseConfig } from '../../Firebase/firebaseConfig';

export const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { auth } = useContext(AuthContext)

  const authenticateUser = async (action) => {
    let response;
    var validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(.[a-z]{2,4})*$/;
    if (email.match(validEmailRegex)) {
      if (action == 'signin') {
        response = await auth.signInWithEmailAndPassword(email, password)
      } else {
        response = await auth.signInWithEmailAndPassword(email, password)
      }
      setPassword("")
      setEmail('')
    } else {
      alert("Invalid Email")
    }

  };

  return (
    <>
      {!auth.currentUser ? (
        <AuthContext.Provider value={{ email, setEmail, password, setPassword, authenticateUser }}>
          <nav>
            <div className="nav nav-tabs mt-3" id="nav-tab" role="tablist" style={{ justifyContent: 'center' }}>
              <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Login</button>
              <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Signup</button>
            </div>
          </nav>
          <div className="tab-content p-5" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><Form action="signin" /></div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><Form action="signup" /></div>
          </div>

        </AuthContext.Provider>
      ) : <Navigate to="/orders" replace={true} />}
    </>
  )
}

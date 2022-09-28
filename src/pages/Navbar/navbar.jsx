import React, { useContext } from 'react'
import './navbar.css'
import AuthContext from '../Authentication/auth-context'
import { Link, useNavigate } from "react-router-dom";

export const Navbar = (props) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {

    auth.signOut().then(() => {
      navigate('/')
    }).catch((error) => {
      console.log("Error: ", error.message)
    });
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand">
          <img src="assets/burger-logo.png" className='logo' />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <span className="navbar-text">

            <ul className="d-flex navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <Link to='/' className="nav-item m-3 active">Burger Builder</Link>
              </li>

              {auth.currentUser ?
                (<>
                  <li><Link to='/orders' className="nav-item m-3 active">Orders</Link></li>
                  <li><Link className="nav-item m-3 " onClick={() => logout()}>Logout</Link></li></>) :
                (<li className="nav-item"><Link to='/auth' className="nav-item m-3 ">Login</Link></li>)}
            </ul>

          </span>
        </div>
      </div>
    </nav >
  )
}

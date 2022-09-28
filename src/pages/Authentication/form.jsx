import React, { useContext } from 'react'
import AuthContext from './auth-context'


export const Form = (props) => {
  const { email, setEmail, password, setPassword, authenticateUser } = useContext(AuthContext)

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="8-15 characters" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <button className='btn btn-success' onClick={() => authenticateUser(props.action)}>{props.action == 'signin' ? 'Log In' : 'Signup'}</button>
        </div>
      </form>
    </>
  )
}

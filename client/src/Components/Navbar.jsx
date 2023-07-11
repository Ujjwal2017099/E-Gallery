import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.setItem('id',"");
    navigate('/login');
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to='/'>Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to='/profile'>Profile <span className="sr-only">(current)</span></Link>
              </li>
              
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={(e)=>{e.preventDefault();logout();}}>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
            </form>
          </div>
        </nav>
    </div>
  )
}

export default Navbar
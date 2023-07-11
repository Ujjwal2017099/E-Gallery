import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {URL} from '../URL'

const AdminLogin = () => {
    const navigate = useNavigate();

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const login = ()=>{
      axios({
        url : `${URL}/adminLogin?email=${email}&password=${password}`,
        method : 'GET',
        headers : {'content-type' : 'application/json'},
      }).then((res)=>{
        // alert('login');
        // console.log(res.data);
        localStorage.setItem('id',JSON.stringify(res.data))
        navigate('/')
      }).catch((err)=>{
        alert('err');
        console.log(err);
      })
  }
  return (
    <div style={{padding :'25px'}}>
        <h1>Admin </h1>
      <form onSubmit={(e)=>{e.preventDefault(); login();}}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <p>Want to Login as normal user <Link to='/Login'>click here</Link>
      </p>
    </div>
  )
}

export default AdminLogin
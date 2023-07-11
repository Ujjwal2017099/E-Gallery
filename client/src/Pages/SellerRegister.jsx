import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {URL} from '../URL'

const SellerRegister = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [address,setAddress] = useState('')

  const signup = ()=>{
      axios({
        url : `${URL}/registerSeller`,
        method : 'POST',
        headers : {'content-type' : 'application/json'},
        data : {
          email ,name ,password,address
        }
      }).then((res)=>{
        alert('saved')
        navigate('/SellerLogin')
      }).catch((err)=>{
        alert('err');
        console.log(err);
      })
  }


  return (
    <div style={{padding :'25px'}}>
        <h1>Register as Seller</h1>
      <form onSubmit={(e)=>{e.preventDefault(); signup();}}>
        <div className="form-group">
          <label htmlFor="exampleInputName1">Name</label>
          <input type="text" onChange={(e)=>{setName(e.target.value)}}  className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter name" required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" onChange={(e)=>{setEmail(e.target.value)}}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" id="exampleInputPassword1" placeholder="Password" required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputAddress1">Address</label>
          <input type="text" onChange={(e)=>{setAddress(e.target.value)}}  className="form-control" id="exampleInputAddress1" aria-describedby="emailHelp" placeholder="Enter your address" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <p>Already have a Seller Acount <Link to='/SellerLogin'>click here</Link>
      </p>
    </div>
  )
}

export default SellerRegister
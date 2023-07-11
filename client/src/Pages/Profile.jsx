import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { URL } from '../URL';

const Profile = () => {

  
  



  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('id'));
  const [uploadImg,setUpload] = useState([]);
  const [products,setProducts] = useState([]);
  const [favProducts,setFavProducts] = useState([]);
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState(0);
  const [premium , setPremium] = useState(false);
  const [check,setCheck] = useState(true);
  const [type,setType] = useState(0);
  const [allUser,setAllUser] = useState([]);
  const [allSeller,setAllSeller] = useState([]);
  const [userP,setUserP] = useState(0);
  useEffect(()=>{
    if(token && token.length){
        axios({
          method : 'GET',
          url : `${URL}/profile?token=${token}`,
          headers : {'Content-Type' : 'application/json'}
        })
        .then((res)=>{
            // alert('ok');
            console.log(res.data);
              setType(res.data.Type);
              setAllUser(res.data.Users );
              setAllSeller(res.data.Sellers);
              setUserP(res.data.Premium);
            // if(type===2){
            // }
            setProducts(res.data.Products);
            setFavProducts(res.data.Favorite);
        }).catch((err)=>{
          alert('err');
          console.log(err);
        })
    }else{
      navigate('/login');
    }
  },[token,check])

  const upload = ()=>{
    const form = new FormData();
    form.append('file',uploadImg[0]);
    axios({
      method : 'POST',
      url : `${URL}/addProduct?token=${token}&name=${name}&description=${description}&price=${price}&premium=${premium?1:0}`,
      headers: { 'content-type': "multipart/form-data" },
      data : form
    }).then((res)=>{
      alert('uploaded');
      setCheck(!check);
      // console.log(res.data);
      window.location.reload();
    }).catch((err)=>{
      alert('err');
      console.log(err);
    })
  }
  const [userEmail , setUserEmail] = useState("");
  const [userPassword , setUserPassword] = useState("");
  const [userName , setUserName] = useState("");

  const [sellerEmail , setSellerEmail] = useState("");
  const [sellerPassword , setSellerPassword] = useState("");
  const [sellerName , setSellerName] = useState("");
  const [sellerAddress , setSellerAddress] = useState("");

  const createNewUser = ()=>{
    axios({
        url : `${URL}/register`,
        method : 'POST',
        headers : {'content-type' : 'application/json'},
        data : {
          email :userEmail ,name : userName,password : userPassword
        }
      }).then((res)=>{
        alert('saved')
        window.location.reload()
      }).catch((err)=>{
        alert('err');
        console.log(err);
      })
  }

  const createNewSeller = ()=>{
    axios({
        url : `${URL}/registerSeller`,
        method : 'POST',
        headers : {'content-type' : 'application/json'},
        data : {
          email : sellerEmail ,name : sellerName ,password : sellerPassword ,address : sellerAddress
        }
      }).then((res)=>{
        alert('saved')
        window.location.reload()
      }).catch((err)=>{
        alert('err');
        console.log(err);
      })
  }

  const deleteUser = (_id)=>{
    axios({
      method : 'DELETE',
      url : `${URL}/deleteUser?token=${token}`,
      headers : {'content-type' : 'application/json'},
      data : {_id}
    })
    .then((res)=>{
      alert('deleted');
      window.location.reload();
    }).catch((err)=>{

    })
  }

  const deleteSeller = (_id)=>{
    axios({
      method : 'DELETE',
      url : `${URL}/deleteSeller?token=${token}`,
      headers : {'content-type' : 'application/json'},
      data : {_id}
    })
    .then((res)=>{

      alert('deleted');
      window.location.reload();
    }).catch((err)=>{
        console.log(err);
    })
  }

  const payment = ()=>{
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.body.appendChild(script);
  
    script.onload = function(){
      axios({
        method:'GET',
        headers : {'Content-Type' : 'application/json'},
        url : `${URL}/razorpay`
      }).then((res)=>{
        console.log(res.data);
          var options = {
            "key": "rzp_test_H1Kpcfg9ZN663c", // Enter the Key ID generated from the Dashboard
            "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Test", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Test", //your customer's name
                "email": "test@gmail.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Test office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        document.getElementById('rzp-button1').onclick = function(e){
          rzp1.open();
          e.preventDefault();
        }
      }).catch((err)=>{

      })
    }
  }
  return (
    <div>
      <Navbar/>
      {
        type === 1 && <form style={{padding:'30px'}} onSubmit={(e)=>{e.preventDefault();upload();}}>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Select image</label>
          <input type="file" onChange={(e)=>{setUpload(e.target.files);}} className="form-control-file" id="exampleFormControlFile1"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputName1">Product Name</label>
          <input type="text" className="form-control" onChange={(e)=>{setName(e.target.value);}} id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter Name" required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputDescription1">Product Description</label>
          <input type="text" className="form-control" onChange={(e)=>{setDescription(e.target.value);}} id="exampleInputDescription1" aria-describedby="emailHelp" placeholder="Enter Description" required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPrice1">Product Price</label>
          <input type="number" className="form-control" onChange={(e)=>{setPrice(e.target.value);}} id="exampleInputPrice1" aria-describedby="emailHelp" placeholder="Enter Price" required/>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" onChange={(e)=>{setPremium(!premium);}} htmlFor="exampleCheck1">Premium Product</label>
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
      }
      
      {
      products.length>0 && <>
        <hr />
        <div style={{padding:'30px'}}>
          <h2>All Products</h2>
          {
            products.map((e)=>{
              return (
                <div className="card" style={{width: "18rem",display:'inline-block',marginRight:'10px',marginBottom:'10px'}}>
                  <img className="card-img-top" style={{height : '200px' }} src={e.Image} alt=""/>
                  <div className="card-body">
                    <h5 className="card-title">{e.Name}</h5>
                    <p className="card-text">{e.Description}</p>
                    <p className="card-text">{e.Price}</p>
                    <p className="card-text">{e.TotalCnt}</p>
                  </div>
                </div>
              )
            })
          }

        </div>
      </>
      }
      <hr />
      {
        type===0 && userP===0 && <div style={{padding:'30px'}}>
            <button className="btn btn-info" id="rzp-button1" onClick={()=>{payment();}} >Upgrade to Premium</button>
        </div>
      }
      {type!==2 && <div style={{padding:'30px'}}>
        <h2>Favorite Products</h2>
        {
            favProducts.map((e)=>{
              return (
                <div className="card" style={{width: "18rem",display:'inline-block',marginRight:'10px',marginBottom:'10px'}}>
                  <img className="card-img-top" style={{height : '200px' }} src={e.Image} alt=""/>
                  <div className="card-body">
                    <h5 className="card-title">{e.Name}</h5>
                    <p className="card-text">{e.Description}</p>
                    <p className="card-text">{e.Price}</p>
                    <p className="card-text">{e.TotalCnt}</p>
                  </div>
                </div>
              )
            })
          }
      </div>}
          {
            type===2 && <div style={{padding:'30px'}}>
              <h2>Create User</h2>
              <form onSubmit={(e)=>{e.preventDefault(); createNewUser(); }}>
                <div className="form-group">
                  <label htmlFor="exampleInputName1">Name</label>
                  <input type="text" onChange={(e)=>{setUserName(e.target.value)}}  className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" onChange={(e)=>{setUserEmail(e.target.value)}}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" onChange={(e)=>{setUserPassword(e.target.value)}} className="form-control" id="exampleInputPassword1" placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          }
          {
            type===2 && <div style={{padding:'30px'}}>
              <h2>Create Seller</h2>
              <form onSubmit={(e)=>{e.preventDefault(); createNewSeller();}}>
                <div className="form-group">
                  <label htmlFor="exampleInputName">Name</label>
                  <input type="text" onChange={(e)=>{setSellerName(e.target.value)}}  className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail">Email address</label>
                  <input type="email" onChange={(e)=>{setSellerEmail(e.target.value)}}  className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword">Password</label>
                  <input type="password" onChange={(e)=>{setSellerPassword(e.target.value)}} className="form-control" id="exampleInputPassword" placeholder="Password" required />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputAddress">Address</label>
                  <input type="text" onChange={(e)=>{setSellerAddress(e.target.value)}}  className="form-control" id="exampleInputAddress" aria-describedby="emailHelp" placeholder="Enter your address" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          }
      {
        type===2 && <div style={{padding:'30px'}}>
          <h2>All Users</h2>
          <ul className="list-group">
            {
              allUser.map((e)=>{
                return (
                  <li className="list-group-item">Name : {e.Name} && Email : {e.Email} <button style={{float:'right'}} onClick={()=>{deleteUser(e._id)}} className='btn btn-danger'>Delete</button> </li>
                )
              })
            }
          </ul>
        </div>
      }

      {
        
          type===2 &&  <div style={{padding:'30px'}}>
          <h2>All Sellers</h2>
          <ul className="list-group">
            {

              allSeller.map((e)=>{
                return (
                  <li className="list-group-item">Name : {e.Name} && Email : {e.Email} <button style={{float:'right'}} onClick={()=>{deleteSeller(e._id)}} className='btn btn-danger'>Delete</button> </li>
                )
              })
            }
          </ul>
        </div>
 
      }
    </div>
  )
}

export default Profile
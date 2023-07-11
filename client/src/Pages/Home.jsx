import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { URL } from '../URL';
import { saveAs } from 'file-saver'

const Home = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('id'));
  const [products , setProducts] = useState([]);
  useEffect(()=>{
    if(token && token.length){
      axios({
        url : `${URL}/?token=${token}`,
        method : 'GET' ,
        headers : {'content-type' : 'application/json'}
      }).then((res)=>{
        // alert('ok');
        setProducts(res.data);
        console.log(res.data);
      }).catch((err)=>{
        // alert('err');
        navigate('/login');
        console.log(err);
    })
    }else{
      navigate('/login');
    }
  },[token])
  const addToFav = (_id)=>{
    axios({
      url : `${URL}/addToFav?token=${token}&id=${_id}`,
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      data : {}
    })
    .then((res)=>{
        alert('added to favorate');

    }).catch((err)=>{
      console.log(err);
    })
  }

  const post = (f,_id,id)=>{
    axios({
      method : 'POST',
      url : `${URL}/votes`,
      headers : {'Content-Type' : 'application/json'},
      data : {
        f , _id
      }
    }).then((res)=>{
        // alert(`voted ${f}`);
        const x=document.getElementById(id);
        // console.log(x);
        if(f===1){
          let a = x.innerText.split(' ')[1];
          // console.log(a);
          x.innerText = `Rating ${JSON.stringify(parseInt(a)+1)}`
          // x.innerText = a;
        }else{
          let a = x.innerText.split(' ')[1];
          // console.log(a);
          x.innerText = `Rating ${JSON.stringify(parseInt(a)-1)}`
        }
    }).catch((err)=>{
      console.log(err);
    })
  }

  const downloadImage = (url)=>{
    saveAs(url,'image.png');
  }
  return (
    <div>
      <Navbar/>
      <div style={{padding:'30px'}}>      
        {
          products.map((e)=>{

            return (

              <div className="card" style={{width: "18rem",display:'inline-block',margin:'0px 10px 10px 0px'}}>
                <img className="card-img-top" style={{height : '200px' }} src={e.Image} alt="Card image cap"/>
                <div className="card-body">
                  <h5 className="card-title">{e.Name}</h5>
                  <p className="card-text">{e.Description}</p>
                  <p className="card-text">{e.Price}/-</p>
                  <p className="card-text" id={e._id} >Rating {e.TotalCnt}</p>
                  <div>
                    <button style={{marginRight:'5px'}} onClick={()=>{addToFav(e._id)}} className="btn btn-primary">Add to Fav</button>
                    <button style={{marginRight:'5px'}} onClick={()=>{post(1,e._id,e._id); }} className="btn btn-success"  >Like</button>
                    <button className="btn btn-danger" onClick={()=>{post(-1,e._id,e._id); }}>DisLike</button>
                  </div>
                  <div>
                    <button className="btn btn-link" onClick={()=>{downloadImage(e.Image)}} >Download</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
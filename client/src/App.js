import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home  from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import SellerLogin from './Pages/SellerLogin'
import SellerRegister from './Pages/SellerRegister'
import AdminLogin from './Pages/AdminLogin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/SellerLogin' element={<SellerLogin/>} />
        <Route path='/AdminLogin' element={<AdminLogin/>} />
        <Route path='/SellerRegister' element={<SellerRegister/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

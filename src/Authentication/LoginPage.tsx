import './Authentication.css'
import genxThofaLogo from '../assets/Images/Layer_1.svg'
import passswordicon from '../assets/Icons/Frame.png'
import passwordiconHide from '../assets/Icons/passwordhideicon.svg'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setToken } from '../service/tokenService';
import thofalogo from '../assets/Icons/thofaLogo.svg'
import { toast } from 'react-toastify'




function LoginPage() {
  const navigate=useNavigate()

  const[passicon,setPassicon]=useState<boolean>(false)
   const [email,setemail]=useState<string>('')
  const [password,setpassword]=useState<string>('')
  const [emptyemailinputIndicator,setEmptyemailinputINdicator]=useState<boolean>(false)
    const [emptypasswordinputIndicator,setemptypasswordinputIndicator]=useState<boolean>(false)
const [renderSpinner,setRenderSpinner]=useState<boolean>(false)

  const handlePasswordIconClick = () =>{
    setPassicon(!passicon)
  }

  const [renderGenxLogo,setrenderGenxLogo]=useState<boolean>(false)


  
const handleLogin=(e:React.FormEvent)=>{
  e.preventDefault()
  if(email.trim() ==""){
        setEmptyemailinputINdicator(true)
}
if(password.trim()==""){
  setemptypasswordinputIndicator(true)
}

axios.post(`http://127.0.0.1:8000/api/auth/login`,{email,password})
    .then((response) => {
    console.log(response);
    setToken(response.data.access_token);
      setRenderSpinner(true)
      setrenderGenxLogo(true)
      toast.success("Login Successfull")
    
      setTimeout(()=>{
    navigate('/Dashboard')
      },5000)

    })
  .catch((error)=>{
    toast.error('invalid password')
    console.log('invalid password :',error)})
}

const borderStyle={
  border:'1.5px solid var(--color-warning)'
}
  return (
    <>
     {renderGenxLogo&&
     <div style={{position:"absolute",zIndex:"10",height:"100vh",left:"0%",backgroundColor:"white",top:"0%"}} className='w-100 d-flex align-items-center justify-content-center pt-1'>
      <img className='mt-5 thofa-logo' src={thofalogo}/></div>}

<div className="Login-Page-Container w-100 vh-100 d-flex justify-content-center align-items-center">
<div className='login-form'>
<form onSubmit={handleLogin} >
  <div className='d-flex align-items-center w-100 justify-content-center'><img src={genxThofaLogo} /></div>
    <div className="invoice-login-form-group">
      <label style={{position:"relative"}}> Email Address
        <input style={emptyemailinputIndicator ? borderStyle :{}} autoComplete='off' value={email} onChange={e=>setemail(e.target.value)} type="email" placeholder='example@gmail.com' />
                 {emptyemailinputIndicator==false?null:<span style={{position:"absolute",fontSize:"13px",bottom:"-30%",left:"1%",color:"var(--color-warning)"}}>Please Enter Your Email !</span>}

        </label>
         <label style={{position:"relative"}}>Password
        <input  style={emptyemailinputIndicator ? borderStyle :{}} value={password} onChange={e=>setpassword(e.target.value)} type={`${passicon==false?'password':'text'}`} placeholder='Pass@1234' /> {passicon==false ?<img onClick={handlePasswordIconClick} style={{position:"absolute"}} src={passswordicon} alt="" />: <img onClick={handlePasswordIconClick} style={{position:"absolute"}} src={passwordiconHide}/>}
                 {emptypasswordinputIndicator==false?null:<span style={{position:"absolute",fontSize:"13px",bottom:"-30%",left:"1%",color:"var(--color-warning)"}}>Please Enter Your Password !</span>}
        </label>
<p className='forget-pass'><Link style={{textDecoration:"none"}} to='/forgetpassword'>Forget Password?</Link></p>
</div>
<button type='submit' className='btn log-btn d-flex justify-content-center gap-4 align-items-center'>{renderSpinner&&<span className='spinner' ></span>}Login</button>
</form>
</div>
</div>
    </>
  )
}

export default LoginPage
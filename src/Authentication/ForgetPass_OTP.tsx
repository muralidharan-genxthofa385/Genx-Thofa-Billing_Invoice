import { useState } from 'react'
import genxThofaLogo from '../assets/Images/Layer_1.svg'
import './ForgetPass_OTP.css'
import { Link } from 'react-router-dom'



function ForgetPass_OTP() {

const [userOtp,setUserOtp]=useState<string>('')



  return (
    
    <>
    <div className="Forget_pass_otp_container  w-100 vh-100 d-flex justify-content-center align-items-center">
    <form>

<div className='d-flex justify-content-center'><img src={genxThofaLogo} alt="" /></div>

<p>An OTP has been sent to your email address</p>

<div>
    <label htmlFor="">Enter OTP
        <input type="text" value={userOtp} onChange={e=>setUserOtp(e.target.value)} placeholder='otp' />
        <p className='pt-2' style={{fontSize:"14px",textAlign:"right"}}>Didn’t receive the OTP? <span style={{color:"var( --color-accent)"}}>Resend OTP</span></p>
    </label>

    <Link to='/setpassword' className='log-btn btn'>Proceed</Link>
</div>

    </form>
    </div>
    
    </>
    
  )
}

export default ForgetPass_OTP
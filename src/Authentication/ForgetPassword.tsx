import './forgetPassword.css'
import genxThofaLogo from '../assets/Images/Layer_1.svg'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function ForgetPassword() {
  const [otpemail, setotpEmail] = useState<string>('')
  const [emptyemailinputIndicator, setEmptyemailinputINdicator] = useState<boolean>(false)
  const borderStyle = { border: '1.5px solid var(--color-warning)' }
  const navigate = useNavigate()

  const otpSender = (e: React.FormEvent) => {
    e.preventDefault()
    if (otpemail.trim() == "") {
      setEmptyemailinputINdicator(true)
    }
    axios.post(`http://127.0.0.1:8000/api/auth/forgot-password`, { otpemail })
      .then(response => {
        console.log(response)
        navigate('/setotp')
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <div className='forget-password-container w-100 vh-100 d-flex justify-content-center align-items-center'>
        <form onSubmit={otpSender} >
          <div className='w-100 d-flex justify-content-center align-items-center'><img src={genxThofaLogo} alt="loading..." /></div>
          <div>
            <label style={{ position: "relative" }} htmlFor="">Enter your registered email address
              <input value={otpemail} onChange={e => setotpEmail(e.target.value)} style={emptyemailinputIndicator ? borderStyle : {}} type="text" placeholder='emample@gmail.com' />
              {emptyemailinputIndicator == false ? null : <span style={{ position: "absolute", fontSize: "13px", bottom: "-30%", left: "1%", color: "var(--color-warning)" }}>Please Enter Your Email !</span>}

            </label>
            <button type='submit' className='forget-pass-proceed-btn btn' >Proceed</button>
          </div>
        </form>

      </div>
    </>
  )
}
export default ForgetPassword
import './Newpassword.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import genxThofaLogo from '../assets/Images/Layer_1.svg'
import passswordicon from '../assets/Icons/Frame.png'
import passwordiconHide from '../assets/Icons/passwordhideicon.svg'

function NewPAssword() {
    const[passicon,setPassicon]=useState<Boolean>(false)
        const[newpassicon,setnewPassicon]=useState<Boolean>(false)

    const newpassiconclick=()=>{
        setnewPassicon(!newpassicon)
    }

      const handlePasswordIconClick = () =>{
        setPassicon(!passicon)
      }
  return (
    <div>
    
            <div className="newpass-Page-Container w-100 vh-100 d-flex justify-content-center align-items-center">
  
<div className='newpass-form'>
<form>
  <div className='d-flex align-items-center w-100 justify-content-center'><img src={genxThofaLogo} /></div>

    <div className="invoice-newpass-form-group">
      <label style={{position:"relative"}} className='new-pass-icon'>New Password
        <input type={`${newpassicon==false?'password':'text'}`} placeholder='Pass@1234' /> 
        {newpassicon==false ?<img onClick={newpassiconclick} style={{position:"absolute"}} src={passswordicon} alt="" />: <img  onClick={newpassiconclick} style={{position:"absolute"}} src={passwordiconHide}/>}</label>
         
         <label style={{position:"relative"}}>Confirm Password
        <input type={`${passicon==false?'password':'text'}`} placeholder='Pass@1234' /> {passicon==false ?<img onClick={handlePasswordIconClick} style={{position:"absolute"}} src={passswordicon} alt="" />: <img onClick={handlePasswordIconClick} style={{position:"absolute"}} src={passwordiconHide}/>}</label>
<Link to='/' className='btn log-btn'>Reset Password</Link>
 
    </div>
</form>
</div>

</div>
    </div>
  )
}

export default NewPAssword
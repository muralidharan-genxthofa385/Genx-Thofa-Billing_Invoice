import React, { useState } from 'react'
import './InvAddnewCustomer.css'
import CustomerForm from '../../Customerspage/CustomerCreationForm/CustomerForm'
 import { IoIosArrowBack } from "react-icons/io";

import { Link, useNavigate } from 'react-router-dom'

interface props{
renderNewcustPop:()=>void;
}

function InvAddnewCustomer({renderNewcustPop}:props) {


  return (
    <>
     <div className="inv-add-New_customer-container">
      <div className='Back-To-InvCreation-cont' onClick={renderNewcustPop}>  <h1 className='Back-To-InvCreation' ><IoIosArrowBack/>Back</h1></div>
<CustomerForm/>
        </div>
    </>
  )
}

export default InvAddnewCustomer
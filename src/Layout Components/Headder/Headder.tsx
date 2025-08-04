import React, { useEffect, useRef, useState } from 'react'
import './Headder.css'
import { IoMdAdd } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import invoiceActiveIcon from '../../assets/Icons/invoiceActive.svg'
import custumeractiveICon from '../../assets/Icons/customersActive.svg'
import expensesactiveIcon from '../../assets/Icons/expensesActive.svg'
import headderSlider from '../../assets/Icons/headderSlider.svg'
import searchIcon from '../../assets/Icons/searchicon.svg'
import { Link } from 'react-router-dom';

interface HeadderProps {
  renderSidebr: () => void;
  sidebarCollapsed?: boolean;
}

function Headder({renderSidebr, sidebarCollapsed}:HeadderProps) {

    const [NewDropshow,setNewDropshow]=useState<boolean>(false)
    const actionRef=useRef<HTMLDivElement | null>(null)

useEffect(() => {
  const handleOutClick = (e: MouseEvent) => {
    if (actionRef.current && !actionRef.current.contains(e.target as Node)) {
      setNewDropshow(false)
    }
  }

  if (NewDropshow) {
    document.addEventListener('mousedown', handleOutClick)
  }

  return () => {
    document.removeEventListener('mousedown', handleOutClick)
  }

}, [NewDropshow])

  return (
    <>
    <div className="header-wrapper">

  
<div className="headder-container">
    <div>
        <img  src={headderSlider} onClick={renderSidebr}  style={{cursor:"pointer",backgroundColor:"#FCFCFC"}}/>
        <label ><img  src={searchIcon} /> <input placeholder='Search' type="search" disabled/></label>
    </div>
    <div className='new-dropdown-button-container'>
        <button onClick={()=>setNewDropshow(!NewDropshow)} style={{height:"36.8px"}} ><IoMdAdd/> New | <IoMdArrowDropdown/> </button>

        {NewDropshow&&<div className='new-options-drop'  style={{zIndex:"18"}}>
          <div className='gap-3'>  <Link to='/createInvoice' onClick={()=>setNewDropshow(false)} className='new-options-drop-links' style={{paddingLeft:"-10px"}}><img src={invoiceActiveIcon} /> Invoice</Link>
            <Link to='/customersAdd' className='new-options-drop-links' onClick={()=>setNewDropshow(false)}> <img src={custumeractiveICon} alt="" /> Customer</Link>
            <Link to='/expensesAdd' className='new-options-drop-links' onClick={()=>setNewDropshow(false)}><img src={expensesactiveIcon} /> Expenses</Link>
 </div>
        </div>}
    </div>

</div>
  </div>
    </>
  )
}

export default Headder
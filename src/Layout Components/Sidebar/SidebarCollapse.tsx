import React from 'react'
import './sidebarCollapse.css'
import genxLogo from '../../assets/Images/Layer_1.svg'
import { Link, useNavigate } from 'react-router-dom'
import dashboardiconactive from '../../assets/Icons/dashboardIcon.png'
import dashboardInactiveIcon from '../../assets/Icons/dashboardincativeFrame.svg'
import invoiceInactiveIcon from '../../assets/Icons/invoiceInactiveIcon.svg'
import invoiceActiveIcon from '../../assets/Icons/invoiceActive.svg'
import custumerInactiveICon from '../../assets/Icons/customerInactive.svg'
import custumeractiveICon from '../../assets/Icons/customersActive.svg'
import expensesInactiveIcon from '../../assets/Icons/expensesinactive.svg'
import expensesactiveIcon from '../../assets/Icons/expensesActive.svg'
import settingsInactiveIcon from '../../assets/Icons/setingsInactive.svg'
import settingsActiveimg from '../../assets/Icons/settingsActive.svg'
import logoutImage from '../../assets/Icons/logoutLogo.svg'
import { useEffect, useState } from 'react'



function SidebarCollapse() {

    const inactivelinkStyle = {
  display: "flex",
  alignItems: "center",
  width: "10%",
  height: "34px",
  fontSize: "14px",
  gap: "8px",
  textDecoration: "none",
  padding: "8px 12px",
};

const activelinkStyle={
   display: "flex",
  alignItems: "center",
  width: "10%",
  height: "34px",
  fontSize: "14px",
  gap: "8px",
  textDecoration: "none",
  padding: "8px 12px",
  color:"var(--whitebg)",
  backgroundColor:"var(--color-accent)",
  borderRadius:"4px"
}
const [dashActive,setDashactive]=useState<boolean>(false)
const [invoiceActive,setinvoiceactive]=useState<boolean>(false)
const [customerActive,setcustomeractive]=useState<boolean>(false)
const [expensesActive,setexpensesactive]=useState<boolean>(false)
const [settingsActive,setsettingsactive]=useState<boolean>(false)
const navigate=useNavigate()

useEffect(()=>{setDashactive(true)},[])

const sideDashActRender=()=>{
setDashactive(true)
setinvoiceactive(false)
setcustomeractive(false)
setexpensesactive(false)
    setsettingsactive(false)
    navigate('/dashboard')

}
const sideinvoideActRender=()=>{
setDashactive(false)
setinvoiceactive(true)
setcustomeractive(false)
setexpensesactive(false)
    setsettingsactive(false)

}
const sidecustomerActRender=()=>{
  setDashactive(false)
  setinvoiceactive(false)
  setcustomeractive(true)
  setexpensesactive(false)
    setsettingsactive(false)

}
const sideexpensesActRender=()=>{
  setDashactive(false)
  setinvoiceactive(false)
  setcustomeractive(false)
    setexpensesactive(true)
    setsettingsactive(false)

}
const sideSetingsActRender=()=>{
  setDashactive(false)
  setinvoiceactive(false)
  setcustomeractive(false)
    setexpensesactive(false)
    setsettingsactive(true)

}


  return (
    <>
<div className="sidebarcolapse-container-overall w-50">
  <div className='sidebar-logo'>
<img src={genxLogo} alt="" />
  </div>
<div className='sidebarcolapse-contents'>
<div className="sidebarcolapse-contents-top">
  <Link className='sidebarcolapse-links' onClick={sideDashActRender} style={dashActive==false?inactivelinkStyle:activelinkStyle} to=''>
  <img src={dashActive==false ?dashboardInactiveIcon :dashboardiconactive}/></Link>
  <Link className='sidebarcolapse-links' onClick={sideinvoideActRender} style={invoiceActive==false?inactivelinkStyle:activelinkStyle}  to=''>
  <img src={invoiceActive==false?invoiceInactiveIcon:invoiceActiveIcon}/></Link>
  <Link className='sidebarcolapse-links' onClick={sidecustomerActRender} style={customerActive==false?inactivelinkStyle:activelinkStyle} to=''>
  <img src={customerActive==false?custumerInactiveICon:custumeractiveICon}/> </Link>
  <Link className='sidebarcolapse-links' onClick={sideexpensesActRender} style={expensesActive==false?inactivelinkStyle:activelinkStyle} to=''>
  <img src={expensesActive==false?expensesInactiveIcon:expensesactiveIcon}/></Link>
</div>
<div className='sidebarcolapse-contents-bottom'>
<Link className='sidebarcolapse-links' onClick={sideSetingsActRender} style={settingsActive==false?inactivelinkStyle:activelinkStyle} to=''>
  <img src={settingsActive==false?settingsInactiveIcon:settingsActiveimg}/></Link>
  <Link className='sidebarcolapse-logout-Button' to={''}><img src={logoutImage}/></Link>
</div>
</div>
</div>
    </>
  )
}

export default SidebarCollapse
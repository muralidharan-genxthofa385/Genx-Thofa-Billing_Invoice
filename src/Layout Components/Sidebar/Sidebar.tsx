

import './sidebar.css'
import genxLogo from '../../assets/Images/Layer_1.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import dashboardiconactive from '../../assets/Icons/dashboardIcon.png'
import dashboardInactiveIcon from '../../assets/Icons/dashboardincativeFrame.svg'
import invoiceInactiveIcon from '../../assets/Icons/invoiceInactiveIcon.svg'
import invoiceActiveIcon from '../../assets/Icons/invoiceActive.svg'
import custumerInactiveICon from '../../assets/Icons/customerInactive.svg'
import custumeractiveICon from '../../assets/Icons/customersActive.svg'
import expensesInactiveIcon from '../../assets/Icons/expensesinactive.svg'
import expensesactiveIcon from '../../assets/Icons/expensesActive.svg'
import settingsInactiveIcon from '../../assets/Icons/setingsInactive.svg'
import logoutImage from '../../assets/Icons/logoutLogo.svg'
import settingsActiveimg from '../../assets/Icons/settingsActive.svg'
import itemsInactive from '../../assets/Icons/sidebarItemsActiveIcon.svg'
import sidebaritemsWhiteIcon from '../../assets/Icons/sidebaritemsWhiteIcon.svg'


import { useState } from 'react'
interface HeadderPropsimg {
  sibebrcol:boolean,
}

function Sidebar({sibebrcol}:HeadderPropsimg) {

const inactivelinkStyle = {
  display: "flex",
  alignItems: "center",
  width: sibebrcol ? "2rem" : "192px",
  height: "34px",
  fontSize: "14px",
  gap: "8px",
  textDecoration: "none",
  padding: "8px 12px",
  justifyContent: sibebrcol ? "center" : "flex-start",
};

const activelinkStyle={
   display: "flex",
  alignItems: "center",
  width: sibebrcol ? "2rem" : "192px",
  height: "34px",
  fontSize: "14px",
  gap: "8px",
  textDecoration: "none",
  padding: "8px 12px",
  color:"var(--whitebg)",
  backgroundColor:"var(--color-accent)",
  borderRadius:"4px",
  justifyContent: sibebrcol ? "center" : "flex-start",
}

const navigate=useNavigate()

const [settingsActive,setsettingsactive]=useState<boolean>(false)
const sideSetingsActRender=()=>{
    setsettingsactive(true)
}

const handleLogout=()=>{

  const logoutconfirmation=window.confirm('Are You Sure To Logout ?')

  if(logoutconfirmation){
localStorage.removeItem('token')
  navigate('/')
  }
}

const location = useLocation();
const isActive = (path: string) => location.pathname.startsWith(path);

return (
<>
<div className={`sidebar-container-overall ${sibebrcol ? 'collapsed' : ''}`}>
  <div className='sidebar-logo'>
<img src={genxLogo} alt="" style={{width: sibebrcol ? "2rem" : "10rem", height: "2.1rem"}}/>
</div>
<div className='sidebar-contents'>
<div className="sidebar-contents-top">
  <Link className='sidebar-links'  style={isActive('/dashboard')?activelinkStyle:inactivelinkStyle} to='/dashboard'>
  <img src={isActive('/dashboard')?dashboardiconactive:dashboardInactiveIcon}/>{!sibebrcol && "Dashboard"}</Link>

  <Link className='sidebar-links'   style={isActive('/invoice') || isActive('/createInvoice')||isActive('/Editinvoice')||isActive('/viewInvoice') ? activelinkStyle : inactivelinkStyle}  to='/invoice'>
  <img src={isActive('/invoice') || isActive('/createInvoice')|| isActive('/viewInvoice')||isActive('/Editinvoice') ? invoiceActiveIcon : invoiceInactiveIcon}/>{!sibebrcol && " Invoice"}</Link>

  <Link className='sidebar-links' style={isActive('/customers') ? activelinkStyle : inactivelinkStyle} to='/customers'>
  <img src={isActive('/customers') ? custumeractiveICon : custumerInactiveICon} /> {!sibebrcol && "Customer"}</Link>

  <Link className='sidebar-links'  style={isActive('/expenses') || isActive('/expensesAdd')? activelinkStyle: inactivelinkStyle } to='/expenses'>
  <img src={isActive('/expenses') || isActive('/expensesAdd') ? expensesactiveIcon : expensesInactiveIcon}/>{!sibebrcol && " Expense"}</Link>

  <Link className='sidebar-links'  style={isActive('/Items') ? activelinkStyle : inactivelinkStyle} to='/Items'>
  <img src={isActive('/Items') ? sidebaritemsWhiteIcon : itemsInactive}/>{!sibebrcol && "Items"}</Link>

</div>
<div className='sidebar-contents-bottom'>
<Link className='sidebar-links' onClick={sideSetingsActRender} style={settingsActive==false?inactivelinkStyle:activelinkStyle} to=''>
  <img src={settingsActive==false?settingsInactiveIcon:settingsActiveimg}/>{!sibebrcol && " Settings"}</Link>
  
  <button onClick={handleLogout} className='logout-Button' style={{width: sibebrcol ? "2rem" : "12rem",border:"none", justifyContent: sibebrcol ? "center" : "flex-start"}}><img src={logoutImage}/>{!sibebrcol && "Logout"}</button>
</div>

</div>

</div>

    </>
  )
}

export default Sidebar
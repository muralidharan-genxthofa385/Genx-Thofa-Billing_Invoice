import Sidebar from '../Layout Components/Sidebar/Sidebar'
import Headder from '../Layout Components/Headder/Headder'
import { useState, type ReactNode } from 'react'
import './MasterLayout.css'
import Footer from '../Layout Components/Footer'

interface MasterLayoutProps {
  children: ReactNode
}

function MasterLayout({children}:MasterLayoutProps) {

  const [sidebrcolapse,setSidebrcolapse]=useState<boolean>(false)

  const renderSidebr=()=>{
    setSidebrcolapse(!sidebrcolapse)
  }
  return (
    <div className='master-layout-container'>
      <div className='sidebar-wrapper'>
        <Sidebar sibebrcol={sidebrcolapse} />
      </div>
      <div className='content-wrapper'>
        <Headder renderSidebr={renderSidebr} sidebarCollapsed={sidebrcolapse}/>
        <div className='main-body' style={{backgroundColor:"var(--whitebg)"}}>{children}</div>
                <Footer/>

      </div>
    </div>
  )
}

export default MasterLayout
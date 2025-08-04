import { useEffect, useState } from 'react'
import './viewItems.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import dustbinDelete from '../../../assets/Icons/deleteDustbinIcon.svg'
import editPencil from '../../../assets/Icons/editPencilIcon.svg'
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ItemsDelete, ItemsGet } from '../../../service/InvoiceItemsService';
import { toast } from 'react-toastify';

interface viewItems{
    id: number,
   item_name:string,
item_type:string,
total_amount:number,
within_state_tax_rate:number,
cross_state_tax_rate:number,
tax_preference:string,
description:string,
}

function ViewItems() {

  const {id}=useParams()
  const [viewItems,setViewitems]=useState<viewItems|null>(null)
  const navigate=useNavigate()

  useEffect(()=>{
    ItemsGet()
    .then(res=>{
        const selecteditem = res.data.find((cust: any) => String(cust.id) === id);
        setViewitems(selecteditem)
        console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[id])

  const itemsViewDelete=()=>{
   const confirmItemDel=window.confirm("do you want to delete this item?")
   if(confirmItemDel){
    ItemsDelete(Number(id))
    .then((res)=>{
      toast.success("item deleted successfully")
      navigate('/Items')
    })
    .catch((err)=>{
      console.log(err)
toast.error("failed to delete item")
    })
   }
  }
  
  return (
    <div>
        <div className="expenses-nav-container">
           
                <Link to={`/Items`} className='newExpenseHeading viewItems-Back'><FaChevronLeft/> View Items</Link>
           
            <label htmlFor="" className='view-items-headder-actions'>
                <img style={{cursor:"pointer"}} onClick={itemsViewDelete} src={dustbinDelete} alt="" />
                <Link to={`/ItemsEdit/${id}`}  className='EditExpenses'>Edit <img src={editPencil} alt="" /></Link>
            </label>
        </div>
        <div className="items-view-row-container pt-5">
<div className="items-view-row">
    <label htmlFor="" className='invoice-label'>
        Item Type
        <FormControlLabel value="Business" className="customer-type-radio-buttons"  
 sx={{'& .MuiFormControlLabel-label': { color: 'var(--color-black)',fontWeight: '600',fontSize: '14px',},}} control={<Radio size="small" checked />} label={`${viewItems?.item_type}`} />  
    </label>
</div>
  <div className="new-expwnses-row pt-2">
        <div className="new-expwnses-row-left">
          <label className='expenses-label'>
            Item Name
            <input style={{backgroundColor:"var(--color-border-light)"}}  type="text" value={viewItems?.item_name} className='expenses-input'readOnly />
          </label>
        </div>
        <div className="new-expwnses-row-right">
           <label className='expenses-label'>
            Item Price
            <input type="text"  style={{backgroundColor:"var(--color-border-light)"}} placeholder='enter item price' value={`₹ ${viewItems?.total_amount}`} readOnly className='expenses-input'/>
          </label>
        </div>
      </div>
    <div className="new-expwnses-row pt-2">
        <div className="new-expwnses-row-left">
          <label className='expenses-label'>
            Tax Preference
            <input className="expenses-input"  style={{backgroundColor:"var(--color-border-light)"}} value={viewItems?.tax_preference} readOnly  placeholder="Select tax preference"/>
          </label>
        </div>
        <div className="new-expwnses-row-right  d-flex gap-2">
            <label className='expenses-label'>
    Within-state tax rate
    <input className="expenses-input" value={viewItems?.within_state_tax_rate} readOnly  style={{width: '309px',fontSize:"14px",fontWeight:"400px",backgroundColor:"var(--color-border-light)" }} />
  </label>
  <label className='expenses-label'>
    Cross-state tax rate
    <input className="expenses-input" value={viewItems?.cross_state_tax_rate} readOnly  style={{width: '309px',fontSize:"14px",fontWeight:"400px",backgroundColor:"var(--color-border-light)" }} />
  </label>
    </div>
      </div>
      <div className='pt-2 ' style={{width:"48%"}}>
               <label className='expenses-label '>
                Item Description
                <textarea placeholder='enter item description'  style={{backgroundColor:"var(--color-border-light)"}} value={viewItems?.description} readOnly name="" id=""></textarea>
               </label>
        </div>
        </div>
    </div>
  )
}

export default ViewItems
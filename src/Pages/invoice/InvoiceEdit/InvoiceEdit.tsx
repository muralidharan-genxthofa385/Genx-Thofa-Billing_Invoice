
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../mainInvoice/InvoiceTopCustomers/Inv_Top_cust_details.css';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import searchIcon from '../../../assets/Icons/searchicon.svg'
import Select from 'react-select';
import threedotOpt from '../../../assets/Icons/Billtablethreedot.svg';
import billtableCloce from '../../../assets/Icons/billTableClose.svg';
import Discounticonbilltable from '../../../assets/Icons/Discount -icon-billtable.svg';
import addNewRowIcon from '../../../assets/Icons/addnewrowicon.svg';
import addNewheadderIcon from '../../../assets/Icons/addnewHeaddericon.svg';
import showSummaryIcon from '../../../assets/Icons/showSummaryDrop.svg'
import hideSummary from '../../../assets/Icons/hideSummaryIcon.svg'
import dustbinDelete from '../../../assets/Icons/dustbinDeleteIcon.svg';
import printIcon from '../../../assets/Icons/printIcon.svg'
import warningicon from '../../../assets/Icons/WarningIcon.svg'
import CreatableSelect from 'react-select/creatable';
import { FaClone } from "react-icons/fa6";
import { BiSolidBasket } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";

import { fetchInvoiceById, updateInvoiceById } from '../../../service/invoiceService';
import { toast } from 'react-toastify';

interface updateState{
  invoice_number: string;
  invoice_date: string;
  payment_terms: string;
  due_date: string;
  amount_received: string;
  grand_total: string;
  tax_amount: string;
  total_amount: string;
  notes: string | null;
  customer: {
    id?: number;
    company_name: string;
    gst_number: string;
    email: string;
    customer_name: string;
    shipping_address:{
        address_line_1: string;
      address_line_2: string;
      city: string;
      pincode: string;
      state: string;
    };
    billing_address: {
      address_line_1: string;
      address_line_2: string;
      city: string;
      pincode: string;
      state: string;
    };
  };
  items: {
    id: number;
    header_title:string;
    item_name: string;
    quantity: string;
    unit_price: string;
    total_amount: number;
    tax_amount: string;
    tax_percentage: string;
    discount_amount: number;
    isHeader?: boolean;
  }[];
}

export default function InvoiceEdit(){
  const {id}=useParams()
  const navigate=useNavigate()
  const [showCancelPopup,setshowCancelPopup]=useState<boolean>(false)
const [renderItemActions,setRenderItemActions]=useState<boolean>(false)
  const [invoiceDetails,setinvoiceDetails]=useState<updateState|null>(null)
const [hideAndShowSummary,sethideAndShowSummary]=useState<boolean>(false)
const [paymentModes, setPaymentModes] = useState([ { mode: '', amount: '' }]);
const [openactionindex,setopenactionindex]=useState<number|null>(null)



  useEffect(()=>{

    fetchInvoiceById(String(id))
    .then((res)=>{
      const invdata=res.data
     setinvoiceDetails(invdata) 
     console.log(invdata)
    })
    .catch((err)=>{console.log(err)})
  },[id])

const formatDateForInput = (isoDate: string): string => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const updateItemField = (index: number, field: string, value: any) => {
  setinvoiceDetails((prev: any) => {
    if (!prev) return prev;
    const updatedItems = [...prev.items];
    const updatedItem = { ...updatedItems[index], [field]: value };
    const qty = parseFloat(updatedItem.quantity) || 0;
    const price = parseFloat(updatedItem.unit_price) || 0;
    const discount = parseFloat(updatedItem.discount_amount) || 0;
    const taxRate = parseFloat(updatedItem.tax_percentage) || 0;
    const base = qty * price;
    const tax = (base * taxRate) / 100;
    const total = base - discount + tax;
    updatedItem.total_amount = total.toFixed(2);
    updatedItem.tax_amount = tax.toFixed(2);
    updatedItems[index] = updatedItem;

    return { ...prev, items: updatedItems };
  });
};


const calculateAmount = (item: any) => {
  const qty = parseFloat(item.quantity) || 0;
  const price = parseFloat(item.unit_price) || 0;
  const discount = parseFloat(item.discount_amount) || 0;
  const taxRate = parseFloat(item.tax_percentage) || 0;
  const base = qty * price;
  const tax = (base * taxRate) / 100;
  const total = base - discount + tax;
  return total.toFixed(2);
};

const addNewRow = () => {
  setinvoiceDetails((prev: any) => {
    if (!prev) return prev;
    const newItem = {
      id: Date.now(),
      item_name: '',
      quantity: '',
      unit_price: '',
      tax_percentage: '',
      total_amount: '',
      tax_amount: '',
      discount_amount: 0,
      isHeader: false,
      header_title: ''
    };
    return { ...prev, items: [...prev.items, newItem] };
  });
};

const addNewHeader = () => {
  setinvoiceDetails((prev: any) => {
    if (!prev) return prev;
    addNewRow()
    const newHeader = {
      id: Date.now(),
      item_name: '',
      quantity: '',
      unit_price: '',
      tax_percentage: '',
      total_amount: '',
      tax_amount: '',
      discount_amount: 0,
      isHeader: true,
      header_title: ''
    };
    return { ...prev, items: [...prev.items, newHeader]};
   
  });
};
const deleteRow = (index: number) => {
  setinvoiceDetails((prev: any) => {
    if (!prev) return prev;
    const updatedItems = [...prev.items];
    updatedItems.splice(index, 1);
    return { ...prev, items: updatedItems };
  });
};
const deleteHeader = (index: number) => {
  setinvoiceDetails((prev: any) => {
    if (!prev) return prev;
    const updatedItems = prev.items.filter((_:any, i:number) => i !== index);
    return { ...prev, items: updatedItems };
  });
};

const totalAmount=invoiceDetails?.items.reduce((total,row)=>total+Number(row.total_amount),0)
const amountRecieved=paymentModes.reduce((total,row)=>total+Number(row.amount),0)


const handleEditInvoiceSave = async () => {
  if (!invoiceDetails) return;

  const calculatedTotalAmount = Number(totalAmount) || 0;
  const calculatedAmountReceived = Number(amountRecieved) || 0;
  let status = "unpaid";
  if (calculatedAmountReceived === 0) {
    status = "unpaid";
  } else if (calculatedAmountReceived >= calculatedTotalAmount) {
    status = "paid";
  } else if (calculatedAmountReceived > 0 && calculatedAmountReceived < calculatedTotalAmount) {
    status = "advance";
  }

  const updatedItemsList = invoiceDetails.items.map((item) => ({
    id: item.id,
    item_name: item.item_name,
    quantity: item.quantity,
    unit_price: item.unit_price,
    tax_percentage: item.tax_percentage,
    tax_amount: item.tax_amount || '0.00',
    discount_percentage: item.discount_amount > 0 ? ((item.discount_amount / (parseFloat(item.quantity) * parseFloat(item.unit_price))) * 100).toFixed(2) : '0.00',
    discount_amount: item.discount_amount,
    total_amount: item.total_amount,
    is_header: item.isHeader ? 1 : 0,
    header_title: item.header_title || '',
    description: '',
    unit: '',
    product_id: '',
    within_state_tax_rate: null,
    cross_state_tax_rate: null
  }));

  const payload = {
    invoice_no: invoiceDetails.invoice_number, 
    invoice_date: invoiceDetails.invoice_date,
    due_date: invoiceDetails.due_date,
    payment_terms: invoiceDetails.payment_terms,
    customer_id: invoiceDetails.customer?.id || 1, 
    notes: invoiceDetails.notes,
    payment_method: paymentModes[0]?.mode || 'cash',
    amount_received: amountRecieved,
    total_amount: totalAmount?.toFixed(2),
    tax_amount: '0.00',
    discount_amount: '0.00',
    grand_total: totalAmount?.toFixed(2),
    items: updatedItemsList, 
  };

  console.log("Payload being sent:", payload);

  updateInvoiceById(String(id), payload)
    .then((res) => {
      console.log("API response:", res);
      toast.success("Invoice updated successfully!");
      navigate("/invoice");
    })
    .catch((err) => {
      console.error("Error updating invoice", err);
      toast.error("Failed to update invoice");
    });
};


  return(
    <>
     <div className="inv-cust-det-container">
<Link to={`/invoice`} className="new-customer-heading d-flex align-items-center" style={{ textDecoration: 'none',width:"11%" }} > <IoIosArrowBack />Edit Invoice</Link>

<div className="inv-cust-details">
          <div className="cust-name-nd-SalesPer">
             <label className='select-customer-label invoice-label'>
               Customer Name  <FaUserCheck style={{position:"absolute",top:"63%",left:"2%",color:"var(--color-accent)",fontSize:"19px"}} />
              <input className='select-customer-dropdown'  placeholder="Select or search customer"  value={invoiceDetails?.customer.customer_name}
            style={{ paddingLeft: '38px', color: 'var(--color-accent)', fontWeight: 500, fontSize: '16px', height: '40px', outline:"none", border: '1px solid var(--color-border)',  borderRadius: '4px', 
            background: '#fff'}}/>
            </label>
             <label className='select-salesperson-label invoice-label'>
                 Salesperson  <img src={searchIcon}/>
                <Select className='select-salesperson-dropdown'
                isDisabled
                 placeholder="Select or add a new salesperson"
                 styles={{ placeholder: (base) => ({...base,paddingLeft: '38px',color: '#888',fontWeight: '500',fontSize: '14px'}),
                control: (base) => ({...base,paddingLeft: '0px'}), input: (base) => ({...base, paddingLeft: '38px',}),singleValue: (base) => ({ ...base, paddingLeft: '38px',}),}}/>
             </label>
           </div>
           </div>
                      <div className="invoice-duedate-details w-100 d-flex gap-4 flex-warp" style={{flexWrap:"wrap"}}>
             <label className='invoice-label' htmlFor="">Invoice No.<input type="text" value={invoiceDetails?.invoice_number}  name='invoice_number'  placeholder='INV-123-333' /></label>
             <label className='invoice-label' htmlFor="">Invoice Date
              <input type="date" name='invoice_date' value={formatDateForInput(invoiceDetails?.invoice_date || '')}
  onChange={(e) =>  setinvoiceDetails((prev:any) => prev ? { ...prev, invoice_date: e.target.value } : prev)}
              />
               </label>
             <label className='invoice-label' htmlFor="">Payment Terms
              <select  name='payment_terms' value={invoiceDetails?.payment_terms||""} 
              onChange={(e)=>setinvoiceDetails((prev:any)=>prev?{...prev,payment_terms:e.target.value}:prev)} >
                 <option value="" disabled>Select payment term</option>
                <option value="due-on-recipt" selected>Due On Recipt</option>
                 <option value="next-month">Due at the end of next month</option>
                 <option value="end-this-month">Due at the end of this month</option>
               </select>
             </label>
             <label className='invoice-label' htmlFor="">Due Date
               <input type="date" name='due_date' value={formatDateForInput(invoiceDetails?.due_date||"")}  />
             </label>
           </div>

<div className="invoiceBilltableOverall">
            <table className='invoice-bill-table'>
         <thead>
           <tr>
             <th>ITEM DETAILS</th>
             <th>QUANTITY</th>
            <th>RATE</th>
            <th>DISCOUNT (%)</th>
            <th>TAX (%)</th>
             <th>AMOUNT</th>
             <th>ACTIONS</th>
          </tr>
        </thead>
         <tbody className='bill-table-body'>
      {invoiceDetails?.items.map((item,index)=>
       item.isHeader?( <tr key={index} className='items-headder-row-container' >
        <td className='items-headder w-100' colSpan={6}>
          <input  type="text" placeholder='Enter Header' required style={{width:"100%"}} value={item.header_title} onChange={(e)=>updateItemField(index,'headder_title',e.target.value)}/>
        </td>
        <td style={{ position: 'relative' }}>
          <img src={threedotOpt}  />
          <img src={billtableCloce} onClick={()=>deleteHeader(index)}/>
        </td>
      </tr>):
  
      <tr key={index} className='items-row' >
        <td>
          <input type="text"   value={item.item_name} onChange={(e) => updateItemField(index, 'item_name', e.target.value)} name="item_name" placeholder='Enter an Item'  required/>
        </td>
        <td>
          <input type="number" value={item.quantity} onChange={(e) => updateItemField(index, 'quantity', e.target.value)} name="quantity"/>
        </td>
        <td>
          <input type="number" name="unit_price" value={item.unit_price}  onChange={(e) => updateItemField(index, 'unit_price', e.target.value)} />
          </td>
        <td className='discount-sect-table'>
          <span>
            <input type="number"  name="discount_amount" value={item.discount_amount} onChange={(e)=>updateItemField(index,'discount_amount',e.target.value)}/>
            <img src={Discounticonbilltable} />
          </span>
        </td>
        <td className='tax-sect-table' style={{width:"10%"}}>
          <select
          value={item.tax_percentage}
            onChange={(e) => updateItemField(index, 'tax_percentage', e.target.value)}
            name="tax_percentage">
            <option value="">Tax</option>
            <option value="5">GST 5%</option>
            <option value="12">GST 12%</option>
            <option value="18">GST 18%</option>
            <option value="28">GST 28%</option>
          </select>
        </td>
        <td>
          <input type="text"  readOnly
            value={calculateAmount(item)}/>
        </td>
        <td style={{position:"relative"}}>
        
            {openactionindex==index&&<div className="row-items-menu">
              <div style={{textAlign:"left"}} onClick={addNewHeader}><img src={addNewheadderIcon}  className='clone-icon' /> Add Header</div>
              <div style={{textAlign:"left"}}><FaClone className='clone-icon' style={{color:"var(--color-accent)"}}/> Clone</div>
              <div style={{textAlign:"left"}}><BiSolidBasket className='clone-icon' style={{color:"var(--color-accent)"}}/> Add to Items</div>
            </div>}
     
          <img src={threedotOpt} onClick={()=>setopenactionindex(openactionindex==index?null:index)} />
          <img src={billtableCloce} onClick={() => deleteRow(index)} />
        </td>
      </tr>)}
</tbody>
      </table>
      <div className='table-row-add-actions pt-3'>
        <button onClick={addNewRow} ><img src={addNewRowIcon} />Add New Row</button>
         <button onClick={addNewHeader} ><img src={addNewheadderIcon} />Add New Header</button>
      </div>
       <div className="add-row-nd-headder-container">
         <div className='table-row-add-actions'></div>

         <div className='subtotal-container'>
           <div className="subTotalDiv">
             <span>Total (₹)</span>
             <h4>{totalAmount}</h4>
           </div>
             <div className='total-summary d-flex gap-2 justify-content-end'>
           {hideAndShowSummary==true?<span  onClick={()=>sethideAndShowSummary(!hideAndShowSummary)} style={{cursor:'pointer'}}>HIDE TOTAL SUMMARY <img src={hideSummary} alt="" /></span> :
           <span style={{cursor:'pointer'}} onClick={()=>sethideAndShowSummary(!hideAndShowSummary)}  > SHOW TOTAL SUMMARY <img src={showSummaryIcon} alt="" /> </span>}
       </div>
      </div>
     </div>
  <div className='hidendshowsummary w-100 ' style={{display:"flex",justifyContent:"end"}}>      
   {hideAndShowSummary&& invoiceDetails?.items.map((item,index)=><div key={index} className=' d-flex flex-column align-items-right' style={{width:"26%"}}>
     <div>Item : {item.item_name} </div>
     <div className='w-100 d-flex justify-content-between'><span>Amount:</span> ₹{item.total_amount}</div>
    <div className='w-100 d-flex justify-content-between'><span>Tax:</span> ₹{item.tax_amount}</div>
     <div className='w-100 d-flex justify-content-between'><span>Discount:</span> ₹{item.discount_amount}</div>
</div>)}
     </div>
       
       </div>
       </div>
       <div className='invoice-customer-notes'>
         <label htmlFor="" className='invoice-label'>
           Customer Notes
           <textarea className='customer-notes-text-area'
            value={invoiceDetails?.notes || ''}
  onChange={(e) =>
    setinvoiceDetails((prev) => prev ? { ...prev, notes: e.target.value } : prev)
  }
           placeholder='Thank you for your business' id=""></textarea>
         </label>
      </div>

      <div className="inv-payment-received-container">
  <div className='payment-mode-table-container'>
    <table className='payment-mode-table'>
      <thead>
        <tr className='payment-mode-table-th-row'>
          <th>PAYMENT MODE</th>
          <th>AMOUNT RECEIVED</th>
          <th><img src={dustbinDelete} /></th>
        </tr>
      </thead>
     <tbody>
  {paymentModes.map((row, index) => (
    <tr key={index} className='payment-mode-table-td-row'>
      <td style={{width:"50%"}}>
        <CreatableSelect
        isClearable
          className='payment-method-selector'
          placeholder="Select a payment mode"
          value={
            row.mode ? { label: row.mode, value: row.mode } : null
          }
          onChange={(selectedOption) => {
            const updatedRows = [...paymentModes];
            updatedRows[index].mode = selectedOption?.value || '';
            setPaymentModes(updatedRows);
          }}
          options={[
            { value: 'cash', label: 'Cash' },
            { value: 'upi', label: 'UPI' },
            { value: 'card', label: 'Card' },
            { value: 'netbanking', label: 'Netbanking' },
            { value: 'bank_transfer', label: 'Bank Transfer' },
            { value: 'cheque', label: 'Cheque' },
          ]}
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        />
      </td>
      <td className='payment-mode-table-enter-amount'>
        <input
          type="number"
          placeholder='Enter an amount'
          value={row.amount}
          
          onChange={(e) => {
            const updatedRows = [...paymentModes];
            updatedRows[index].amount = e.target.value;
            setPaymentModes(updatedRows);
          }}
        />
      </td>
      <td>
        <img
          src={dustbinDelete}
          style={{ cursor: 'pointer' }}
          onClick={() => {
          const updatedRows = paymentModes.filter((_, i) => i !== index);
          setPaymentModes(updatedRows);
          }}
        />
      </td>
    </tr>
  ))}
</tbody>
    </table>
  </div>
</div>
<div className="splitPayment-container pt-4">
  <button className='Split-payment-add-btn' onClick={()=>setPaymentModes([...paymentModes,{mode:"",amount:""}])}>
    <img src={addNewheadderIcon} />Add Split Payment
  </button>
  <div className='total-nd-balance-container'>
    <div className='d-flex flex-column align-items-end'>
      <h3>Total (₹) :<span>{totalAmount}</span></h3>
      <h3 className='balance-amount-h3'>Balance Amount (₹) :<span>{(Number(totalAmount)-amountRecieved)<0?0:(Number(totalAmount)-amountRecieved)}</span></h3>
    </div>
  </div>
</div>
<div className="invoice-save-print-buttons">
  <button onClick={handleEditInvoiceSave} >Save</button>
  <button><img src={printIcon} />Save and Print</button>
  <button onClick={()=>setshowCancelPopup(!showCancelPopup)} >Cancel</button>
</div>
{showCancelPopup && (
  <div className="Cancel-button-popup-container" style={{ zIndex: "10" }}>
    <div className="cancel-button-div">
      <div className="cancel-btn-headder-msg-cont">
        <div className="cancel-btn-headder-msg">
          <img src={warningicon} alt="" /> <h3>Leave this Page?</h3>
        </div>
        <p>If you leave this page, your unsaved changes will be discarded.</p>
      </div>
      <div className="cancel-button-action-buttons">
        <button onClick={()=>setshowCancelPopup(!showCancelPopup)} >Stay Here</button>
        <button onClick={()=>navigate('/invoice')}>Leave & Discard Changes</button>
      </div>
    </div>
  </div>
)}
    </>
  )
}

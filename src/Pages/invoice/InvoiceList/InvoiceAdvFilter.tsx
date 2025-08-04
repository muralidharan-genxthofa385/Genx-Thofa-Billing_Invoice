import React, { useState } from 'react'
import '../../Customerspage/CustomerTable/CustomersTable.css'
import crossIcon from '../../../assets/Icons/closecrossicon.svg'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


interface props {
    advancedFilter: boolean,
    setAdvancedFilter: any,
    setfiltereddata:React.Dispatch<React.SetStateAction<any>>
    filtereddata:{
         name:string,
        mobile:string,
        mail:string,
        customer_type:string,
        invoice_date:string,
        due_date:string,
        status:string,
        createdBtwFrom:string,
        createdBtwTo:string,
        lastInvoiceDateFrom:string,
        lastInvoiceDateTo:string,
        created_at:string,
         balanceMin:number,
  balanceMax:number
    }
     allInvoices: any[];
     setAllInvoices:any;
     setFilteredInvoices:any,
     applyAdvancedFilter: () => void; 
resetAdvancedFilter: () => void; 
}


interface InvoiceFilters {

    filCustomerName: string;
    filCustEmail: string;
    filcustPhone: string;
    custType: string;
    createdBtwFrom: string;
    createdBtwTo: string;
    LastInvoiceDatefrom: string;
    LastInvoiceDateto: string;
    DueDatefrom: string;
    DueDateto: string;
    paymentStatus: string;
    minAmount: string;
    maxAmount: string;
}

function InvoiceAdvFilter({ setAdvancedFilter,advancedFilter,setfiltereddata,filtereddata,applyAdvancedFilter,allInvoices,setAllInvoices,setFilteredInvoices}:props) {
   
 const resetFilter = () => {
  setfiltereddata({
    name: '',
    mobile: '',
    mail: '',
    customer_type: '',
    invoice_date: '',
    due_date: '',
    status: '',
    createdBtwFrom: '',
    createdBtwTo: '',
     balanceMin: 0,
  balanceMax: 0,
  });
  setFilteredInvoices(allInvoices); 
};


    return (
        <>
            <div className="inv-advaced-fil-container">
                <div className="inv-advaced-fil-white-box">
                    <div className='adv-fil-close-action d-flex justify-content-between align-items-center'><p>Advanced Filter</p>
                        <img style={{ cursor: "pointer" }} onClick={() => setAdvancedFilter(!advancedFilter)} src={crossIcon} alt="" /></div>

                    <div className="filter-by-customer">
                        <h2 className='filter-by-customer-headding pt-4'>Filter by customer info</h2>

                        <label htmlFor="" className="adv-fil-byCustomer pt-3">
                            Customer Name
                            <input type="text" value={filtereddata.name} onChange={(e) => setfiltereddata({...filtereddata,name:e.target.value})} placeholder='search by customer name' />
                        </label>
                        <label htmlFor="" className="adv-fil-byCustomer pt-3">
                            Email
                            <input type="email" value={filtereddata.mail} onChange={(e) => setfiltereddata({...filtereddata,mail:e.target.value})} placeholder='example@gmail.com' />
                        </label>
                        <label htmlFor="" className="adv-fil-byCustomer pt-3">
                            Phone No.
                            <input type="text" value={filtereddata.mobile} onChange={(e) => setfiltereddata({...filtereddata,mobile:e.target.value})} placeholder='search by customer phone' />
                        </label>
                        <label htmlFor="" className="adv-fil-byCustomer pt-3">
                            Customer Type
                            <select name="" value={filtereddata.customer_type} onChange={(e) => setfiltereddata({...filtereddata,customer_type:e.target.value})} className='w-100'>
                                <option value="." selected>Customer Type</option>
                                <option value="Business">Business</option>
                                <option value="Individual">Individual</option>
                            </select>
                        </label>
                    </div>
                    <div className="filter-by-dates">
                        <h2 className='filter-by-customer-headding pt-5'>Filter by Dates</h2>
                        <p className='pt-2' style={{ fontWeight: "600", fontSize: "16px" }}>Created Between</p>
                        <div className="date-filter-row w-100" >
                            <label className='date-fil-label w-50'> From<input  type="date" value={filtereddata.createdBtwFrom || ''} onChange={e => setfiltereddata({ ...filtereddata, createdBtwFrom: e.target.value })} /></label>
                            <label className='date-fil-label w-50'>To<input type="date" value={filtereddata.createdBtwTo || ''} onChange={e => setfiltereddata({ ...filtereddata, createdBtwTo: e.target.value })} /></label>
                        </div>

                        {/* <p className='pt-4' style={{ fontWeight: "600", fontSize: "16px" }}>Last Invoice Date</p>
                        <div className="date-filter-row w-100" >
                            <label className='date-fil-label w-50'> From<input type="date" value={filtereddata.lastInvoiceDateFrom || ''} onChange={e => setfiltereddata({ ...filtereddata, lastInvoiceDateFrom: e.target.value })} /></label>
                            <label className='date-fil-label w-50'>To<input type="date" value={filtereddata.lastInvoiceDateTo || ''} onChange={e => setfiltereddata({ ...filtereddata, lastInvoiceDateTo: e.target.value })} /></label>
                        </div> */}

                        <p className='pt-4' style={{ fontWeight: "600", fontSize: "16px" }}>Due Date Range </p>
                        <div className="date-filter-row w-100" >
                            <label className='date-fil-label w-50'> From<input value={filtereddata.invoice_date} onChange={(e) => setfiltereddata({...filtereddata,invoice_date:e.target.value})} type="date" /></label>
                            <label className='date-fil-label w-50'>To<input type="date" value={filtereddata.due_date} onChange={(e) => setfiltereddata({...filtereddata,due_date:e.target.value})} /></label>
                        </div>
                    </div>
                    <div className="filter-by-financial">
                        <h2 className='filter-by-customer-headding pt-4'>Filter by Financial</h2>
                        <p className='pt-4' style={{ fontWeight: "600", fontSize: "16px" }}>Balance Status</p>
                        <FormControl>
                            <RadioGroup value={filtereddata.status}  onChange={(e) => setfiltereddata({...filtereddata,status:e.target.value})} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                <FormControlLabel sx={{ fontSize: "14px", fontWeight: "400", color: "var(--color-warning-text)" }} value="All" control={<Radio sx={{ transform: "scale(0.9)" }} />} label="All" />
                                <FormControlLabel sx={{ fontSize: "14px", fontWeight: "400", color: "var(--color-warning-text)" }} value="Paid" control={<Radio sx={{ transform: "scale(0.9)" }} />} label="Paid" />
                                <FormControlLabel sx={{ fontSize: "14px", fontWeight: "400", color: "var(--color-warning-text)" }} value="Unpaid" control={<Radio sx={{ transform: "scale(0.9)" }} />} label="Unpaid" />
                                <FormControlLabel sx={{ fontSize: "14px", fontWeight: "400", color: "var(--color-warning-text)" }} value="Advance" control={<Radio sx={{ transform: "scale(0.9)" }} />} label="Advance" />
                            </RadioGroup>
                        </FormControl>
                        <div className="balance-amount">
                            <p className='pt-4' style={{ fontWeight: "600", fontSize: "16px" }}>Balance Amount</p>
                            <div className="date-filter-row w-100" >
                                <label className='date-fil-label w-50'> Min
                                <input placeholder='₹0' type="number" value={filtereddata.balanceMin}   onChange={e => setfiltereddata({ ...filtereddata, balanceMin: Number(e.target.value) })}/></label>
                                <label className='date-fil-label w-50'>Max
                                <input placeholder='₹10000' value={filtereddata.balanceMax}  onChange={e => setfiltereddata({ ...filtereddata, balanceMax: Number(e.target.value) })}  type="number" /></label>
                            </div>
                        </div>
                    </div>
                    <div className="advance-fillter-buttons d-flex justify-content-between mt-5">
                        <div className='d-flex gap-3'>
                            <button onClick={applyAdvancedFilter} >Apply Filters </button>
                            <button onClick={resetFilter} >Reset All</button>
                        </div>
                        <button onClick={() => setAdvancedFilter(!advancedFilter)} >Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoiceAdvFilter
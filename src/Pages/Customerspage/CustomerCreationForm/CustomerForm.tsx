import { IoIosArrowBack } from "react-icons/io";
import './customerform.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import React, { useState,useEffect } from "react";
import warningicon from '../../../assets/Icons/WarningIcon.svg'
import { AddNewCustomer, customersGstFetch } from "../../../service/CustomerService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


function CustomerForm() {


    const [selectedId, setSelectedId] = useState<string>('main');

  const [sameShippAdd, setsameShippAdd] = useState<boolean>(true);
  const [newCustomerformData, setNewcustomerFormData] = useState({
  salutation: '',
  name: '',
  company: '',
  email: '',
  phone: '',
  altPhone: '',
  billingAddressLine1: '',
  billingAddressLine2: '',
  billingCity: '',
  billingState: '',
  billingPincode: '',
  shippingAddressLine1: '',
  shippingAddressLine2: '',
  shippingCity: '',
  shippingState: '',
  shippingPincode: '',
  remarks: '',
  gstin: '',
  customer_type: 'Individual',
});
 
const handleCustomerTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNewcustomerFormData(prev => ({
    ...prev,
    customer_type: e.target.value,
    gstin: e.target.value === 'Individual' ? 'N/A' : '',
  }));
};
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setNewcustomerFormData(prev => ({
    ...prev,
    [name]: value,
  }));
};

const navigate=useNavigate();
const [cancelbuttonaction,setCancelbuttonaction]=useState<boolean>(false)
const renderCancelButton=()=>{
  setCancelbuttonaction(!cancelbuttonaction)
}
const [gstuserdetailboxaction,setgstuserdetailboxaction]=useState<boolean>(false)

const gstdetailbox_render=async(e: React.MouseEvent)=>{
  setSpinner(false)
  e.preventDefault();
  try{
    const res=await customersGstFetch(newCustomerformData.gstin);
    console.log(res)
setGstFetchedData(res)
 setgstuserdetailboxaction(true);
  }
  catch(err){
    console.log('gst fetch error',err);
alert('enter a valid gst number')
  }
}

const [gstFetchedData, setGstFetchedData] = useState<any>(null);
const allAddresses = gstFetchedData ? [
  {
    id: 'principal',
    label: 'Principal Place',
    name: gstFetchedData.legal_name_of_business,
    address: gstFetchedData.principal_place_address,
  },
  ...(gstFetchedData.additional_address_array || []).map((addr: any, i: number) => ({
    id: `additional_${i}`,
    label: `Additional Place ${i + 1}`,
    name: gstFetchedData.legal_name_of_business,
    address: addr.address,
  }))
] : [];
const handlePrefillDetails = () => {
  const selectedAddress = allAddresses.find(addr => addr.id === selectedId);

  if (!gstFetchedData) return;

  setNewcustomerFormData((prev) => ({
    ...prev,
    company: gstFetchedData.legal_name_of_business,
    gstin: gstFetchedData.gstin,
    billingAddressLine1: selectedAddress?.address || '',
    billingCity: '',
    billingState: '',
  }));
  setgstuserdetailboxaction(false); 
};
const handleAddNewCustomer = (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !newCustomerformData.name ||
    !newCustomerformData.billingAddressLine1 ||
    !newCustomerformData.billingCity ||
    !newCustomerformData.billingState ||
    !newCustomerformData.billingPincode
  ) {
    toast.error("Please fill all required billing address fields");
    return;
  }
  const payload: any = {
    salutation: newCustomerformData.salutation,
    customer_name: newCustomerformData.name,
    company_name: newCustomerformData.company,
    email: newCustomerformData.email,
    phone: newCustomerformData.phone,
    customer_type: newCustomerformData.customer_type.toLowerCase(),
    billing_address_line_1: newCustomerformData.billingAddressLine1?.toLowerCase() || '',
    billing_address_line_2: newCustomerformData.billingAddressLine2?.toLowerCase() || '',
    billing_city: newCustomerformData.billingCity,
    billing_state: newCustomerformData.billingState,
    billing_pincode: newCustomerformData.billingPincode,
    gstin: newCustomerformData.gstin,
    alt_phone: newCustomerformData.altPhone,
    remarks: newCustomerformData.remarks,
  };

  if (!sameShippAdd) {
    payload.shipping_address_line_1 = newCustomerformData.shippingAddressLine1;
    payload.shipping_address_line_2 = newCustomerformData.shippingAddressLine2;
    payload.shipping_city = newCustomerformData.shippingCity;
    payload.shipping_state = newCustomerformData.shippingState;
    payload.shipping_pincode = newCustomerformData.shippingPincode;
  }

  AddNewCustomer(payload)
    .then(() => {
      toast.success("Customer added successfully");
      navigate("/customers");
    })
    .catch((err) => {
      console.error(err);
      toast.error("Failed to add customer");
    });
};

useEffect(() => {
  if (sameShippAdd) {
    setNewcustomerFormData((prev) => ({
      ...prev,
      shippingAddressLine1: prev.billingAddressLine1,
      shippingAddressLine2: prev.billingAddressLine2,
      shippingCity: prev.billingCity,
      shippingState: prev.billingState,
      shippingPincode: prev.billingPincode,
    }));
  }
}, [
  sameShippAdd,
  newCustomerformData.billingAddressLine1,
  newCustomerformData.billingAddressLine2,
  newCustomerformData.billingCity,
  newCustomerformData.billingState,
  newCustomerformData.billingPincode,
]);

const [spinner,setSpinner]=useState<boolean>(false)

  return (
    <div>
<Link to={`/customers`} className="new-customer-heading" ><IoIosArrowBack /> New Customer</Link>
<form className="New-Customer-form" onSubmit={handleAddNewCustomer}>
<div className="newcustomer-form-row">
<div className="newcustomer-form-row-left-pan cus-type-radio-cont">
<label htmlFor="" className="d-flex flex-column" style={{gap:"0.75rem"}}> <span className="customer-type-label">Customer Type</span>
     <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Individual"
         value={newCustomerformData.customer_type}
  onChange={handleCustomerTypeChange}
        name="radio-buttons-group">
            <div className="d-flex">
        <FormControlLabel value="Business" className="customer-type-radio-buttons"  
      sx={{'& .MuiFormControlLabel-label': { color: 'var(--color-black)',fontWeight: '600',fontSize: '14px',},}} control={<Radio size="small" />} label="BUSINESS" />
        <FormControlLabel value="Individual" className="customer-type-radio-buttons"
         sx={{'& .MuiFormControlLabel-label': {color: 'var(--color-black)',fontWeight: '600',fontSize: '14px',},}} control={<Radio size="small" />} label="INDIVIDUAL" />
        </div>
      </RadioGroup>
    </FormControl>
    </label>
</div>
<div className="newcustomer-form-row-right-pan d-flex flex-column   gst-number-container" style={{gap:"0.75rem"}}>
  <span className="enter-gst-num-label">Enter GSTIN Number</span>
  <label htmlFor="" className="gst-fetch-input-cont"> <input type="text" placeholder="GST156968420" onChange={handleChange} name="gstin" value={newCustomerformData.customer_type === 'Individual' ? 'N/A' : newCustomerformData.gstin} disabled={newCustomerformData.customer_type  === 'Individual'} />
   {newCustomerformData.customer_type ==='Business'&&<button onClick={gstdetailbox_render}> Fetch</button>}</label>
   {/* {spinner&&<span className="prefil-spinner"></span>} */}
    </div>
</div>
<div className="customer-form-customer-info">
  <span className="cust-mer-info-label" >Customer Info</span>
<div className="newcustomer-form-row">
<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Customer Name</span>
  <label htmlFor="" className="salutation-and-name">
    <select name="salutation" onChange={handleChange} id="" value={newCustomerformData.salutation} required >
   <option value=""  hidden>Salutation</option>
   <option value="mr">Mr.</option>
   <option value="Ms">Ms.</option>
   <option value="mrs">Mrs.</option>
   <option value="dr">Dr.</option>
    </select>
    <input type="text" name="name" value={newCustomerformData.name} onChange={handleChange}  placeholder="Full Name" />
    </label>
</div>

<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Company Name</span>
<input type="text" name="company" value={newCustomerformData.company} onChange={handleChange} placeholder="Company Name" style={{width:"35rem"}} />
</div>
</div>

<div className="newcustomer-form-row">
<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Email address</span>
  <label htmlFor="">
    <input type="email"  name="email" value={newCustomerformData.email} onChange={handleChange} style={{width:"35rem"}} placeholder="example123@gmail.com" />
    </label>
</div>

<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Phone Number</span>
<input type="text" name="phone" value={newCustomerformData.phone} onChange={handleChange}  style={{width:"35rem"}} placeholder="ex:555-2233-555" />
</div>
</div>

<div className="newcustomer-form-row">
<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Alternate Phone</span>
  <label htmlFor="">
    <input type="text" name="altPhone" value={newCustomerformData.altPhone} onChange={handleChange} style={{width:"35rem"}} placeholder="ex:555-2233-555" />
    </label>
</div>
<div className="newcustomer-form-row-left-pan">
</div>
</div>
</div>

<div className="customer-form-customer-info">
  <span className="cust-mer-info-label" >Billing {sameShippAdd&&<>/ Shipping</>} Address</span>
<div className="newcustomer-form-row">
<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Address Line 1</span>
  <input type="text" name="billingAddressLine1" value={newCustomerformData.billingAddressLine1} onChange={handleChange} placeholder="Address 1" style={{width:"35rem"}} /> 
</div>
<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Address Line 2</span>
<input type="text" name="billingAddressLine2" value={newCustomerformData.billingAddressLine2} onChange={handleChange} placeholder="Address 2" style={{width:"35rem"}} />
</div>
</div>
<div className="newcustomer-form-row">
<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">City</span>
  <label htmlFor="">
    <input type="text" name="billingCity" value={newCustomerformData.billingCity} onChange={handleChange} style={{width:"35rem"}} placeholder="city" />
    </label>
</div>

<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">State</span>
<input type="text" style={{width:"35rem"}} name="billingState" value={newCustomerformData.billingState} onChange={handleChange} placeholder="state" />
</div>
</div>

<div className="newcustomer-form-row">
<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Pincode</span>
  <label htmlFor="">
    <input type="text" name="billingPincode" value={newCustomerformData.billingPincode} onChange={handleChange} style={{width:"35rem"}} placeholder="ex:600-300" />
    </label>
</div>
<div className="newcustomer-form-row-left-pan">
</div>
</div>

</div>
<div className="shippins-same-address-verification"><input type="checkbox" checked={sameShippAdd} onChange={(e)=>setsameShippAdd(e.target.checked)}/>
<p>Shipping address is same as billing address</p></div>
{!sameShippAdd&&<div className="alternative-shipping-address">
<div className="customer-form-customer-info">
  <span className="cust-mer-info-label" >Shipping Address</span>

<div className="newcustomer-form-row">
<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Address Line 1</span>
    <input type="text" name="shippingAddressLine1" value={newCustomerformData.shippingAddressLine1} onChange={handleChange} placeholder="Address 1" style={{width:"35rem"}}/>
</div>

<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Address Line 2</span>
<input type="text" name="shippingAddressLine2" value={newCustomerformData.shippingAddressLine2} onChange={handleChange} placeholder="Address 2" style={{width:"35rem"}} />
</div>
</div>

<div className="newcustomer-form-row">
<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">City</span>
  <label htmlFor="">
    <input type="text" name="shippingCity" value={newCustomerformData.shippingCity} onChange={handleChange} style={{width:"35rem"}} placeholder="city" />
    </label>
</div>

<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">State</span>
<input type="text" style={{width:"35rem"}} name="shippingState" value={newCustomerformData.shippingState} onChange={handleChange} placeholder="state" />
</div>
</div>

<div className="newcustomer-form-row">
<div className="newcustomer-form-row-left-pan">
  <span className="new-customer-form-input-label">Pincode</span>
  <label htmlFor="">
    <input type="text" style={{width:"35rem"}} name="shippingPincode" onChange={handleChange} value={newCustomerformData.shippingPincode} placeholder="ex:600-300"/>
    </label>

</div>
<div className="newcustomer-form-row-left-pan">
</div>
</div>
</div>
</div>}

<div className="new-customer-form-remarks-div">
  <label className="new-customer-form-input-label">Remarks <textarea name="remarks" value={newCustomerformData.remarks} onChange={handleChange}  placeholder="For Internal Purposes" id=""></textarea></label>
</div>

<div className="new-customer-buttons-cont">
  <button type="submit">Save</button>
  <button onClick={renderCancelButton}>Cancel</button>
</div>

</form>
{cancelbuttonaction&&<div className="Cancel-button-popup-container"> 

  <div className="cancel-button-div">
    <div className="cancel-btn-headder-msg-cont" >
<div className="cancel-btn-headder-msg"><img src={warningicon} alt="" /> <h3>Leave this Page?</h3></div>
<p>If you leave this page, your unsaved changes will be discarded.</p>
</div>
<div className="cancel-button-action-buttons"><button onClick={renderCancelButton}>Stay Here</button><button onClick={()=>{navigate(`/customers`)}} >Leave & Discard Changes</button></div>
  </div>
</div>}


{gstuserdetailboxaction && gstFetchedData && (
  <div className="gstfetchuserDisplay-container">
    <div className="gstfetch-display-box">
      <div className="gstfetch-user-detail-box">
        <p className="prefill-headder">Prefill Customer Details From the GST Portal</p>

        <form className="gst-prefill-main-form">
          <div className="gst-det-display-box-row">
            <label className="gst-no-label gst-form-label">
              GST No.
              <input type="text" value={gstFetchedData.gstin || ''} readOnly />
            </label>
          </div>

          <div className="gst-det-display-box-row company-name">
            <label className="gst-companyName-label gst-form-label">
              Company Name
              <input type="text" value={gstFetchedData.legal_name_of_business} readOnly />
            </label>
            <label className="gst-no-label gst-form-label">
              GSTIN / UIN Status
              <input type="text" value={gstFetchedData.gst_in_status} readOnly />
            </label>
          </div>

          <div className="gst-det-display-box-row company-name">
            <label className="gst-companyName-label gst-form-label">
              Tax Payer Type
              <input type="text" value={gstFetchedData.tax_payer_type} readOnly />
            </label>
            <label className="gst-no-label gst-form-label">
              Business Trade Name
              <input type="text" value={gstFetchedData.legal_name_of_business} readOnly />
            </label>
          </div>
                    <div className="available-address-container">
           {allAddresses.map((addr) => (
  <div key={addr.id} className={`available-address-box ${selectedId === addr.id ? 'selected' : ''}`}>
    <label className="address-radio-wrapper">
      <span>
        <input
          type="radio"
          name="address"
          value={addr.id}
          checked={selectedId === addr.id}
          onChange={() => setSelectedId(addr.id)}
        />
      </span>
      <div className="address-content">
        <strong className="office-label">{addr.label}</strong>
        <div className="office-name">{addr.name}</div>
        <div className="office-address">{addr.address}</div>
      </div>
    </label>
  </div>
))}
  </div>

          <div className="fetch-box-buttons-container">
            <button type="button" onClick={handlePrefillDetails}> Prefill Details</button>
            <button type="button" onClick={()=>{  setgstuserdetailboxaction(false); }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
    </div>
  )
}
export default CustomerForm
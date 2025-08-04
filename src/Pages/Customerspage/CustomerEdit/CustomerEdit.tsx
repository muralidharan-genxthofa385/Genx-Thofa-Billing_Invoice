import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../CustomerView/CustomerView.css'
import FormControl from '@mui/material/FormControl';
import { useParams } from 'react-router-dom'
import RadioGroup from '@mui/material/RadioGroup';
import { GetCustomersList, updateCustomer } from '../../../service/CustomerService';
import {toast} from 'react-toastify';


interface EditableCustomer {
  salutation?: string;
  gst_number: string;
  customer_name:string;
company_name:string,
  customer_type: "business" | "individual";
  email:string,
  phone:string,
  address:string,
  alternate_phone:string,
  billing_address_line_1:string,
  billing_address_line_2:string,
  billing_city:string,
  billing_state:string,
  shipping_address_line_1:string,
  shipping_address_line_2:string,
  shipping_city:string,
 shipping_state:string,
 remarks:string,
  


}


function CustomerEdit() {
    const {id}=useParams()

const [Editcustomer_form, setEditcustomer_form] =useState<EditableCustomer>({
    gst_number: "",
    company_name: "",
    customer_name:"",
    customer_type:`business`,
    email:"",
    phone:"",
    salutation: "",
    alternate_phone:"",
    billing_address_line_1:"",
    billing_address_line_2:"",
    billing_city:"",
    billing_state:"",
    shipping_address_line_1:"",
    shipping_address_line_2:"",
    shipping_city:"",
    shipping_state:"",
    remarks:"",
     address: "", 
     
    
});

   useEffect(() => {
       GetCustomersList()
         .then((res) => {
           const selectedCustomer = res.data.find((cust: any) => String(cust.id) === id);
setEditcustomer_form({
  gst_number: selectedCustomer?.gst_number || "",
  company_name: selectedCustomer?.company_name || "",
  customer_name: selectedCustomer?.customer_name || "", 
  customer_type: selectedCustomer?.customer_type || "business",
  email: selectedCustomer?.email || "",
  phone: selectedCustomer?.phone || "",
  alternate_phone: selectedCustomer?.alternate_phone || "",
  billing_address_line_1: selectedCustomer?.billing_address_line_1 || "",
  billing_address_line_2: selectedCustomer?.billing_address_line_2 || "",
  billing_city: selectedCustomer?.billing_city || "",
  billing_state: selectedCustomer?.billing_state || "",
  shipping_address_line_1: selectedCustomer?.shipping_address_line_1 || "",
  shipping_address_line_2: selectedCustomer?.shipping_address_line_2 || "",
  shipping_city: selectedCustomer?.shipping_city || "",
  shipping_state: selectedCustomer?.shipping_state || "",
  remarks: selectedCustomer?.remarks || "",
    address: selectedCustomer?.address || "",


});

           console.log(res)
         })
         .catch((err) => console.error(err));
     }, [id]);

    const handleEditedCustomerSave = (e: React.FormEvent) => {
  e.preventDefault();

  if (Editcustomer_form && id) {

  const updatedData = {
  gst_number: Editcustomer_form.gst_number,
  customer_name: Editcustomer_form.customer_name,
  company_name: Editcustomer_form.company_name,
  customer_type: Editcustomer_form.customer_type,
  email: Editcustomer_form.email,
  phone: Editcustomer_form.phone,
  alternate_phone: Editcustomer_form.alternate_phone || "",

  billing_address_line_1: Editcustomer_form.billing_address_line_1,
  billing_address_line_2: Editcustomer_form.billing_address_line_2,
  billing_city: Editcustomer_form.billing_city || "NA",
  billing_state: Editcustomer_form.billing_state || "NA",
  billing_pincode: "000000", // Or add a field in your form to collect this

  shipping_address_line_1: Editcustomer_form.shipping_address_line_1 || Editcustomer_form.billing_address_line_1,
  shipping_address_line_2: Editcustomer_form.shipping_address_line_2 || Editcustomer_form.billing_address_line_2,
  shipping_city: Editcustomer_form.shipping_city || Editcustomer_form.billing_city || "NA",
  shipping_state: Editcustomer_form.shipping_state || Editcustomer_form.billing_state || "NA",
  shipping_pincode: "000000", // Or add a field in your form to collect this

  remarks: Editcustomer_form.remarks || "",
  updated_by: 1
};


    updateCustomer(id, updatedData)
      .then(() => {
        toast.success("Customer updated successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update customer");
      });
  }
};

  return (
     <div className="customer-view-overall-container">
      <div className='customer-info-headding-container'>
        <Link to={`/customers`} className='customer-info-headding'><IoIosArrowBack /> Edit Customer</Link>
      </div>

      <form className='customer-view-form-container'>
        <div className="customer-view-row">
          <div className="customer-view-row-left">
            <label className='customerview-form-label'>
              Customer Type
              <div className='d-flex' style={{ alignItems: 'center', padding: '8px 0' }}>
               <FormControl>
  <RadioGroup
    row
    name="customer_type"
    value={Editcustomer_form.customer_type}
    onChange={(e) => setEditcustomer_form({ ...Editcustomer_form, customer_type: e.target.value as 'business' | 'individual' })}
  >
    <FormControlLabel value="business" control={<Radio />} label="Business" />
    <FormControlLabel value="individual" control={<Radio />} label="Individual" />
  </RadioGroup>
</FormControl>

              </div>
            </label>
          </div>
          <div className="customer-view-row-right">
          </div>
        </div>

        <div className="customer-view-customer-info">
          <label className='customer-view-headding-label'>Customer Info</label>

          <div className="customer-view-row">
            <div className="customer-view-row-left">
              <label className='customerview-form-label'>
                Customer Name
                <div className="salutation-name-wrapper">
                  <input type="text" className="salutation-name-input"  value={Editcustomer_form.salutation}  onChange={(e) => setEditcustomer_form({ ...Editcustomer_form, salutation: e.target.value })} />
                  <input type="text"   onChange={(e) => setEditcustomer_form({ ...Editcustomer_form, customer_name: e.target.value })} className="customer-name-input" value={Editcustomer_form.customer_name} />
                </div>
              </label>
            </div>
            <div className='customer-view-row-right'>
              <label className='customerview-form-label'>
                Company Name
                <input type="text" onChange={(e) => setEditcustomer_form({ ...Editcustomer_form, company_name: e.target.value })} value={Editcustomer_form.company_name} />
              </label>
            </div>
          </div>

          <div className="customer-view-row">
            <div className="customer-view-row-left">
              <label className='customerview-form-label'>
                Email Address
                <input type="text" value={Editcustomer_form.email} onChange={(e) => setEditcustomer_form({ ...Editcustomer_form, email: e.target.value })}  style={{ width: "610px" }} />
              </label>
            </div>
            <div className='customer-view-row-right'>
              <label className='customerview-form-label'>
                Phone Number
                <input type="text" value={Editcustomer_form.phone} onChange={(e)=>setEditcustomer_form({...Editcustomer_form,phone:e.target.value})} />
              </label>
            </div>
          </div>

          <div className="customer-view-row">
            <div className="customer-view-row-left">
              <label className='customerview-form-label'>
                Alternate Phone Number
                <input type="text" value={Editcustomer_form.alternate_phone}
onChange={(e) => setEditcustomer_form({ ...Editcustomer_form, alternate_phone: e.target.value })}
  style={{ width: "610px" }} />
              </label>
            </div>
          </div>
        </div>

        <div className="Billing-ShippingAddress-customer-view">
          <label className='customer-view-headding-label'>Billing / Shipping Address</label>

          <div className="customer-view-row">
            <div className='customer-view-row-left'>
              <label className='customerview-form-label'>
                Billing Address
               <textarea
  value={`${Editcustomer_form.billing_address_line_1 || ''}, ${Editcustomer_form.billing_address_line_2 || ''}`}
  onChange={(e) => {
    const [line1, ...line2] = e.target.value.split(',');
    setEditcustomer_form({
      ...Editcustomer_form,
      billing_address_line_1: line1.trim(),
      billing_address_line_2: line2.join(',').trim(),
    });
  }}
></textarea>

              </label>
            </div>
            <div className='customer-view-row-right'>
              <label className='customerview-form-label'>
                Shipping Address
                <textarea
 value={`${Editcustomer_form.shipping_address_line_1 || Editcustomer_form.billing_address_line_1 || ''}, ${Editcustomer_form.shipping_address_line_2 || Editcustomer_form.billing_address_line_2 || ''}`}

  onChange={(e) => {
    const [line1, ...line2] = e.target.value.split(',');
    setEditcustomer_form({
      ...Editcustomer_form,
      shipping_address_line_1: line1.trim(),
      shipping_address_line_2: line2.join(',').trim(),
    });
  }}
></textarea>

              </label>
            </div>
          </div>

          <div className="customer-view-row" style={{paddingBottom:"5%"}}>
            <div className='customer-view-row-left'>
              <label className='customerview-form-label'>
                Remarks
                <textarea
  id="remarks-textarea"
  value={Editcustomer_form.remarks}
  onChange={(e) =>
    setEditcustomer_form({ ...Editcustomer_form, remarks: e.target.value })
  }
/>

              </label>
            </div>
          </div>
        </div>
      </form>

      <div className='customers-view-buttons'>
        <button onClick={handleEditedCustomerSave}>Save</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

export default CustomerEdit
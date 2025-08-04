import React, { useEffect, useState } from 'react';
import './CustomerView.css';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import white_edit_icon from '../../../assets/Icons/editpencilIconWhite.svg';
import { GetCustomersList } from '../../../service/CustomerService';




function CustomerView() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    GetCustomersList()
      .then((res) => {
        const selectedCustomer = res.data.find((cust: any) => String(cust.id) === id);
        console.log(res)
        setCustomer(selectedCustomer);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!customer) return <div>Loading customer data...</div>;

  return (
    <div className="customer-view-overall-container">
      <div className='customer-info-headding-container'>
        <Link to={`/customers`} className='customer-info-headding'><IoIosArrowBack /> Customer Info</Link>
        <Link to={`/customersEdit/${id}`} className='view-customer-edit-button'>Edit <img src={white_edit_icon} alt="" /></Link>
      </div>

      <form className='customer-view-form-container'>
        <div className="customer-view-row">
          <div className="customer-view-row-left">
            <label className='customerview-form-label'>
              Customer Type
              <FormControlLabel
                checked
                value={customer.customer_type}
                className="customer-type-radio-buttons"
                control={<Radio size="small" />}
                label={customer.customer_type.toUpperCase()}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: 'var(--color-black)',
                    fontWeight: '600',
                    fontSize: '14px'
                  }
                }}
              />
            </label>
          </div>
          <div className="customer-view-row-right">
            <label className='customerview-form-label'>
              GSTIN Number
              <input type="text" className='customer-view-gstin-input' readOnly value={customer.gstin || 'N/A'} />
            </label>
          </div>
        </div>

        <div className="customer-view-customer-info">
          <label className='customer-view-headding-label'>Customer Info</label>

          <div className="customer-view-row">
            <div className="customer-view-row-left">
              <label className='customerview-form-label'>
                Customer Name
                <div className="salutation-name-wrapper">
                  <input type="text" className="salutation-name-input" value={customer.salutation || ''} readOnly />
                  <input type="text" className="customer-name-input" value={customer.customer_name || ''} readOnly />
                </div>
              </label>
            </div>
            <div className='customer-view-row-right'>
              <label className='customerview-form-label'>
                Company Name
                <input type="text" value={customer.company_name || ''} readOnly />
              </label>
            </div>
          </div>

          <div className="customer-view-row">
            <div className="customer-view-row-left">
              <label className='customerview-form-label'>
                Email Address
                <input type="text" style={{ width: "610px" }} value={customer.email || ''} readOnly />
              </label>
            </div>
            <div className='customer-view-row-right'>
              <label className='customerview-form-label'>
                Phone Number
                <input type="text" value={customer.phone || ''} readOnly />
              </label>
            </div>
          </div>

          <div className="customer-view-row">
            <div className="customer-view-row-left">
              <label className='customerview-form-label'>
                Alternate Phone Number
                <input type="text" style={{ width: "610px" }} value={customer.alternate_phone==null?customer.phone: ''} readOnly />
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
                <textarea value={`${customer.billing_address_line_1 || ''} ${customer.billing_address_line_2 || ''}, ${customer.billing_city} ,${customer.billing_state}.`} readOnly />
              </label>
            </div>
            <div className='customer-view-row-right'>
              <label className='customerview-form-label'>
                Shipping Address
                <textarea value={`${customer.shipping_address_line_1==null?customer.billing_address_line_1:null},${customer.shipping_address_line_2==null?customer.billing_address_line_2:null}, ${customer.shipping_city==null?customer.billing_city:null},${customer.shipping_state==null?customer.billing_state:null}.`} readOnly />
              </label>
            </div>
          </div>

          <div className="customer-view-row">
            <div className='customer-view-row-left'>
              <label className='customerview-form-label'>
                Remarks
                <textarea id="remarks-textarea" value={customer.remarks || ''} readOnly />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomerView;

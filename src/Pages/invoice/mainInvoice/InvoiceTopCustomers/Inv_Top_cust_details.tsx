import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Inv_Top_cust_details.css';
import { IoIosArrowBack } from 'react-icons/io';
import { IoMdAdd } from 'react-icons/io';
import searchIcon from '../../../../assets/Icons/searchicon.svg';
import Select from 'react-select';
import { GetCustomersList } from '../../../../service/CustomerService';
import warningSymbol from '../../../../assets/Icons/WarningIcon.svg'


interface CustomerOption {
  label: string;
  value: string;
  isNew?: boolean;
}

interface Props {
  topDetails: {
    customerId: string;
    invoiceDate: string;
    dueDate: string;
    paymentTerm: string;
    invoiceNo: string;
    notes: string;
    paymentMethod: string;
    amountReceived: string;
  };
  setTopDetails: React.Dispatch<React.SetStateAction<any>>;
  renderNewcustPop: () => void;
  selectedCustomer: CustomerOption | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerOption | null>>;
  setResetBillTable?: (reset: boolean) => void;
}

function Inv_Top_cust_details({
  topDetails,
  setTopDetails,
  renderNewcustPop,
  selectedCustomer,
  setSelectedCustomer,
  setResetBillTable,
}: Props) {
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    const res = await GetCustomersList();
    const customers = res.data || res;

    setCustomerOptions([
      { label: 'Add New Customer', value: 'add-new', isNew: true },
      ...customers.map((customer: any) => ({
        value: customer.id,
        label: customer.customer_name,
      })),
    ]);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

 const handleCustomerSelect = (selected: CustomerOption | null) => {
  if (!selected) return;

  if (selected.value === 'add-new') {
    renderNewcustPop();
    return;
  }

  if (selectedCustomer && selected.value !== selectedCustomer.value) {
    setPendingCustomer(selected);
    setCustomerSwitchDiv(true);         
  } else {
    setTopDetails((prev: any) => ({ ...prev, customerId: selected.value }));
    setSelectedCustomer(selected);
  }
};


  useEffect(() => {
    if (topDetails.customerId && customerOptions.length > 0) {
      const found = customerOptions.find((c) => c.value === topDetails.customerId);
      if (found) {
        setSelectedCustomer(found);
      }
    }
  }, [topDetails.customerId, customerOptions]);

  useEffect(() => {
    if (!topDetails.invoiceDate || !topDetails.paymentTerm) return;
    const date = new Date(topDetails.invoiceDate);
    let due: string;

    if (topDetails.paymentTerm === 'due-on-recipt') {
      due = date.toISOString().slice(0, 10);
    } else if (topDetails.paymentTerm === 'end-this-month') {
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      due = endOfMonth.toISOString().slice(0, 10);
    } else if (topDetails.paymentTerm === 'next-month') {
      const endOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0);
      due = endOfNextMonth.toISOString().slice(0, 10);
    } else {
      return;
    }

    setTopDetails((prev: any) => ({ ...prev, dueDate: due }));
  }, [topDetails.invoiceDate, topDetails.paymentTerm]);

const [customerSwitchDiv, setCustomerSwitchDiv] = useState<boolean>(false);
const [pendingCustomer, setPendingCustomer] = useState<CustomerOption | null>(null);

  console.log(selectedCustomer)

  return (
    <div className="inv-cust-det-container">
      <Link
        to={`/invoice`}
        className="new-customer-heading d-flex align-items-center"
        style={{ textDecoration: 'none', width: '11%' }}
      >
        <IoIosArrowBack /> New Invoice
      </Link>

      <div className="inv-cust-details">
        <div className="cust-name-nd-SalesPer" style={{ position: 'relative' }}>
          <label className="select-customer-label invoice-label">
            Customer Name <img src={searchIcon} />
            <Select
              className="select-customer-dropdown"
              options={customerOptions}
              onChange={handleCustomerSelect}
              placeholder="Select or search customer"
              isSearchable
              styles={{
                placeholder: (base) => ({
                  ...base,
                  paddingLeft: '38px',
                  color: '#888',
                  fontWeight: '500',
                  fontSize: '14px',
                }),
                input: (base) => ({ ...base, paddingLeft: '38px' }),
                singleValue: (base) => ({ ...base, paddingLeft: '38px' }),
              }}
              formatOptionLabel={(e: CustomerOption) =>
                e.isNew ? (
                  <span className="inv-customer-select-drop">
                    <IoMdAdd />
                    {e.label}
                  </span>
                ) : (
                  e.label
                )
              }
              value={selectedCustomer}
            />
          </label>

          <label className="select-salesperson-label invoice-label">
            Salesperson <img src={searchIcon} />
            <Select
              className="select-salesperson-dropdown"
              isDisabled
              placeholder="Select or add a new salesperson"
              styles={{
                placeholder: (base) => ({
                  ...base,
                  paddingLeft: '38px',
                  color: '#888',
                  fontWeight: '500',
                  fontSize: '14px',
                }),
                control: (base) => ({ ...base, paddingLeft: '0px' }),
                input: (base) => ({ ...base, paddingLeft: '38px' }),
                singleValue: (base) => ({ ...base, paddingLeft: '38px' }),
              }}
            />
          </label>
        </div>

        <div className="invoice-duedate-details invoice-top-due-dte-details">
          <label className="invoice-label">
            Invoice No.
            <input
              type="text"
              value={topDetails.invoiceNo}
              onChange={(e) =>
                setTopDetails((prev: any) => ({ ...prev, invoiceNo: e.target.value }))
              }
              placeholder="INV-123-333"
            />
          </label>

          <label className="invoice-label">
            Invoice Date
            <input
              type="date"
              value={topDetails.invoiceDate}
              onChange={(e) =>
                setTopDetails((prev: any) => ({ ...prev, invoiceDate: e.target.value }))
              }
            />
          </label>

          <label className="invoice-label">
            Payment Terms
            <select
              value={topDetails.paymentTerm}
              onChange={(e) =>
                setTopDetails((prev: any) => ({ ...prev, paymentTerm: e.target.value }))
              }
            >
              <option value="" disabled>
                Select payment term
              </option>
              <option value="due-on-recipt">Due On Receipt</option>
              <option value="next-month">Due at the end of next month</option>
              <option value="end-this-month">Due at the end of this month</option>
            </select>
          </label>

          <label className="invoice-label">
            Due Date
            <input
              type="date"
              value={topDetails.dueDate}
              onChange={(e) =>
                setTopDetails((prev: any) => ({ ...prev, dueDate: e.target.value }))
              }
            />
          </label>
        </div>
      </div>
{customerSwitchDiv && (
  <div className="Customer-Switch-Confirmation-container" style={{zIndex:"15"}}>
    <div className="customer-Switch-box w-100 vh-100 d-flex align-items-center justify-content-center">
      <div className='customer-Switch-box-contents' >
        <h2><img src={warningSymbol} alt="" />Customer Switching Confirmation</h2>
        <p>
          Changing the customer will <strong>clear the current invoice data</strong> including items, charges, and notes.
          Are you sure you want to proceed?
        </p>
        <div className='customer-switch-buttons d-flex w-100 gap-3'>
          <button
            onClick={() => {
              if (pendingCustomer) {
                setSelectedCustomer(pendingCustomer);
                setTopDetails((prev: any) => ({
                  ...prev,
                  customerId: pendingCustomer.value,
                  invoiceNo: '',
                  invoiceDate: '',
                  dueDate: '',
                  paymentTerm: '',
                  notes: '',
                  paymentMethod: '',
                  amountReceived: '',
                }));
                // Reset bill table data when switching customer
                if (setResetBillTable) {
                  setResetBillTable(true);
                }
              }
              setCustomerSwitchDiv(false);
              setPendingCustomer(null);
            }} >
            Switch Customer
          </button>
          <button
            onClick={() => {
              setCustomerSwitchDiv(false);
              setPendingCustomer(null);
            }}
          >
            Stay with Current Customer
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
export default Inv_Top_cust_details;
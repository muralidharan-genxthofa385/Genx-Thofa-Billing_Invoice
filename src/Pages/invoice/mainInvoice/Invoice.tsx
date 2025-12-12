
import  { useEffect, useState } from 'react';
import Inv_Top_cust_details from './InvoiceTopCustomers/Inv_Top_cust_details';
import InvoiceBilltable from './InvoiceTopCustomers/InvoiceBillTable/InvoiceBilltable';
import InvCustCreation from '../../Customerspage/CustomerCreationForm/InvCustCreation';
import { GetCustomersList } from '../../../service/CustomerService';
import { CustomerDropContext } from '../../../Context/CustomerContext';
import { type CustomerOption } from '../../../Context/CustomerContext';

function Invoice() {
  const [topDetails, setTopDetails] = useState({
    customerId: '',
    invoiceDate: '',
    dueDate: '',
    paymentTerm: '',
    invoiceNo: '',
    notes: '',
    paymentMethod: '',
    amountReceived: '',
  });

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [newCustPop, setNewCustPop] = useState<boolean>(false);
  const renderNewcustPop = () => setNewCustPop(!newCustPop);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [recentCustomer,setRecentCustomer] = useState<any>(null);
  const [updatedCustomerDrop,setUpdatedCustomerDrop]=useState<CustomerOption[]>([])

  useEffect(() => {
    const generateRandomNum = (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const invNum = `GENX-INV-${generateRandomNum(10, 99)}`;
    setTopDetails((prev) => ({ ...prev, invoiceNo: invNum }));
  }, []);


 const fetchCustomersdropdown =async () => {
    const res = await GetCustomersList();
    const customers = res.data || res;
    setUpdatedCustomerDrop([
       ...customers.map((customer: any) => ({
        value: customer.id,
        label: customer.customer_name,
      })),
    ])
 };
useEffect(() => {
  fetchCustomersdropdown();
}, []);

console.log('updatedCustomer dropdown ',updatedCustomerDrop)




//   const handleCustomerCreated = (newCustomer: any) => {
//   setNewCustPop(false);

//   const newCustomerOption = {
//     label: newCustomer.customer_name,
//     value: newCustomer.id,
//   };

//   setSelectedCustomer(newCustomerOption);
//   setTopDetails((prev) => ({
//     ...prev,
//     customerId: newCustomer.id,
//   }));
//   // fetchCustomersdropdown()

  
// };

const handleCustomerCreated = (newCustomer: any) => {
  setNewCustPop(false);

  const newCustomerOption = {
    label: newCustomer.customer_name,
    value: newCustomer.id,
  };


  setUpdatedCustomerDrop((prev) => [
    { label: 'Add New Customer', value: 'add-new', isNew: true },
    ...prev.filter(opt => opt.value !== 'add-new'), 
    newCustomerOption
  ]);

  setSelectedCustomer(newCustomerOption);
  setTopDetails((prev) => ({
    ...prev,
    customerId: newCustomer.id,
  }));
};


  const [resetBillTable, setResetBillTable] = useState(false);

  return (
    <div>
      <CustomerDropContext.Provider value={updatedCustomerDrop}>
 <Inv_Top_cust_details
  topDetails={topDetails}
  renderNewcustPop={renderNewcustPop}
  setTopDetails={setTopDetails}
  selectedCustomer={selectedCustomer}
  setSelectedCustomer={setSelectedCustomer}
  setResetBillTable={setResetBillTable}
  customerOptions={customerOptions}
  setCustomerOptions={setCustomerOptions}
  recentCustomer={recentCustomer}
  // fetchCustomersdropdown={fetchCustomersdropdown}
/>
      {newCustPop && (
        <InvCustCreation
          renderNewcustPop={renderNewcustPop}
          refreshCustomerList={() => {}}
          onCustomerCreated={handleCustomerCreated}
          newCustPop={newCustPop}
        />
      )}

     <InvoiceBilltable
  topDetails={topDetails}
  setTopDetails={setTopDetails}
  resetBillTable={resetBillTable}
  setResetBillTable={setResetBillTable}
/>
</CustomerDropContext.Provider>
    </div>
  );
}

export default Invoice;

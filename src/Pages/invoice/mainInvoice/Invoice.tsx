
import React, { useEffect, useState } from 'react';
import Inv_Top_cust_details from './InvoiceTopCustomers/Inv_Top_cust_details';
import InvoiceBilltable from './InvoiceTopCustomers/InvoiceBillTable/InvoiceBilltable';
import InvCustCreation from '../../Customerspage/CustomerCreationForm/InvCustCreation';

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
  

  useEffect(() => {
    const generateRandomNum = (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const invNum = `GENX-INV-${generateRandomNum(10, 99)}`;
    setTopDetails((prev) => ({ ...prev, invoiceNo: invNum }));
  }, []);

  const handleCustomerCreated = (newCustomer: any) => {
    setNewCustPop(false);

    const newCustomerOption = {
      label: newCustomer.customer_name,
      value: newCustomer.id,
    };

    setSelectedCustomer(newCustomerOption);
    setTopDetails((prev) => ({
      ...prev,
      customerId: newCustomer.id,
    }));
  };

  const [resetBillTable, setResetBillTable] = useState(false);
const handleClearAllFields = () => {
  setTopDetails({
    customerId: '',
    invoiceDate: '',
    dueDate: '',
    paymentTerm: '',
    invoiceNo: '',
    notes: '',
    paymentMethod: '',
    amountReceived: '',
  });
  setResetBillTable(true);
  setSelectedCustomer(null);
};


  const [customerSwitchDiv, setCustomerSwitchDiv] = useState(false);
const [pendingCustomer, setPendingCustomer] = useState(null); 


  return (
    <div>
      <Inv_Top_cust_details
        topDetails={topDetails}
        renderNewcustPop={renderNewcustPop}
        setTopDetails={setTopDetails}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        setResetBillTable={setResetBillTable}/>
      {newCustPop && (
        <InvCustCreation
          renderNewcustPop={renderNewcustPop}
          refreshCustomerList={() => {}}
          onCustomerCreated={handleCustomerCreated}
        />
      )}

     <InvoiceBilltable
  topDetails={topDetails}
  setTopDetails={setTopDetails}
  resetBillTable={resetBillTable}
  setResetBillTable={setResetBillTable}
/>

    </div>
  );
}

export default Invoice;

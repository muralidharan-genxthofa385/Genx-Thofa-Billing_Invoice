import './CustomersTable.css'
import { useEffect } from 'react'
import { useState } from 'react'
import clearFilterIcon from '../../../assets/Icons/clearFilterIcon.svg'
import searchIcon from '../../../assets/Icons/searchicon.svg'
import filterIcon from '../../../assets/Icons/FilterIcon.svg'
import addicon from '../../../assets/Icons/plusIcon.svg'
import { Link } from 'react-router-dom'
import threedotselector from '../../../assets/Icons/threedotselector.svg'
import { DeleteCustomer, GetCustomersList } from '../../../service/CustomerService'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import tr_closeIcon from '../../../assets/Icons/closecrossicon.svg'
import tr_editIcon from '../../../assets/Icons/tableEditIcon.svg'
import tr_deleteIcon from '../../../assets/Icons/tableDelete.svg'
import { toast } from 'react-toastify'

interface CustomerList {
   id: number;
  customer_name: string;
  phone: string;
  email: string;

company_name:string;
balance_due:number;
  contact_type: string;
  customer_type: string;
  created_at:string;
}

const CustomersTable=()=> {
     const [customers, setCustomers] = useState<CustomerList[]>([])
     const [rowsPerPage, setRowsPerPage] = useState<number>(10);
     const [currentPage, setCurrentPage] = useState<number>(1);
     const [searchCust,setSearchcust]=useState<string>('')

     const [activeActionIndex, setActiveActionIndex] = useState<number | null>(null);
        
     const renderInvTableActions = (index: number) => {
             setActiveActionIndex(prevIndex => (prevIndex === index ? null : index));
         };

     const getActionMenuStyle = (index: number) => {
         const isNearBottom = index >= currentTableData.length - 2; 
         return {
             top: isNearBottom ? 'auto':'109%',
             bottom: isNearBottom ? '109%':'auto',
             right: '-113px'
         };
     };
  useEffect(()=>{
    GetCustomersList()
    .then((res)=>{setCustomers(res.data)
 console.log(res) 
  })
    .catch((err)=>console.log(err))
  },[])

 
  const totalPages = Math.ceil(customers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentTableData = customers.slice(startIndex, endIndex);

  const handleRowsPerPageChange = (num: number) => {
    setRowsPerPage(num);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredCustomers=currentTableData.filter((user)=>user.customer_name.toLowerCase().includes(searchCust.toLowerCase())||
user.email.toLowerCase().includes(searchCust.toLowerCase()))

const clearSearchFunction=()=>{
setSearchcust('')
}

const deleteCustomer=(id:number)=>{
  const confirmDelete=window.confirm("do you really want to delete this customer")

  if(confirmDelete){
    DeleteCustomer(id)
    .then(()=>{
      setCustomers(prev=>prev.filter(customer=>customer.id!==id))
      toast.success("customer deleted successfully")
    })
    .catch((err)=>console.log(err))
  }

}

  return (
    <div>

<div className="customers-table-headder">
    <h2>Customer</h2>

    <div className="customer-table-headder-filter-cont">
{searchCust&&<label className='customer-hd-clear-fil' htmlFor="" onClick={clearSearchFunction}><img src={clearFilterIcon}/> Clear Filter</label>}
<label className='customer-hd-search-bar' htmlFor=""><img src={searchIcon}/>
<input type="search" placeholder='Search in customer' value={searchCust} onChange={e=>setSearchcust(e.target.value)} /></label>
{/* <label className='customer-hd-filter-ic' htmlFor=""><img src={filterIcon} /></label> */}
<Link to={`/customersAdd`} className='btn create-cust-btn'>Create Customer <img src={addicon} alt="" /></Link>
<label className='create-cust-threedot' htmlFor=""><img src={threedotselector} alt="" /></label>
    </div>
</div>

<div className='customers-table'>
<table>
    <thead>
        <tr>
            <th><img src={threedotselector} alt="" /></th>
            <th>Customer Name</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Balance Due</th>
        </tr>
    </thead>
    <tbody>
        {filteredCustomers.map((customers,index)=><tr key={index}>
            <td style={{position:"relative"}}> {activeActionIndex === index?(
                                        <div className='cus-table-actions'>
                                           <div className='cus-table-action-icons'>
                                           <img src={tr_closeIcon} className='close-icon' onClick={() => renderInvTableActions(index)} alt="" />
                                          <div className='table-ed-del-cont-container' style={getActionMenuStyle(index)}>
                                            <span className='table-ed-del-cont' > <Link style={{textDecoration:"none"}} to={`/customersEdit/${customers.id}`}><img src={tr_editIcon} alt="" /> <span className='drag-itms'>Edit</span></Link>
                                           <label onClick={()=>deleteCustomer(customers.id)}> <img src={tr_deleteIcon} alt="" /> <span className='drag-itms'>Delete</span></label>
                                           </span> </div>
                                           </div>
                                        </div>
                                    ):<img src={threedotselector} onClick={() => renderInvTableActions(index)} />}</td>
            <td><Link className='customers-td-link-tag'  to={`/customersView/${customers.id}`}>{customers.customer_name}</Link></td>
            <td>{customers.company_name}</td>
            <td>{customers.email}</td>
            <td>{customers.phone}</td>
            <td>₹{customers.balance_due}</td>
        </tr>)}

    </tbody>
</table>

{/* Pagination controls */}

</div>
<div className="invoice-pagination">
  <div className="rows-per-page">
    <div>
      <span className='d-flex gap-0'>Rows per page:
        <select className='rows-per-page' value={rowsPerPage} onChange={(e) => handleRowsPerPageChange(Number(e.target.value))} style={{backgroundColor:"transparent", marginLeft: '8px', padding: '4px', border: 'none', borderRadius: '4px', outline: "none" }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </span>
    </div>
  </div>
  <div className="pagination-info">
    <span>{startIndex + 1}-{Math.min(endIndex, customers.length)} OF {customers.length}</span>
  </div>
  <div className="pagination-controls">
    <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{backgroundColor:"transparent", border:"none",cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}><IoIosArrowBack/></button>
    <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0} style={{backgroundColor:"transparent",border:"none",cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1 }}><IoIosArrowForward/></button>
  </div>
</div>

 </div>
  )
}

export default CustomersTable



// src/components/CustomersTable.tsx
// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import { GetCustomersList } from '../../../service/CustomerService';

// interface CustomerList {
//   id: number;
//   customer_name: string;
//   phone: string;
//   email: string;
//   company_name: string;
//   balance_due: number;
//   contact_type: string;
//   customer_type: string;
//   created_at: string;
// }

// const CustomersTable = () => {
//   const [customers, setCustomers] = useState<CustomerList[]>([]);

//   useEffect(() => {
//     GetCustomersList()
//       .then((res) => setCustomers(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'customer_name', headerName: 'Customer Name', width: 180 },
//     { field: 'company_name', headerName: 'Company Name', width: 180 },
//     { field: 'email', headerName: 'Email', width: 200 },
//     { field: 'phone', headerName: 'Phone', width: 140 },
//     {
//       field: 'balance_due',
//       headerName: 'Balance Due',
//       width: 140,
//       type: 'number',
//       valueFormatter: (params: any) => `₹${params.value}`,
//     },
//   ];

//   return (
//     <Paper sx={{ height: 500, width: '100%' }}>
//       <DataGrid
//         rows={customers}
//         columns={columns}
//         initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
//         pageSizeOptions={[5, 10, 20]}
//         checkboxSelection
//         sx={{ border: 0 }}
//         getRowId={(row) => row.id}
//       />
//     </Paper>
//   );
// };

// export default CustomersTable;
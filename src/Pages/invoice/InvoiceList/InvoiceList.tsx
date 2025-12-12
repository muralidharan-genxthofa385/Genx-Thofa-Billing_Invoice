import React, { useEffect, useRef, useState } from 'react'
import './InvoiceList.css'
import clearFilterIcon from '../../../assets/Icons/clearFilterIcon.svg'
import addicon from '../../../assets/Icons/plusIcon.svg'
import { SlOptions } from "react-icons/sl";
import searchIcon from '../../../assets/Icons/searchicon.svg'
import filterIcon from '../../../assets/Icons/FilterIcon.svg'
import threedotselector from '../../../assets/Icons/threedotselector.svg'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import { fetchInvoice,deleteInvoice } from '../../../service/invoiceService';
import tr_closeIcon from '../../../assets/Icons/closecrossicon.svg'
import tr_editIcon from '../../../assets/Icons/tableEditIcon.svg'
import tr_deleteIcon from '../../../assets/Icons/tableDelete.svg'
import { toast } from 'react-toastify';
import InvoiceAdvFilter from './InvoiceAdvFilter';
import { useDispatch } from 'react-redux';


interface invoiceLists {
    id: string |number
    invoice_number: string,
    total_amount: number,
    grand_total:number,
    customer: { customer_name: string,balance_due:number },
    status: string,
    due_date: string,
    created_at:string,
    amount_received:number
}
function InvoiceList(){
    
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<'Paid' | 'unpaid' | 'Advance' | 'All'>('All');
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [invoiceLists, setInvoiceLists] = useState<invoiceLists[]>([])
    const [activeActionIndex, setActiveActionIndex] = useState<number | null>(null);
    const [allInvoices, setAllInvoices] = useState<any[]>([]);
    const [filteredInvoices, setFilteredInvoices] = useState<any[]>([]);
const [advancedFilter,setAdvancedFilter]=useState<boolean>(false)

const renderInvTableActions = (index: number) => {
  setActiveActionIndex(prevIndex => (prevIndex === index ? null : index));
};


    const actionRef=useRef<HTMLDivElement|null>(null)

    useEffect(()=>{
        const handleClickoutside=(e:MouseEvent)=>{
            if(actionRef.current&&!actionRef.current.contains(e.target as Node)){
                setActiveActionIndex(null)
            }
        }
          if(activeActionIndex !==null){
                document.addEventListener("mousedown",handleClickoutside)

            }
            if(activeActionIndex==null){
                document.removeEventListener("mousedown",handleClickoutside)
            }

    },[activeActionIndex])

   const applyFilters = () => {
    let filtered = allInvoices;

    const normalizedStatus = statusFilter.toLowerCase();

    if (statusFilter !== 'All') {
        filtered = filtered.filter(inv =>
            inv.status?.toLowerCase() === normalizedStatus
        );
    }
    if (searchTerm) {
        filtered = filtered.filter(row =>
            row.customer?.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.invoice_number.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    setFilteredInvoices(filtered);
};
const location=useLocation()


useEffect(() => {
  fetchInvoice()
    .then((res) => {
      setAllInvoices(res.data.data);
      setFilteredInvoices(res.data.data);
    })
    .catch((err) => console.log('invoice fetch Error', err));
}, [location.state?.refresh]);
    useEffect(() => {
        applyFilters();
        setCurrentPage(1); 
    }, [searchTerm, statusFilter, allInvoices]);

    const handleStatusChange = (status: 'Paid' | 'unpaid' | 'Advance' | 'All') => {
        setStatusFilter(status);
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const handleRowsPerPageChange = (num: number) => {
        setRowsPerPage(num);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter('All');
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

    const totalPages = Math.ceil(filteredInvoices.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentTableData = filteredInvoices.slice(startIndex, endIndex);

    
    const handleDeleteInvoice = (id: number) => {
  const delinvconfirm = window.confirm("Do you really want to delete the invoice?");
  if (delinvconfirm) {
    deleteInvoice(id)
      .then(() => {
        const updatedList = allInvoices.filter(inv => inv.id !== id);
        setAllInvoices(updatedList);
        setFilteredInvoices(updatedList);
        toast.success("invoice deleted successfully")
      })
      .catch((err) => {
        console.error('Delete failed', err);
        toast.error("failed to delete invoice");
      });
  }
};
const [filtereddata, setfiltereddata] = useState({
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

const applyAdvancedFilter = () => {
  const filtered = allInvoices.filter((fil) => {
    const createdAt = new Date(fil.created_at);
    const invoiceBalance = Number(fil.balance_due) || 0;
    const min = Number(filtereddata.balanceMin) || 0;
    const max = Number(filtereddata.balanceMax) || 0;

    const matchesCreatedBetween =
      (!filtereddata.createdBtwFrom || createdAt >= new Date(filtereddata.createdBtwFrom)) &&
      (!filtereddata.createdBtwTo || createdAt <= new Date(filtereddata.createdBtwTo));

    const matchesBalanceRange =
      (!filtereddata.balanceMin || invoiceBalance >= min) &&
      (!filtereddata.balanceMax || invoiceBalance <= max);

    return (
      matchesCreatedBetween &&
      (!filtereddata.name || fil.customer?.customer_name?.toLowerCase().includes(filtereddata.name.trim().toLowerCase())) &&
      (!filtereddata.mobile || fil.customer?.phone?.toLowerCase().includes(filtereddata.mobile.trim().toLowerCase())) &&
      (!filtereddata.mail || fil.customer?.email?.toLowerCase().includes(filtereddata.mail.trim().toLowerCase())) &&
      (!filtereddata.customer_type || fil.customer?.customer_type?.toLowerCase().includes(filtereddata.customer_type.trim().toLowerCase())) &&
      (!filtereddata.invoice_date || fil.invoice_date?.slice(0, 10) === filtereddata.invoice_date.trim()) &&
      (!filtereddata.due_date || fil.due_date?.slice(0, 10) === filtereddata.due_date.trim()) &&
      (!filtereddata.status || fil.status?.toLowerCase().includes(filtereddata.status.trim().toLowerCase())) &&
      matchesBalanceRange
    );
  });
  setFilteredInvoices(filtered);
};




    return (
        <div className="invoice-list-container">
            <div className="invoice-header">
                <h2>Invoice</h2>
                <div className="invoice-header-actions">
                    <div className="search-filter-section">
                        {(searchTerm || statusFilter !== 'All') && (
                            <span className="clear-filters" onClick={handleClearFilters}>
                                <img src={clearFilterIcon} /> Clear Filters
                            </span>
                        )}
                        <div className="search-box">
                            <img src={searchIcon} alt="" />
                            <input type="search" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
                        </div>
                        <div className="status-dropdown-select">
                            <select
                                value={statusFilter}
                                onChange={(e) => handleStatusChange(e.target.value as 'Paid' | 'unpaid' | 'Advance' | 'All')}
                                style={{ padding: '8px', width: "2%", backgroundColor: "var(--whitebg)", color: "var(--color-warning-text)", border: '1px solid #ccc', fontSize: "14px", borderRadius: '4px', minWidth: '100px', outline: "none" }}>
                                <option value="All">All</option>
                                <option value="Paid">Paid</option>
                                <option value="unpaid">Unpaid</option>
                                <option value="Advance">Advance</option>
                            </select>
                        </div>
                        <div className='advanced-filter' onClick={()=>setAdvancedFilter(!advancedFilter)}>
                            <img src={filterIcon}  alt="" />
                        </div>
                    </div>
                    <div className="action-buttons">
                        <Link to='/createInvoice' className="create-invoice-btn">
                            Create Invoice <img src={addicon} />
                        </Link>
                        <button className="options-btn">
                            <SlOptions />
                        </button>
                    </div>
                </div>
            </div>
            <div className="invoice-table-section">
                <table>
                    <thead>
                        <tr style={{ backgroundColor: "var(--whitebg)" }}>
                            <th style={{ cursor: "pointer" }}><img src={threedotselector} /></th>
                            <th>S.No</th>
                            <th>Date</th>
                            <th>Invoice No.</th>
                            <th>Customer Name</th>
                            <th style={{ textAlign: "center" }}>Status</th>
                            <th>Due Date</th>
                            <th>Amount</th>
                            <th style={{ textAlign: "center" }}>Balance Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTableData.map((row, index) => (
                            <tr key={row.id} style={{ position: "relative" }}>
                                <td  style={{ cursor: "pointer", position: "relative" }}>
                                    
                                    {activeActionIndex === index?(
                                        <div className='inv-table-actions' ref={actionRef}>
                                           <img src={tr_closeIcon} onClick={() => renderInvTableActions(index)} alt="" />
                                           <div className='inv-table-action-icons'>
                                          <Link className='d-flex gap-1 p-2 tableActionLinks' to={`/Editinvoice/${row.id}`}><img src={tr_editIcon} alt="" /> Edit</Link>  
                                          <span  onClick={()=>handleDeleteInvoice(row.id)} className='d-flex gap-1 p-2 tableActionLinks'> <img  src={tr_deleteIcon} alt="" /> Delete</span>
                                           </div>
                                        </div>
                                    ):<img src={threedotselector} onClick={() => renderInvTableActions(index)} />}
                                </td>
                                <td>{startIndex + index + 1}</td>
                                <td>{row.created_at.slice(0, 10)}</td>
                                <td><Link className='Link-tag' to={`/viewInvoice/${row.id}`}>{row.invoice_number}</Link></td>
                                <td>{row.customer?.customer_name}</td>
                                <td style={{ textAlign: "center" }}>
                                    <span className={`status-badge status-${row.status?.toLowerCase().replace(/\s+/g, "-")}`}> {row.status?.toUpperCase()}</span>
                                </td>
                                <td>{row.due_date.slice(0, 10)}</td>
                                <td>₹ {row.grand_total}</td>
                                <td style={{ textAlign: "center" }} className={row.total_amount !== 0 ? "balance-due-red" : ""}>₹ {(row.customer.balance_due).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="invoice-pagination">
                <div className="rows-per-page">
                    <div>
                        <span>Rows per page:
                            <select className='rows-per-page-drop' value={rowsPerPage} onChange={(e) => handleRowsPerPageChange(Number(e.target.value))} style={{ marginLeft: '8px', padding: '4px', border: 'none', borderRadius: '4px', outline: "none" }}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </span>
                    </div>
                </div>
                <div className="pagination-info">
                    <span>{startIndex + 1}-{Math.min(endIndex, filteredInvoices.length)} OF {filteredInvoices.length}</span>
                </div>
                <div className="pagination-controls">
                    <IoIosArrowBack
                        onClick={handlePreviousPage}
                        style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }} />
                    <IoIosArrowForward
                        onClick={handleNextPage}
                        style={{ cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1 }} />
                </div>
            </div>
              {advancedFilter && (
  <InvoiceAdvFilter
    advancedFilter={advancedFilter}
    setFilteredInvoices={setFilteredInvoices}
    setAdvancedFilter={setAdvancedFilter}
    applyAdvancedFilter={applyAdvancedFilter}
    filtereddata={filtereddata}
     allInvoices={allInvoices}
     setAllInvoices={setAllInvoices}
    setfiltereddata={setfiltereddata}
  />
)} 
</div>
    )
}
export default InvoiceList





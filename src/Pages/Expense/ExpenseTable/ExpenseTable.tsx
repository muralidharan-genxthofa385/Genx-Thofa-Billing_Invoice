import React, { useEffect, useState } from 'react'
import './ExpenseTable.css'
import clearFilterIcon from '../../../assets/Icons/clearFilterIcon.svg'
import searchIcon from '../../../assets/Icons/searchicon.svg'
import advancedFilted from '../../..//assets/Icons/advancedFiletricon.svg'
import { IoAdd } from "react-icons/io5";
import threedotoption from '../../../assets/Icons/threedotoption.svg'
import threedotselector from '../../../assets/Icons/threedotselector.svg'
import { Link } from 'react-router-dom'
import { getExpences,deleteExpense } from '../../../service/ExpensesService'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import tr_editIcon from '../../../assets/Icons/tableEditIcon.svg';
import tr_deleteIcon from '../../../assets/Icons/tableDelete.svg';
import tr_closeIcon from '../../../assets/Icons/closecrossicon.svg';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

interface expenseTableData{
   id:number,
    amount:number,
    category:{name:string},
    expense_date:string,
    vendor_name:string
}

function ExpenseTable() {

    const [expenseTableData,setexpenseTableData]=useState<expenseTableData[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalItems,setTotalitems]=useState(0);
    const [lastPage,setLastPage]=useState(1)
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();


   const filteredData = (expenseTableData || []).filter(expense =>
  expense?.vendor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  expense?.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
);


    const totalPages = lastPage;
const startIndex = (currentPage - 1) * rowsPerPage;

const paginatedData = filteredData;

    const handleRowsPerPageChange = (value: number) => {
      setRowsPerPage(value);
      setCurrentPage(1);
    };
    const handlePreviousPage = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    const handleNextPage = () => {
setCurrentPage((prev) => Math.min(prev + 1, lastPage));
    };

    const [activeActionIndex, setActiveActionIndex] = useState<number | null>(null);

    const renderExpTableActions = (index: number) => {
      setActiveActionIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const getActionMenuStyle = (index: number) => {
      const isNearBottom = index >= paginatedData.length - 2;
      return {
        top: isNearBottom ? 'auto' : '109%',
        bottom: isNearBottom ? '109%' : 'auto',
        right: '-113px'
      };
    };

    const handleDeleteExpense = (id: number) => {
      const confirmDelete = window.confirm('Do you really want to delete this expense?');
      if (confirmDelete) {
        deleteExpense(id)
          .then(() => {
            setexpenseTableData(prev => prev.filter(expense => expense.id !== id));
            toast.success('Expense deleted successfully');
          })
          .catch((err) => {
            console.log(err);
            toast.error('Failed to delete expense');
          });
      }
    };
    

  useEffect(() => {
  fetchExpenses(currentPage, rowsPerPage);
}, [currentPage, rowsPerPage]);

const fetchExpenses = (page: number, perPage: number) => {
  getExpences()
    .then((res) => {
      setexpenseTableData(res.data);
      setTotalitems(res.meta.total);
      setLastPage(res.meta.last_page);
    })
    .catch((err) => console.log(err));
};


  return (
    <>
    <div className='expense-Table-Overall'>
<div className="expenseTableHeadder">
    <h3 className='expense-headder-heading'>Expenses</h3>

    <div className="expenseTable-Filter-Container">
        {searchTerm && (
          <label className='clear-filter-span' onClick={() => setSearchTerm('')} style={{cursor: 'pointer'}}><img src={clearFilterIcon} alt="" />Clear Filter</label>
        )}
        <label htmlFor="" className='expense-Table-searchbar-label'><img src={searchIcon}/> <input type="search"
         placeholder='Search in customer' className='expense-Table-searchbar' value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}/></label>
         {/* <img src={advancedFilted} style={{cursor:"pointer"}}/> */}
         <Link to={`/expensesAdd`} className='addExpenseButton'>Add Expense <IoAdd className='addicon'/></Link>
 <img src={threedotoption} style={{cursor:"pointer"}}/>
    </div>
</div>

<div className="expenseTable-Container">
    <table className='expense-table '>
        <thead>
            <tr className='expense-table-headder-row'>
                <th style={{width:"1%"}}><img src={threedotselector} alt="" /></th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
           {paginatedData.map((expense, index) => (
             <tr className='expense-table-details-row' key={startIndex + index}>
               <td style={{position:"relative", width:"1%", cursor:"pointer"}}>
                 {activeActionIndex === index ? (
                   <div className='exp-table-actions'>
                     <div className='exp-table-action-icons'>
                       <img src={tr_closeIcon} className='close-icon' onClick={() => renderExpTableActions(index)} alt="" />
                       <div className='table-ed-del-cont-container' style={getActionMenuStyle(index)}>
                         <span className='table-ed-del-cont'>
                           <Link style={{textDecoration:"none"}} to={`/expensesEdit/${expense.id}`}>
                             <img src={tr_editIcon} alt="" /> <span className='drag-itms'>Edit</span>
                           </Link>
                           <label onClick={() => handleDeleteExpense(expense.id)}>
                             <img src={tr_deleteIcon} alt="" /> <span className='drag-itms'>Delete</span>
                           </label>
                         </span>
                       </div>
                     </div>
                   </div>
                 ) : (
                   <img src={threedotselector} onClick={() => renderExpTableActions(index)} />
                 )}
               </td>
               <td><Link className='Expense-customerName' to={`/expensesView/${expense.id}`}>{expense.vendor_name}</Link></td>
               <td>{expense.expense_date.slice(0,10)}</td>
               <td>{expense.category.name}</td>
               <td>₹ {Number(expense.amount)}</td>
             </tr>
           ))}
        </tbody>

    </table>
</div>

<div className="invoice-pagination">
  <div className="rows-per-page">
    <div>
      <span className='d-flex gap-0'>Rows per page:
        <select className='rows-per-page' value={rowsPerPage} onChange={(e) => handleRowsPerPageChange(Number(e.target.value))} style={{backgroundColor:"transparent", marginLeft: '8px', padding: '4px', border: 'none', borderRadius: '4px', outline: "none" }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </span>
    </div>
  </div>
  <div className="pagination-info">
<span>
{filteredData.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)}
</span>
  </div>
  <div className="pagination-controls">
    <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{backgroundColor:"transparent", border:"none",cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}><FaChevronLeft/></button>
    <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0} style={{backgroundColor:"transparent",border:"none",cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1 }}><FaChevronRight/></button>
  </div>
</div>

    </div>
    </>
  )
}

export default ExpenseTable
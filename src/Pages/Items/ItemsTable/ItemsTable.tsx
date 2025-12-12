import React, { useEffect, useState } from 'react'
import './ItemsTable.css'
import clearFilterIcon from '../../../assets/Icons/clearFilterIcon.svg'
import searchIcon from '../../../assets/Icons/searchicon.svg'
import { Link } from 'react-router-dom'
import { IoAdd } from "react-icons/io5";
import threedotoption from '../../../assets/Icons/threedotoption.svg'
import advancedFilted from '../../..//assets/Icons/advancedFiletricon.svg'
import threedotselector from '../../../assets/Icons/threedotselector.svg'
import { ItemsGet, deleteItem } from '../../../service/InvoiceItemsService'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import tr_editIcon from '../../../assets/Icons/tableEditIcon.svg';
import tr_deleteIcon from '../../../assets/Icons/tableDelete.svg';
import tr_closeIcon from '../../../assets/Icons/closecrossicon.svg';
import { toast } from 'react-toastify';


interface itemsList{
    id:number,
item_name:string,
item_type:string,
total_amount:number
}


function ItemsTable() {

    const [itemsTableList,setItemsTableList]=useState<itemsList[]|[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [activeActionIndex, setActiveActionIndex] = useState<number | null>(null);
    const [clearSearch,setClearSearch]=useState(false);
    const [tableSearch,setTableSearch]=useState('')

    const filteredItems = itemsTableList.filter((filItem: any) =>
  filItem.item_name.toLowerCase().includes(tableSearch.toLowerCase()) ||
  filItem.item_type.toLowerCase().includes(tableSearch.toLowerCase()) ||
  filItem.total_amount.toLowerCase().includes(tableSearch.toLowerCase())
);

    // Pagination should be based on filteredItems, not itemsTableList
    const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredItems.slice(startIndex, endIndex);

    const handleRowsPerPageChange = (value: number) => {
      setRowsPerPage(value);
      setCurrentPage(1);
    };
    const handlePreviousPage = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    const handleNextPage = () => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const renderItemTableActions = (index: number) => {
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
    const handleDeleteItem = (id: number) => {
      const confirmDelete = window.confirm('Do you really want to delete this item?');
      if (confirmDelete) {
        deleteItem(id)
          .then(() => {
            setItemsTableList(prev => prev.filter(item => item.id !== id));
            toast.success('Item deleted successfully');
          })
          .catch((err) => {
            console.log(err);
            toast.error('Failed to delete item');
          });
      }
    };
    useEffect(()=>{
        ItemsGet()
        .then(res=>{
            console.log(res)
            setItemsTableList(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

  return (
    <>
<div className="itemstable-overall">
    <div className="expenseTableHeadder d-flex w-100" style={{gap:"42%"}}>
        <h3 className='expense-headder-heading' style={{width:"30%"}}>Items</h3>
            <div className="expenseTable-Filter-Container" style={{width:"80%",paddingLeft:"12%"}}>
        {tableSearch&&<label className='clear-filter-span' onClick={()=>setTableSearch('')}><img src={clearFilterIcon} alt="" />Clear Filter</label>}

        <label htmlFor="" className='expense-Table-searchbar-label'><img src={searchIcon}/>
         <input type="search" placeholder='Search in customer' value={tableSearch} onChange={e=>setTableSearch(e.target.value)} className='expense-Table-searchbar' /></label>
         {/* <img src={advancedFilted} style={{cursor:"pointer"}}/> */}
         <Link to={`/ItemsAdd`} className='addExpenseButton addItembtn'>Add Item <IoAdd className='addicon'/></Link>
 <img src={threedotoption} style={{cursor:"pointer"}}/>
    </div>
    </div>

<div className="items-table-container mt-5 " style={{border:"1px solid var(--color-border)",borderRadius:"8px"}}>
    <table>
        <thead>
           <tr className='expense-table-headder-row'>
                <th><img src={threedotselector} alt="" /></th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {paginatedData.map((item,index)=> <tr key={startIndex + index} className='expense-table-details-row'>
                <td style={{position:"relative", width:"1%", cursor:"pointer"}}>
                  {activeActionIndex === index ? (
                    <div className='exp-table-actions'>
                      <div className='exp-table-action-icons'>
                        <img src={tr_closeIcon} className='close-icon' onClick={() => renderItemTableActions(index)} alt="" />
                        <div className='table-ed-del-cont-container' style={getActionMenuStyle(index)}>
                          <span className='table-ed-del-cont'>
                            <Link style={{textDecoration:"none"}} to={`/ItemsEdit/${item.id}`}>
                              <img src={tr_editIcon} alt="" /> <span className='drag-itms'>Edit</span>
                            </Link>
                            <label onClick={() => handleDeleteItem(item.id)}>
                              <img src={tr_deleteIcon} alt="" /> <span className='drag-itms'>Delete</span>
                            </label>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={threedotselector} onClick={() => renderItemTableActions(index)} />
                  )}
                </td>
                <td><Link className='Expense-customerName' to={`/ItemsView/${item.id}`}>{item.item_name}</Link></td>
                <td>{item.item_type}</td>
                <td>	₹  {item.total_amount}</td>
            </tr>)}
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
    <span>{filteredItems.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, filteredItems.length)} OF {filteredItems.length}</span>
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

export default ItemsTable
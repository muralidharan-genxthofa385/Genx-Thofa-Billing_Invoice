import React, { useEffect, useState } from 'react'
import './createExpense.css'
import { useNavigate, useParams } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getExpences } from '../../../service/ExpensesService'
import editPencil from '../../../assets/Icons/editPencilIcon.svg'
import dustbinDelete from '../../../assets/Icons/deleteDustbinIcon.svg'
import { deleteExpense } from '../../../service/ExpensesService';
import { toast } from 'react-toastify';
import { fetchInvoice } from '../../../service/invoiceService';


interface expensesData{
    id: number,
    vendor_name:string,
    category:{name:string},
    expense_date:string,
    amount:string
}

function ExpenseView() {

    const {id}=useParams()
const [expenseView, setExpenseView] = useState<expensesData|null>(null);
const navigate=useNavigate()

    useEffect(()=>{
        getExpences()
        .then((res)=>{
             const selectedCustomer = res.data.find((cust: any) => String(cust.id) === id);
             setExpenseView(selectedCustomer)
    console.log(res)
    })
        .catch((err)=>console.log("fetcherr",err))
    },[id])

    const deleteInstExpense=()=>{
        const deleteExConfirm=window.confirm("do you want to delete this expense?")
        if(deleteExConfirm){
            deleteExpense(Number(id))
            .then((res)=>{
                toast.success("expense Deleted Successfully")
                navigate('/expenses')
            })
            .catch((err)=>{
                toast.error("failed to delete expense")
                console.log(err)
            })
        }
    }
   
    // useEffect(()=>{
    //     fetchInvoice()
    //     .then((res)=>{
    //         console.log(res)
    //     })
    //     .catch()
    // })

  return (
    <div>
    <div className='expenses-nav-container'>    
        <Link to={`/expenses`} className='newExpenseHeading'><FaChevronLeft/>New Expense</Link>
        <div className='d-flex gap-3'>
 <img style={{cursor:"pointer"}} src={dustbinDelete} onClick={deleteInstExpense} alt="" />
    <Link className='EditExpenses' to={`/expensesEdit/${id}`}>Edit <img src={editPencil} alt="" /></Link>
        </div>
    </div>
 
<div className="new-expwnses-row pt-5">
    <div className="new-expwnses-row-left">
<label htmlFor="" className='expenses-label'>
    Customer Name
<input type="text" style={{backgroundColor:"var(--color-border-light)"}} className='expenses-input' value={expenseView?.vendor_name || ""} readOnly />

</label>
    </div>
    <div className="new-expwnses-row-right">
        <label htmlFor="" className='expenses-label'>
   Expense Amount
<input type="text" className='expenses-input' style={{backgroundColor:"var(--color-border-light)"}}  value={`₹ ${expenseView?.amount}`} placeholder='Full Name Or company Name' readOnly/>
</label>

    </div>
</div>

<div className="new-expwnses-row pt-3">
    <div className="new-expwnses-row-left">
<label htmlFor="" className='expenses-label'>
    Date
<input type="text" className='expenses-input' style={{backgroundColor:"var(--color-border-light)"}} value={expenseView?.expense_date.slice(0,10)||""} readOnly placeholder='Full Name Or company Name'/>
</label>
    </div>
    <div className="new-expwnses-row-right">
        <label htmlFor="" className='expenses-label'>
    Category
<input type="text" className='expenses-input' style={{backgroundColor:"var(--color-border-light)"}} value={expenseView?.category?.name} placeholder='Full Name Or company Name' readOnly/>
</label>

    </div>
</div> 

    </div>
  )
}

export default ExpenseView
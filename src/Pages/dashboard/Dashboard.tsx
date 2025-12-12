import { useEffect, useState } from 'react'
import './dashboard.css'
import expenseout from '../../assets/Icons/expenseOutIcon.svg'
import { fetchInvoice } from '../../service/invoiceService';
import { getExpences } from '../../service/ExpensesService';
import { CgDanger } from "react-icons/cg";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";




interface Expense {
  id: number;
  expense_date: string;
  vendor_name: string;
  amount: string;
}
interface RecentInvoice {
  customer_id: number;
  
customer: {
    customer_name: string;
    balance_due:number;
  };
  total_amount: number;
  status: "PAID" | "NOT PAID"|"ADVANCE";
amount_received:string,
grand_total:string
}

function Dashboard() {

const [dashrecentInvoice,setdashrecentInvoice]=useState<RecentInvoice[]>([])

 
useEffect(()=>{
  fetchInvoice()
  .then((res)=>{setdashrecentInvoice(res.data.data)
console.log(res)
  })
  .catch((err)=>console.log(err))
},[])


const [expenseTableData,setexpenseTableData]=useState<Expense[]>([])

useEffect(()=>{
getExpences()
.then((res)=>setexpenseTableData(res.data))
.catch((err)=>console.log(err))

},[])


const TotalDashDisplayAmount = dashrecentInvoice.reduce(
  (total, item) => total + parseFloat(item.grand_total || "0"),
  0
);



const total_paid=dashrecentInvoice.reduce(
  (total, item) => total + parseFloat(item.amount_received || "0"),
  0
);
const totalUnpaid = total_paid >= TotalDashDisplayAmount ? 0 : TotalDashDisplayAmount - total_paid;



return (
  <>
   {<div className='Dashboard-container'>
<h2>Dashboard</h2>
<div className='dash-board-amount-display-container'>
<div className='dash-board-total-display d-flex justify-content-between' style={{height:"100%",alignItems:"center"}}>
  <label><h5>Total Sales</h5> <h1>₹ { TotalDashDisplayAmount.toFixed(2)}</h1></label>
<GiMoneyStack fontSize={50}/>
</div>
<div  className='dash-board-Paid-display d-flex justify-content-between' style={{height:"100%",alignItems:"center"}}>
    <label><h5>Paid</h5> <h1>₹ {total_paid.toFixed(2)}</h1></label>
<GiTakeMyMoney fontSize={50}/>

</div>
<div className='dash-board-unpaid-display d-flex justify-content-between' style={{height:"100%",alignItems:"center"}}>
<label><h5>Unpaid</h5> <h1>₹ {totalUnpaid.toFixed(2)}</h1></label>
<CgDanger fontSize={40}/>
</div>
</div>

<div className="dashboard_tables w-100 pt-5">
<div className="recent-transaction-table">
<h4 className='pb-2'>Recent Invoices</h4>
<div style={{border:"1.5px solid var(--color-border)",borderRadius:"10px"}}><table>
   <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        { dashrecentInvoice.slice(0,5).map((row,index) => (
          <tr key={index}>
            <td style={{padding:"2.7%"}}>{index+1}</td>
            <td>{row.customer?.customer_name}</td>
            <td>₹ {row.total_amount}</td>
            <td style={{width:"max-content"}}>
              <span style={{width:"60%"}} className={
                row.status === "PAID".toLowerCase() ? "status-paid" :
                row.status === "ADVANCE".toLowerCase()  ? "status-advance":row.status === "UNPAID".toLowerCase()  ? "status-notpaid" :""}>
                {row.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
</table>
</div>
</div>

<div className="recent-expenses-table">
  <h4 className='pb-2'>Recent Expenses</h4>
  <div style={{border:"1.5px solid var(--color-border)",borderRadius:"10px"}}>
    <table>
   <thead>
        <tr>
          <th>S.No</th>
          <th>Date</th>
          <th>Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
       {expenseTableData.slice(0,5).map((expense,index) => (
  <tr key={expense.id}>
    <td style={{ padding: "2.7%" }}>{index+1}</td>
    <td>{expense.expense_date.slice(0,10)}</td>
    <td>{expense.vendor_name}</td>
    <td style={{ padding: "0.375rem 1.25rem",fontWeight:"600",color:"var(--color-warning)",alignItems:"center",height:"100%" }}>
      <span> ₹ {expense.amount}</span><img className='' src={expenseout} />
      {/* <span style={expense. === "debit" ? { color: "var(--color-warning)" } : { color: "var(--color-success-dark)" }}>
        ₹ {expense.amount}
        <img src={expense.type === 'debit' ? expenseout : expenseinic} />
      </span> */}
    </td>
  </tr>
))}
      </tbody>
</table></div>
</div>
</div>
    </div>}
    </>
  )
}

export default Dashboard
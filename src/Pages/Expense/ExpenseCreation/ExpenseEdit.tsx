import React, { useEffect, useState } from 'react';
import './createExpense.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { getExpences, UpdateExpense } from '../../../service/ExpensesService';
import { toast } from 'react-toastify';

interface expensesData {
  id: number;
  vendor_name: string;
  category: { name: string };
  expense_date: string;
  amount:number
}

function ExpenseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState<expensesData | null>(null);
useEffect(() => {
  if (id) {
    getExpences()
      .then((res) => {
        const selectedExpense = res.data.find((exp: any) => String(exp.id) === id);
        setExpense(selectedExpense);
      })
      .catch((err) => console.log(err));
  }
}, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!expense) return;

    if (name === "category") {
      setExpense({ ...expense, category: { name: value } });
    } else {
      setExpense({ ...expense, [name]: value });
    }
  };
  
const handleEditExpenseSave = () => {
  if (!expense || !id) return;
  UpdateExpense(id, expense)
    .then(() => {
      toast.success("Expense updated successfully!");
      navigate('/expenses');
    })
    .catch((err) => {
      console.error("Update failed:", err);
      toast.error("Failed to update expense.");
    });
};

  if (!expense) return <div>Loading...</div>;

  return (
    <div>
      <Link to={`/expenses`} className='newExpenseHeading'>
        <FaChevronLeft /> Edit Expense
      </Link>

      <div className="new-expwnses-row pt-5">
        <div className="new-expwnses-row-left">
          
          <label className='expenses-label'>
            Customer Name
            <input
              type="text"
              name="vendor_name"
              className='expenses-input'
              style={{ backgroundColor: "var(--color-border-light)" }}
              value={expense.vendor_name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="new-expwnses-row-right">
           <label className='expenses-label'>
            Expense Amount
            <input
              type="text"
              name="amount"
              className='expenses-input'
              style={{ backgroundColor: "var(--color-border-light)" }}
              value={expense.amount}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <div className="new-expwnses-row pt-3">
        <div className="new-expwnses-row-left">
          <label className='expenses-label'>
            Date
            <input
              type="date"
              name="expense_date"
              className='expenses-input'
              style={{ backgroundColor: "var(--color-border-light)" }}
              value={expense.expense_date.slice(0,10)}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="new-expwnses-row-right">
          <label className='expenses-label'>
            Category
            <input
  type="text"
  name="category"
  className='expenses-input'
  style={{ backgroundColor: "var(--color-border-light)" }}
  value={expense.category?.name || ''}
  onChange={handleChange}
/>

          </label>
        </div>
      </div>

      <div className='customers-view-buttons'>
        <button onClick={handleEditExpenseSave}>Save</button>
        <button onClick={() => navigate('/expenses')}>Cancel</button>
      </div>
    </div>
  );
}

export default ExpenseEdit;

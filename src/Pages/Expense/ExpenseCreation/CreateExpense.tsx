import React, { useEffect, useState } from 'react'
import './createExpense.css'
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { createCategory, getExpences, getExpenseCategories, postExpense } from '../../../service/ExpensesService';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';




function CreateExpense(){

    const [categoryOptions, setCategoryOptions] = useState<{ value: string, label: string }[]>([]);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState<any>(null);
  const [customerName, setCustomerName] = useState('');
  const [ExpenseAmount,setExpenseAmount]=useState('')
const [expenseDate, setExpenseDate] = useState('');
const [notes, setNotes] = useState('');
const navigate=useNavigate()
    
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    padding: '8px 12', 
    borderRadius: '4px',
    border: '1px solid var(--color-border)',
    fontWeight: 100,
    fontSize: '14px',
    outline: 'none',
    minHeight: 'unset',
    boxShadow: 'none', 
    '&:hover': {
      borderColor: 'var(--color-border)'
    }
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: '8px 12px'
  }),
  input: (provided: any) => ({
    ...provided,
    margin: 0,
    padding: 0
  })
};
   
useEffect(() => {
  getExpenseCategories()
    .then((res) => {
      const formatted = res.data.map((category: any) => ({
        value: category.id,      
        label: category.name     
      }));
      setCategoryOptions(formatted);
    
    })
    .catch((err) => {
      console.error('Error fetching categories:', err);
      toast.error('Failed to load categories');
    });
}, []);


   const handleCreateExpenseSubmit = (e: React.FormEvent) => {
  e.preventDefault();

const expenseData = {
 vendor_name: customerName,
  expense_date: expenseDate,
  expense_category_id: selectedCategoryOption?.value,
  notes: notes, 
  amount: ExpenseAmount
};
  postExpense(expenseData)
    .then(() => {
      toast.success("Expense saved successfully!");
      navigate('/expenses', { state: { shouldRefresh: true } });
      console.log(expenseData)
    })
    .catch((err) => {
    if (!customerName || !expenseDate || !selectedCategoryOption || !ExpenseAmount) {
  toast.error("Please fill all required fields");
  return;
}

      console.log(err)
    });
};

    
   const handleCreateCategory = (inputValue: string) => {
  createCategory(inputValue)
    .then((res) => {
      const newCategory = { value: res.data.id, label: res.data.name };
      setCategoryOptions((prev) => [...prev, newCategory]);
      setSelectedCategoryOption(newCategory);
      toast.success('Category created');
    })
    .catch((err) => {
      toast.error('Failed to create category');
      console.error(err);
    });
};



  return (
    <div>
<Link to={`/expenses`} className='newExpenseHeading'><FaChevronLeft/>New Expense</Link>

<div className="new-Expenses-Form-container">

    <form action="" onSubmit={handleCreateExpenseSubmit} className='new-Expenses-Form'>

<div className="new-expwnses-row">
    <div className="new-expwnses-row-left">
<label htmlFor="" className='expenses-label'>
    Customer Name
<input type="text"  value={customerName} onChange={(e) => setCustomerName(e.target.value)} className='expenses-input' placeholder='Full Name Or company Name'/>
</label>
    </div>
    <div className="new-expwnses-row-right">
        <label htmlFor="" className='expenses-label'>
   Expense Amount
<input type="number" value={ExpenseAmount} onChange={(e)=>setExpenseAmount(e.target.value)} className='expenses-input' placeholder='Enter Expense Amount'/>
</label>
</div>
</div>

<div className="new-expwnses-row pt-3">
    <div className="new-expwnses-row-left">
<label htmlFor="" className='expenses-label'>
Date
<input type="date"  value={expenseDate}  onChange={(e) => setExpenseDate(e.target.value)} className='expenses-input' placeholder='Full Name Or company Name'/>
</label>
    </div>
    <div className="new-expwnses-row-right">
<label htmlFor="" className='expenses-label'>
    Category
  <CreatableSelect
        className='expenses-input'
        value={selectedCategoryOption}
        onChange={setSelectedCategoryOption}
        onCreateOption={handleCreateCategory}
        options={categoryOptions}
        placeholder="Select or type a category"
        styles={customStyles}
      />
</label>
    </div>

</div>

<div className='new-expwnses-row pt-3'>
    <div className="new-expwnses-row-left">
    <label htmlFor="" className='expenses-label'>
        Notes
<textarea value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder='enter your notes'></textarea>
    </label>
</div>
</div>

<div className="new-expenses-button-container">
    <button type='submit'>Save</button>
    <button onClick={()=>navigate('/expenses')}>Cancel</button>
</div>
    </form>
</div>



</div>
  )
}

export default CreateExpense
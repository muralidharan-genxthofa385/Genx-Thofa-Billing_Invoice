import React, { useState } from 'react';
import './AddnewItems.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from 'react-select';
import FormControl from '@mui/material/FormControl';
import { ItemsPost } from '../../../service/InvoiceItemsService';
import { toast } from 'react-toastify';




function AddnewItem() {
  const [itemType, setItemType] = useState<'PRODUCT' | 'SERVICE'>('PRODUCT');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [taxPreference, setTaxPreference] = useState<{ value: string; label: string} | null>(null);
 const [withinStateTax, setWithinStateTax] = useState<{ value: number; label: string} | null>(null);
const [crossStateTax, setCrossStateTax] = useState<{ value: number; label: string } | null>(null);
  const [itemDescription, setItemDescription] = useState('');

  const selecttaxOptions = [
    { value: 'Taxable', label: 'Taxable' },
    { value: 'Non-Taxable', label: 'Non - Taxable' },
    { value: 'Out of Scope', label: 'Out of Scope' },
  ];
  const withinStateOptions = [
  { value: 0.0, label: 'GST 0 (0%)' },
  { value: 5.0, label: 'GST 5 (5%)' },
  { value: 12.0, label: 'GST 12 (12%)' },
  { value: 18.0, label: 'GST 18 (18%)' },
  { value: 28.0, label: 'GST 28 (28%)' },
];

const crossStateOptions = [
  { value: 0.0, label: 'IGST (0%)' },
  { value: 5.0, label: 'IGST (5%)' },
  { value: 12.0, label: 'IGST (12%)' },
  { value: 18.0, label: 'IGST (18%)' },
  { value: 28.0, label: 'IGST (28%)' },
];

const handlePostNewItem=(e:React.FormEvent)=>{
  e.preventDefault();
const payloadItemsData = {
  item_name: itemName,
  item_type: itemType.toLowerCase(), 
  is_header: false,
  header_title: '', 
    quantity: parseFloat(itemQuantity),
  description: itemDescription,
  unit_price: parseFloat(itemPrice),
  tax_preference: taxPreference?.value.toLowerCase(),
  within_state_tax_rate: withinStateTax?.value,
  cross_state_tax_rate: crossStateTax?.value,
};
console.log(withinStateTax)
console.log(crossStateTax)


ItemsPost(payloadItemsData)
.then(()=>{
  toast.success("item added successfully");
   setItemName('');
      setItemPrice('');
      setTaxPreference(null);
      setWithinStateTax(null);
      setCrossStateTax(null);
      setItemDescription('');
})
   .catch((err) => {
      console.error(err);
      toast.error('Failed to post item');
      if (!itemName || !itemPrice || !taxPreference) {
  toast.error("Please fill all required fields.");
  return;
}
    });
}

const navigate=useNavigate()
  return (
    <>
    <Link className='new-item-head' to={`/Items`} ><FaChevronLeft/> New Item</Link>

<div className='createnew-item-form-container pt-5'>

<label htmlFor="" className="d-flex flex-column" style={{gap:"0.75rem"}}> <span className="customer-type-label">Customer Type</span>
     <FormControl >
      <RadioGroup
  value={itemType}
  onChange={(e) => setItemType(e.target.value as 'PRODUCT' | 'SERVICE')}
  name="item-type"
>
  <div className='d-flex'>
  <FormControlLabel value="PRODUCT" sx={{'& .MuiFormControlLabel-label': { color: 'var(--color-black)',fontWeight: '600',fontSize: '14px',},}} control={<Radio size="small" />}   label="PRODUCT" />
  <FormControlLabel value="SERVICE" sx={{'& .MuiFormControlLabel-label': { color: 'var(--color-black)',fontWeight: '600',fontSize: '14px',},}} control={<Radio size="small" />}   label="SERVICE" />
</div>
</RadioGroup>
    </FormControl>
    </label>
  
         <div className="new-expwnses-row pt-5">
        <div className="new-expwnses-row-left">
          
          <label className='expenses-label'>
            Item Name
            <input  type="text" className='expenses-input' value={itemName} onChange={e=>setItemName(e.target.value)} placeholder='enter item name' />
          </label>
        </div>

        <div className="new-expwnses-row-right">
           <label className='expenses-label'>
            Item Price
            <input  type="number" placeholder='enter item price' value={itemPrice} onChange={(e)=>setItemPrice(e.target.value)} className='expenses-input'/>
          </label>
        </div>
      </div>
       <div className="new-expwnses-row pt-2">
        <div className="new-expwnses-row-left">
          <label className='expenses-label'>
            Tax Preference
            <Select className="expenses-input"  options={selecttaxOptions} value={taxPreference} onChange={setTaxPreference}
        placeholder="Select tax preference"
        isClearable
      />
          </label>
        </div>

        <div className="new-expwnses-row-right  d-flex gap-2">
            {taxPreference?.value==='Taxable'?<><label className='expenses-label'>
    Within-state tax rate
    <Select className="expenses-input"  options={withinStateOptions}  value={withinStateTax}  onChange={setWithinStateTax}  placeholder="Select tax rate"  isClearable
     styles={{ container: (base) => ({ ...base, width: '309px' ,fontSize:"14px",fontWeight:"400px" })}} />
  </label>
  <label className='expenses-label'>
    Cross-state tax rate
    <Select className="expenses-input"  options={crossStateOptions}
      value={crossStateTax} onChange={setCrossStateTax} placeholder="Select tax rate" isClearable
     styles={{ container: (base) => ({ ...base, width: '309px',fontSize:"14px",fontWeight:"400px"  })}}/>
  </label></>:null}
        </div>
      </div>
  <div className='pt-2 ' style={{width:"48%",paddingBottom:"5%"}}>
    <div className="new-expwnses-row-right w-100">
    <label className='item-quantity-expenses-label expenses-label'>
            Item Quantity
            <input  type="number" placeholder='enter item price' value={itemQuantity} onChange={(e)=>setItemQuantity((e.target.value))} className='expenses-input'/>
          </label>
</div>
      <label className='expenses-label '>
                Item Description
    <textarea placeholder='enter item description' value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} name="" id=""></textarea>
               </label>

        </div>
        <div className='customers-view-buttons'>
        <button onClick={handlePostNewItem}>Save</button>
        <button onClick={()=>navigate('/Items')}>Cancel</button>
      </div>
</div>

    </>
   
  );
}

export default AddnewItem;
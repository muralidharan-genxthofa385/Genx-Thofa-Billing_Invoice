import React, { useEffect, useState } from 'react';
import '../AddNewItems/AddnewItems.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from 'react-select';
import FormControl from '@mui/material/FormControl';
import { ItemsGet, ItemsPut } from '../../../service/InvoiceItemsService';
import { toast } from 'react-toastify';

interface editableItemData{
     id: number,
   item_name:string,
item_type:string,
total_amount:number,
within_state_tax_rate:number,
cross_state_tax_rate:number,
tax_preference:string,
description:string,

}

function ItemsEdit() {

  const {id}=useParams();
  const navigate=useNavigate();
  const[itemsContainer,setItemsContainer]=useState<editableItemData | null>(null)

  useEffect(() => {
  if (id) {
    ItemsGet()
      .then((res) => {
        const selectedItem = res.data.find((item: any) => String(item.id) === id);
        setItemsContainer(selectedItem);
      })
      .catch((err) => console.log('fetch-item-error', err));
  }
}, [id]);


  useEffect(() => {
  if (itemsContainer) {
    setItemName(itemsContainer.item_name);
    setItemType(itemsContainer.item_type as 'PRODUCT' | 'SERVICE');
    setItemPrice(itemsContainer.total_amount.toString());
  setWithinStateTax({ 
  value: itemsContainer.within_state_tax_rate, 
  label: `GST ${itemsContainer.within_state_tax_rate} (${itemsContainer.within_state_tax_rate}%)` 
});

setCrossStateTax({ 
  value: itemsContainer.cross_state_tax_rate, 
  label: `IGST ${itemsContainer.cross_state_tax_rate} (${itemsContainer.cross_state_tax_rate}%)` 
});
    setItemDescription(itemsContainer.description);
  }
}, [itemsContainer]);

  
  const [itemType, setItemType] = useState<'PRODUCT' | 'SERVICE'>('PRODUCT');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [taxPreference, setTaxPreference] = useState<{ value: string; label: string } | null>(null);
 const [withinStateTax, setWithinStateTax] = useState<{ value: number; label: string } | null>(null);
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

const handleEdittemsSave = () => {
  if (!id) return;

const updatedItem = {
  id: Number(id),
  item_name: itemName,
  item_type: itemType.toLowerCase(),
  total_amount: parseFloat(itemPrice),
  tax_preference: taxPreference?.value || '',
  within_state_tax_rate: withinStateTax?.value ?? 0,
  cross_state_tax_rate: crossStateTax?.value ?? 0,
  description: itemDescription,
};



  ItemsPut(id, updatedItem)
    .then(() => {
      toast.success('Item updated successfully!');
      navigate('/Items');
    })
    .catch((err) => {
      console.error('Update failed:', err);
      toast.error('Failed to update item.');
    });
};


  return (
    <>
    <Link className='new-item-head' to={`/Items`} ><FaChevronLeft/> Edit Item</Link>
<div className='createnew-item-form-container pt-5'>
<label htmlFor="" className="d-flex flex-column" style={{gap:"0.75rem"}}> <span className="customer-type-label">Item Type</span>
     <FormControl >
    <RadioGroup value={itemType} onChange={(e) => setItemType(e.target.value as 'PRODUCT' | 'SERVICE')}>
  <div className="d-flex">
    <FormControlLabel
      value="PRODUCT"
      control={<Radio size="small" />}
      label="PRODUCT"
    />
    <FormControlLabel
      value="SERVICE"
      control={<Radio size="small" />}
      label="SERVICE"
    />
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
            <input
              type="text"
              value={itemPrice}
              onChange={(e=>setItemPrice(e.target.value))}
               placeholder='enter item price'
              className='expenses-input'             
            />
          </label>
        </div>
      </div>
       <div className="new-expwnses-row pt-2">
        <div className="new-expwnses-row-left">
          
          <label className='expenses-label'>
            Tax Preference
            <Select
        className="expenses-input"
        options={selecttaxOptions}
        value={taxPreference}
        onChange={setTaxPreference}
        placeholder="Select tax preference"
        isClearable
      />
          </label>
        </div>

        <div className="new-expwnses-row-right  d-flex gap-2">
            <label className='expenses-label'>
    Within-state tax rate
    <Select className="expenses-input"  options={withinStateOptions}  value={withinStateTax}  onChange={setWithinStateTax}   placeholder="Select tax rate"  isClearable
     styles={{ container: (base) => ({ ...base, width: '309px' ,fontSize:"14px",fontWeight:"400px" })}} />
  </label>
  <label className='expenses-label'>
    Cross-state tax rate
    <Select className="expenses-input"
      value={crossStateTax} options={crossStateOptions} onChange={setCrossStateTax} placeholder="Select tax rate" isClearable
     styles={{ container: (base) => ({ ...base, width: '309px',fontSize:"14px",fontWeight:"400px"  })}}/>
  </label>
        </div>
      </div>
  <div className='pt-2 ' style={{width:"48%"}}>
               <label className='expenses-label '>
                Item Description
                <textarea placeholder='enter item description'
                 value={itemDescription}
  onChange={(e) => setItemDescription(e.target.value)}
                name="" id=""></textarea>
               </label>
        </div>

        <div className='customers-view-buttons'>
        <button onClick={handleEdittemsSave}>Save</button>
        <button>Cancel</button>
      </div>
</div>

    </>
   
  );
}

export default ItemsEdit
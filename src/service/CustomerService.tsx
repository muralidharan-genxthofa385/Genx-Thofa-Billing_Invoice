import { deleteRequest, getRequest, postRequest, putRequest } from "./ApiServices"


export const GetCustomersList=()=>{
    return getRequest('/customers')
}

export const AddNewCustomer = (newCustomer:any) => postRequest('/customers',newCustomer);

export const updateCustomer=(id:string|number,updateCustomer:any)=>{
    return putRequest(`/customers/${id}`,updateCustomer)
}

export const DeleteCustomer=(id:string|number)=>{
    return deleteRequest(`/customers/${id}`)
}

export const customersGstFetch = (gstNumber: string) => {
  return getRequest(`/customers/gst/${gstNumber}`);
};


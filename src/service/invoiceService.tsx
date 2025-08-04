import { deleteRequest, getRequest, postRequest, putRequest, rawGetRequest } from "./ApiServices";
import axios from "axios";
import { getToken } from "./tokenService";

export const fetchInvoice = () => {
 return getRequest('/invoices')
};


export const fetchInvoiceById = (id: string | number) => getRequest(`/invoices/${id}`);

export const updateInvoiceById=(id:string,data:any)=>{
   return putRequest(`/invoices/${id}`,data)
}

export const createInvoice=(NewInvoice:any)=>{
    return postRequest(`/invoices`,NewInvoice)
}
export const deleteInvoice = (id: string | number) => {
    return deleteRequest(`/invoices/${id}`)
}
export const invoicePdfGenerator = (id: string) => {
  return rawGetRequest(`/invoices/${id}/download-pdf`);
};

const token=getToken();
export const getPdfFromServer = (id: string) => {
  return axios.get(`http://127.0.0.1:8000/api/invoices/${id}/download-pdf`, {
    responseType: 'blob',
    headers: {
      Accept: 'application/pdf',
      Authorization: `Bearer ${token}`, 
    },
  });
};

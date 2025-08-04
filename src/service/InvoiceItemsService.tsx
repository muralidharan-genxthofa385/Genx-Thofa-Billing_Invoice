import { deleteRequest, getRequest, postRequest, putRequest } from "./ApiServices"

export const ItemsGet=()=>{
    return getRequest('/invoice-items')
}

export const ItemsPost=(newItem:any)=>{
    return postRequest('/invoice-items',newItem)
}
export const ItemsPut=(id:any,newItem:any)=>{
    return putRequest(`/invoice-items/${id}`,newItem)
}
export const ItemsDelete=(id:any)=>{
    return deleteRequest(`/invoice-items/${id}`)
}

export const deleteItem = (id: string | number) => {
  return deleteRequest(`/invoice-items/${id}`);
}
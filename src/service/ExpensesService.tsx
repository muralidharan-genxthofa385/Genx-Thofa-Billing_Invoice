import { deleteRequest, getRequest, postRequest, putRequest } from "./ApiServices"

export const getExpences=()=>{
   return getRequest('/expenses')
}
export const postExpense=(newExpense:any)=>{
   return postRequest('/expenses',newExpense)
}
export const UpdateExpense=(id:string,updateExpense:any)=>{
   return putRequest(`/expenses/${id}`,updateExpense)

}
export const deleteExpense=(id:string|number)=>{
   return deleteRequest(`/expenses/${id}`)
}




export const getExpenseCategories=()=>{
   return getRequest('/expenses/categories')
}
export const createCategory = (newName: string) => {
  return postRequest('/expenses/categories', { name: newName });
};
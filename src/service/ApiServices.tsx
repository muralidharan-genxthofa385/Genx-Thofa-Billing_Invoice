import axios from "axios";

import { getToken } from "./tokenService";

const BASE_URL  ='http://127.0.0.1:8000/api';

const api=axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type':'application/json'
    },
})

api.interceptors.request.use((config)=>{
    const token=getToken();
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
})


export const getRequest=(url:string,params?:any)=>{
   return api.get(url,{params}).then((res)=>res.data)
}

export const postRequest=(url:string,data:any)=>{
   return api.post(url,data).then((res)=>res.data)
}
export const putRequest=(url:string,data:any)=>{
   return api.put(url,data).then((res)=>res.data)
}
export const deleteRequest=(url:string)=>{
  return  api.delete(url).then((res)=>res.data)
}

export const rawGetRequest = (url: string, config: any = {}) => {
  return api.get(url, { ...config, responseType: 'blob' });
};


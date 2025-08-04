const Token_key='accesstoken'

export const setToken=(token:string)=>{
    localStorage.setItem(Token_key,token)
    return token;
}
export const getToken=()=>{
    return localStorage.getItem(Token_key)
}
export const removeToken=()=>{
    return localStorage.removeItem(Token_key)
}
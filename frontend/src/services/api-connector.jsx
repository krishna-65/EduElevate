import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method,url,body,params,headers) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:body ? body : null,
        params:params ? params : null,
        headers:headers ? headers : null,
        credentials: 'include',
        withCredentials: true, // send cookies with requests
    })
}
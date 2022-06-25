import axios from "axios";
import React from "react";
import { StatusCodes } from "http-status-codes";
import { RedirectUser } from "../helpers/funstions";
// import { StatusCodes } from "http-status-codes";

const httpSvc = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "v1",
    timeout: 30000,
    timeoutErrorMessage: "Server Timed Out",
    headers: {
        "content-type": "application/json"
    }
});

httpSvc.interceptors.request.use((config) => {
    console.log("I am in request intercepter: ", config)
    return config;
}, (error) => {
    return Promise.reject(error);
})

httpSvc.interceptors.response.use((response) => {
    console.log("I am in response interceptor: ", response);
    return response;
}, (err) => {
    if (err.response.status === StatusCodes.BAD_REQUEST) {
        localStorage.removeItem('login_user_info')
        return <RedirectUser url='/loginpage' />

        //console.log(err);
        //return Promise.reject(err);
    } else if (err.response.status === StatusCodes.FORBIDDEN) {
        return (<>Forbidden Access</>)
    } else {
        return Promise.reject(err.response.data);
    }

})

const getHeaders = (config={}) => {
    let headers = {
        headers: {
            "content-type": "application/json"
        }
    }
    if (config["form_data"]) {
        headers["headers"] = {
            "content-type": "multipart/form-data"
        }
    } 
    
    if (config["is_strict"]) {
        let token = localStorage.getItem("login_token");
        headers['headers']['authorization'] = "Bearer " + token;
    }

    if(config["params"]){
        headers['params'] = config["params"]
    }
    return headers;
}

export const httpPOst = async (url, data, is_strict, form_data) => {
    try {
        let headers = getHeaders({
            is_strict: is_strict,
            form_data: form_data
        });
        let response = await httpSvc.post(url, data, headers);
        return response.data;
        // if(response.status === StatusCodes.OK || response.status === StatusCodes.CREATED) {
        //     return response.data;
        // } else {          
        //     throw response.data;
        // }
    } catch (error) {
        throw error
    }

}

export const httpGet = async (url, params, is_strict) => {
    try {
        let headers = getHeaders({
            is_strict: is_strict,
            params: params
        })
        let response = await httpSvc.get(url, headers);
        return response.data;

    } catch (error) {
        throw error
    }

}

export const httpDelete = async (url, is_strict)  => {
    try {
        let headers = getHeaders({
            is_strict: is_strict
        })
         
        let response = await httpSvc.delete(url, headers);
        return response.data;

    } catch (error) {
        throw error
    }
}

export const httpPut = async (url, data, is_strict = false, is_form_data = false) => {
    try {
        let headers = getHeaders({
            is_strict: is_strict,
            form_data: is_form_data
        })
        let response = await httpSvc.put(url, data, headers);
        return response.data;
       
    } catch (error) {
        throw error
    }

}

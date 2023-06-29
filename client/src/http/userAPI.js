import {$authHost, $host} from "./index";
// import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    // const {data} = await $host.post('api/user/register', {email, password, role: 'ADMIN'})
    const res = await $host.post('api/user/register', {email, password, role: 'ADMIN'})
    // localStorage.setItem('token', data.token)
    return res
    
}

export const login = async (email, password) => {
    // const {data} = await $host.post('api/user/login', {email, password})
    const res = await $host.post('api/user/login', {email, password})
    // localStorage.setItem('token', data.token)
    return res
}

export const check = async () => {
    // const {data} = await $authHost.get('api/user/auth' )
    const res = await $authHost.get('api/user/auth' )
    // localStorage.setItem('token', data.token)
    return res
}
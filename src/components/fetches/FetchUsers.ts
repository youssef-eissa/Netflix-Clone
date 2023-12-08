import axios from "axios";


export const getUser=(username:any, password:any)=>{
    return axios.post(`https://dummyjson.com/auth/login`, {
        Headers: {
            "Content-Type": "application/json",
        },
        username: username,
        password: password
        
    })
}




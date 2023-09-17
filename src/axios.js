import axios from "axios";

axios.defaults.baseURL = `http://localhost:9090`;
if (localStorage.getItem("accessToken")) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
}

// let refresh = false;
// axios.interceptors.response.use(resp => resp, async error => {
//     if ((error.response.status === 401) && !refresh) {
//         const {status, data} = await axios.post(`/api/v1/auth/token/refresh`, localStorage.getItem("refreshToken"));
//         console.log(error)
//         if (status === 200) {
//             axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
//             return axios(error.config);
//         }
//     }
//     refresh = false;
//     return error;
// })
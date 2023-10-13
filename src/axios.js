import axios from "axios";
import {AuthService} from "@/services/AuthService";


axios.defaults.baseURL = `http://localhost:9090`;

// if (localStorage.getItem("accessToken")) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
// } else {
//     axios.defaults.headers.common["Authorization"] = '';
// }

axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
        return config;
    }
);

let refresh = false;
axios.interceptors.response.use(resp => resp, async error => {
    console.log('error', error)
    if (!refresh || (!refresh && error.response && error.response.status === 401)) {
        refresh = true;
        try {
            const response = await AuthService.refreshToken(localStorage.getItem('refreshToken'));
            const res = response.response;
            if (res.data.success) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.data.accessToken}`;
                localStorage.setItem("accessToken", res.data.data.accessToken);
                localStorage.setItem("refreshToken", res.data.data.refreshToken);
            } else {
                refresh = true;
                // window.location.href = '/login';
            }
        } catch (err) {
            refresh = true;
            console.log('error: ', err)
            // window.location.href = '/login';
        }
    }
    refresh = true;
    return error;
});

export default axios;
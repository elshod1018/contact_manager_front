import axios from "axios";

export class AuthService {
    static authUrl = `/api/v1/auth`;

    static register(userCreateDTO) {
        return axios.post(`${this.authUrl}/user/register`, userCreateDTO);
    }

    static login(tokenRequest) {
        return axios.post(`${this.authUrl}/token/access`, tokenRequest);
    }

    static async activateUser(activationData) {
        return axios.put(`${this.authUrl}/user/activate`, activationData);
    }

    static async refreshToken(refreshTokenRequest) {
        return axios.post(`${this.authUrl}/token/refresh`, refreshTokenRequest);
    }
}
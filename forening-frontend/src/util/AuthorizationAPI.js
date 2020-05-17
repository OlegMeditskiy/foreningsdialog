import {API_BASE_URL} from "../constants";
import {request, requestFile} from "./APIUtils";

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(file) {
    return requestFile({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: file
    });
}

export function signupGuest(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signupGuest",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}
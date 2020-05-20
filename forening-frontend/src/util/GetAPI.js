import {ACCESS_TOKEN, API_BASE_URL, ASSOCIATION_LIST_SIZE} from "../constants";
import {request} from "./APIUtils";

export function getAllAssociations(page, size) {
    page = page || 0;
    size = size || ASSOCIATION_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/associations?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getAllFiles() {
    return request({
        url: API_BASE_URL + "/associationAdmin/getAllFiles",
        method: 'GET'
    });
}
export function getFile(filename) {
    return request({
        url: 'http://localhost:8080' + "/files/"+filename,
        method: 'GET'
    });
}

export function getOrganization(username, organizationId) {
    return request({
        url: API_BASE_URL + "/users/" + username + "/organization/" + organizationId,
        method: 'GET'
    });
}
export function getAllOrganizations() {
    return request({
        url: API_BASE_URL + "/mainAdmin/allOrganisations",
        method: 'GET'
    });
}
export function getAllAcceptOrganization() {
    return request({
        url: API_BASE_URL + "/mainAdmin/acceptOrganizationUpdate",
        method: 'GET'
    });
}
export function getAssociation(username, associationId) {
    return request({
        url: API_BASE_URL + "/users/" + username + "/association/" + associationId,
        method: 'GET'
    });
}

export function getHouse(username, houseId) {
    return request({
        url: API_BASE_URL + "/users/" + username + "/house/" + houseId,
        method: 'GET'
    });
}

export function getApartment(username, apartmentId) {
    return request({
        url: API_BASE_URL + "/users/" + username + "/apartment/" + apartmentId,
        method: 'GET'
    });
}

export function getGuestRegister(uniqueKey) {
    return request({
        url: API_BASE_URL + "/associationAdmin/getGuestRegister/" + uniqueKey,
        method: 'GET'
    });
}

export function getUserCreatedOrganizationss(username) {
    return request({
        url: API_BASE_URL + "/users/" + username + "/organizations",
        method: 'GET'
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

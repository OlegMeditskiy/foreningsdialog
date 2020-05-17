import {ACCESS_TOKEN, API_BASE_URL} from '../constants';

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};
export const requestFile = (options) => {
    const headers = new Headers({
        // "Content-Type": undefined
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => {
                if (response.ok) {
                    alert("File uploaded successfully.")
                }

            }
        );
};

export function fileUpload(file) {
    return requestFile({
        url: API_BASE_URL + "/associationAdmin/upload",
        method: 'POST',
        body: file
    })

}
export function createNewDocument(file) {
    return requestFile({
        url: API_BASE_URL + "/associationAdmin/create/document",
        method: 'POST',
        body: file
    })

}
export function GDPRUpload(file) {
    return requestFile({
        url: API_BASE_URL + "/mainAdmin/uploadGDPR",
        method: 'POST',
        body: file
    })

}

export function logoUpload(file) {
    return requestFile({
        url: API_BASE_URL + "/associationAdmin/logoUpload",
        method: 'POST',
        body: file
    })

}
export function VillkorUpload(file) {
    return requestFile({
        url: API_BASE_URL + "/mainAdmin/uploadVillkor",
        method: 'POST',
        body: file
    })

}

export function fileUpload2(createDocument) {
    return requestFile({
        url: API_BASE_URL + "/associationAdmin/createDocument",
        method: 'POST',
        body: JSON.stringify(createDocument)
    })
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}









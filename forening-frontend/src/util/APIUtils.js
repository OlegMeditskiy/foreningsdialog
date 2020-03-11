import { API_BASE_URL, ASSOCIATION_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllAssociations(page, size) {
    page = page || 0;
    size = size || ASSOCIATION_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/associations?page=" + page + "&size=" + size,
        method: 'GET'
    });
}


export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}
export function createNewOrganisations(createNewOrganisationsRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/createOrganizations",
        method: 'POST',
        body: JSON.stringify(createNewOrganisationsRequest)
    });
}
export function createNewHouse(createNewHouseRequest) {
    console.log(JSON.stringify(createNewHouseRequest))
    return request({
        url: API_BASE_URL + "/associationAdmin/createHouse",
        method: 'POST',
        body: JSON.stringify(createNewHouseRequest)
    });
}
export function createNewContact(createNewContactRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/createContact",
        method: 'POST',
        body: JSON.stringify(createNewContactRequest)
    });
}
export function createNewAssociation(createNewAssociationRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/createAssociation",
        method: 'POST',
        body: JSON.stringify(createNewAssociationRequest)
    });
}
export function createNewApartment(createNewApartmentRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/createApartment",
        method: 'POST',
        body: JSON.stringify(createNewApartmentRequest)
    });
}
export function createNewGuest(createNewGuestRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/createGuest",
        method: 'POST',
        body: JSON.stringify(createNewGuestRequest)
    });
}

export function saveAssociation(saveAssociationRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/saveAssociation",
        method: 'POST',
        body: JSON.stringify(saveAssociationRequest)
    });

}
export function saveHouse(saveHouseRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/saveHouse",
        method: 'POST',
        body: JSON.stringify(saveHouseRequest)
    });

}
export function saveContact(saveContactRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/saveContact",
        method: 'POST',
        body: JSON.stringify(saveContactRequest)
    });

}
export function saveApartment(saveApartmentRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/saveApartment",
        method: 'POST',
        body: JSON.stringify(saveApartmentRequest)
    });

}
export function saveGuest(saveGuestRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/saveGuest",
        method: 'POST',
        body: JSON.stringify(saveGuestRequest)
    });

}
export function deleteAssociationFromOrganization(deleteAssociationRequest) {
    return request({
        url:API_BASE_URL+"/associationAdmin/deleteAssociation",
        method:'DELETE',
        body: JSON.stringify(deleteAssociationRequest)
    })
}
export function deleteHouseFromAssociation(deleteHouseRequest) {
    return request({
        url:API_BASE_URL+"/associationAdmin/deleteHouse",
        method:'DELETE',
        body: JSON.stringify(deleteHouseRequest)
    })
}
export function deleteContactFromAssociation(deleteContactRequest) {
    return request({
        url:API_BASE_URL+"/associationAdmin/deleteContact",
        method:'DELETE',
        body: JSON.stringify(deleteContactRequest)
    })
}
export function deleteApartmentFromAssociation(deleteApartmentRequest) {
    return request({
        url:API_BASE_URL+"/associationAdmin/deleteApartment",
        method:'DELETE',
        body: JSON.stringify(deleteApartmentRequest)
    })
}
export function deleteGuestFromAssociation(deleteGuestRequest) {
    return request({
        url:API_BASE_URL+"/associationAdmin/deleteGuest",
        method:'DELETE',
        body: JSON.stringify(deleteGuestRequest)
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

export function getUserCreatedOrganizations(username, page, size) {
    page = page || 0;
    size = size || ASSOCIATION_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/organizations?page=" + page + "&size=" + size,
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
    if(!localStorage.getItem(ACCESS_TOKEN)) {
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

import {API_BASE_URL} from "../constants";
import {request, requestFile} from "./APIUtils";

export function saveAssociation(saveAssociationRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/save/association",
        method: 'POST',
        body: JSON.stringify(saveAssociationRequest)
    });

}

export function saveHouse(saveHouseRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/save/house",
        method: 'POST',
        body: JSON.stringify(saveHouseRequest)
    });

}

export function saveProtocol(file) {
    return requestFile({
        url: API_BASE_URL + "/associationAdmin/save/protocol",
        method: 'POST',
        body: file
    });
}

export function saveContact(saveContactRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/save/contact",
        method: 'POST',
        body: JSON.stringify(saveContactRequest)
    });

}
export function saveOrganization(saveOrganizationRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/save/organization",
        method: 'POST',
        body: JSON.stringify(saveOrganizationRequest)
    });

}
export function saveActivatedOrganization(updateOrganizationRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/save/activatedOrganization",
        method: 'POST',
        body: JSON.stringify(updateOrganizationRequest)
    });

}
export function saveNotActivatedOrganization(updateOrganizationRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/save/notActivatedOrganization",
        method: 'POST',
        body: JSON.stringify(updateOrganizationRequest)
    });
}
export function saveDeclinedOrganization(updateOrganizationRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/save/declinedOrganization",
        method: 'POST',
        body: JSON.stringify(updateOrganizationRequest)
    });
}

export function acceptOrganizationUpdate(acceptOrganizationUpdateRequest) {
    return request({
        url: API_BASE_URL + "/mainAdmin/acceptOrganizationUpdate",
        method: 'POST',
        body: JSON.stringify(acceptOrganizationUpdateRequest)
    });
}


export function saveApartment(saveApartmentRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/save/apartment",
        method: 'POST',
        body: JSON.stringify(saveApartmentRequest)
    });

}

export function saveGuest(saveGuestRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/save/guest",
        method: 'POST',
        body: JSON.stringify(saveGuestRequest)
    });
}

export function saveSettings(saveSettingsRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/save/settings",
        method: 'POST',
        body: JSON.stringify(saveSettingsRequest)
    });
}

export function acceptOrganization(acceptOrganizationRequest) {
    return request({
        url: API_BASE_URL + "/mainAdmin/acceptOrganization",
        method: 'POST',
        body: JSON.stringify(acceptOrganizationRequest)
    });
}

export function declineOrganization(declineOrganizationRequest) {
    return request({
        url: API_BASE_URL + "/mainAdmin/declineOrganization",
        method: 'POST',
        body: JSON.stringify(declineOrganizationRequest)
    });
}

export function sendMailToGuest(sendMailRequest) {
    return request({
        url:API_BASE_URL+"/associationAdmin/save/sendMailToGuest",
        method:'POST',
        body: JSON.stringify(sendMailRequest)
    })
}

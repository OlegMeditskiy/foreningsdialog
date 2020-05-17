import {API_BASE_URL} from "../constants";
import {request} from "./APIUtils";

export function createNewHouse(createNewHouseRequest) {

    return request({
        url: API_BASE_URL + "/associationAdmin/create/house",
        method: 'POST',
        body: JSON.stringify(createNewHouseRequest)
    });
}

export function createNewContact(createNewContactRequest) {

    return request({
        url: API_BASE_URL + "/associationAdmin/create/contact",
        method: 'POST',
        body: JSON.stringify(createNewContactRequest)
    });
}

export function createNewAssociation(createNewAssociationRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/create/association",
        method: 'POST',
        body: JSON.stringify(createNewAssociationRequest)
    });
}

export function createDocumentType(createDocumentType) {
    return request({
        url: API_BASE_URL + "/associationAdmin/create/documentType",
        method: 'POST',
        body: JSON.stringify(createDocumentType)
    });
}

export function createNewApartment(createNewApartmentRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/create/apartment",
        method: 'POST',
        body: JSON.stringify(createNewApartmentRequest)
    });
}

export function createNewGuest(createNewGuestRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/create/guest",
        method: 'POST',
        body: JSON.stringify(createNewGuestRequest)
    });
}

export function createNewOrganisations(createNewOrganisationsRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/createOrganizations",
        method: 'POST',
        body: JSON.stringify(createNewOrganisationsRequest)
    });
}
export function createNews(createNewsRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/create/news",
        method: 'POST',
        body: JSON.stringify(createNewsRequest)
    });
}
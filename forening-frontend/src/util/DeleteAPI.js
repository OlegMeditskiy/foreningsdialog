import {API_BASE_URL} from "../constants";
import {request} from "./APIUtils";

export function deleteAssociationFromOrganization(deleteAssociationRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/delete/association",
        method: 'DELETE',
        body: JSON.stringify(deleteAssociationRequest)
    })
}

export function deleteHouseFromAssociation(deleteHouseRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/delete/house",
        method: 'DELETE',
        body: JSON.stringify(deleteHouseRequest)
    })
}

export function deleteContactFromAssociation(deleteContactRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/delete/contact",
        method: 'DELETE',
        body: JSON.stringify(deleteContactRequest)
    })
}

export function deleteApartmentFromAssociation(deleteApartmentRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/delete/apartment",
        method: 'DELETE',
        body: JSON.stringify(deleteApartmentRequest)
    })
}



export function deleteGuestFromAssociation(deleteGuestRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/delete/guest",
        method: 'DELETE',
        body: JSON.stringify(deleteGuestRequest)
    })
}

export function deleteNews(deleteNews) {
    return request({
        url: API_BASE_URL + "/associationAdmin/delete/news",
        method: 'DELETE',
        body: JSON.stringify(deleteNews)
    })
}

export function deleteDocumentType(deleteDocumentTypeRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/delete/documentType",
        method: 'DELETE',
        body: JSON.stringify(deleteDocumentTypeRequest)
    })
}
export function deleteDocument(deleteDocumentRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/delete/document",
        method: 'DELETE',
        body: JSON.stringify(deleteDocumentRequest)
    })
}
export function deleteOrganization(organizationRequest) {
    return request({
        url: API_BASE_URL + "/associationAdmin/delete/organization",
        method: 'DELETE',
        body: JSON.stringify(organizationRequest)
    })
}
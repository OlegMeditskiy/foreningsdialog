package se.foreningsdialog.forening.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.ContactPerson;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.payload.contact.DeleteContactRequest;
import se.foreningsdialog.forening.payload.contact.NewContactRequest;
import se.foreningsdialog.forening.payload.contact.SaveContactRequest;
import se.foreningsdialog.forening.repository.AssociationNameRepository;
import se.foreningsdialog.forening.repository.ContactPersonRepository;

@Service
public class ContactPersonService {
    private final
    ContactPersonRepository contactPersonRepository;
    private final
    AssociationNameRepository associationNameRepository;

    public ContactPersonService(ContactPersonRepository contactPersonRepository, AssociationNameRepository associationNameRepository) {
        this.contactPersonRepository = contactPersonRepository;
        this.associationNameRepository = associationNameRepository;
    }

    public ResponseEntity<?> createContact(NewContactRequest newContactRequest) {
        AssociationName association = associationNameRepository.getOne(newContactRequest.getAssociationId());
        ContactPerson contactPerson = new ContactPerson();
        contactPerson.setContactEmail(newContactRequest.getContactEmail());
        contactPerson.setContactName(newContactRequest.getContactName());
        contactPerson.setContactTelephone(newContactRequest.getContactTelephone());
        contactPerson.setAssociationName(association);
        contactPersonRepository.save(contactPerson);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    public ResponseEntity<?> deleteContact(DeleteContactRequest deleteContactRequest) {
        ContactPerson contactPerson = contactPersonRepository.getOne(deleteContactRequest.getContactId());
        contactPerson.setAssociationName(null);
        contactPersonRepository.delete(contactPerson);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
    public ResponseEntity<?> saveContact(SaveContactRequest saveContactRequest) {
        ContactPerson contactPerson = contactPersonRepository.getOne(saveContactRequest.getContactId());
        contactPerson.setContactEmail(saveContactRequest.getContactEmail());
        contactPerson.setContactName(saveContactRequest.getContactName());
        contactPerson.setContactTelephone(saveContactRequest.getContactTelephone());
        contactPersonRepository.save(contactPerson);
        return ResponseEntity.ok().body(new ApiResponse(true, "Organisationer var skapad, vänta på bekräfting"));
    }
}

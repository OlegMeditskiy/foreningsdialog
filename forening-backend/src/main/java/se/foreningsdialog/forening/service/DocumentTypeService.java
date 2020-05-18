package se.foreningsdialog.forening.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.foreningsdialog.forening.models.AssociationName;
import se.foreningsdialog.forening.models.DocumentType;
import se.foreningsdialog.forening.payload.association.DeleteDocumentTypeRequest;
import se.foreningsdialog.forening.payload.association.DocumentTypeRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.repository.AssociationNameRepository;
import se.foreningsdialog.forening.repository.DocumentTypeRepository;

@Service
public class DocumentTypeService {

    private final DocumentTypeRepository documentTypeRepository;

    private final AssociationNameRepository associationNameRepository;

    public DocumentTypeService(DocumentTypeRepository documentTypeRepository, AssociationNameRepository associationNameRepository) {
        this.documentTypeRepository = documentTypeRepository;
        this.associationNameRepository = associationNameRepository;
    }

    public ResponseEntity<?> createDocumentType(DocumentTypeRequest documentTypeRequest) {
        AssociationName associationName = associationNameRepository.getOne(documentTypeRequest.getAssociationNameId());
        DocumentType documentType = new DocumentType();
        documentType.setAssociationName(associationName);
        documentType.setTypeName(documentTypeRequest.getTypeName());
        documentTypeRepository.save(documentType);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument typ var skapad."));
    }
    public ResponseEntity<?> deleteDocumentType(DeleteDocumentTypeRequest deleteDocumentTypeRequest) {
        DocumentType documentType = documentTypeRepository.getOne(deleteDocumentTypeRequest.getId());
        documentTypeRepository.delete(documentType);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument type was deleted"));
    }
}

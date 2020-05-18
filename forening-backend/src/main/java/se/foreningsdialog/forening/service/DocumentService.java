package se.foreningsdialog.forening.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.foreningsdialog.forening.models.Document;
import se.foreningsdialog.forening.models.DocumentType;
import se.foreningsdialog.forening.payload.association.DeleteDocumentTypeRequest;
import se.foreningsdialog.forening.payload.association.DocumentRequest;
import se.foreningsdialog.forening.payload.common.ApiResponse;
import se.foreningsdialog.forening.repository.DocumentRepository;
import se.foreningsdialog.forening.repository.DocumentTypeRepository;
import se.foreningsdialog.forening.storage.StorageService;

import java.util.UUID;

@Service
public class DocumentService {
    private final DocumentTypeRepository documentTypeRepository;
    private final StorageService storageService;
    private final DocumentRepository documentRepository;

    public DocumentService(DocumentTypeRepository documentTypeRepository, StorageService storageService, DocumentRepository documentRepository) {
        this.documentTypeRepository = documentTypeRepository;
        this.storageService = storageService;
        this.documentRepository = documentRepository;
    }

    public ResponseEntity<?> createDocument(MultipartFile file,DocumentRequest documentRequest) {
        DocumentType documentType = documentTypeRepository.getOne(documentRequest.getDocumentTypeId());
        Document document = new Document();
        document.setDocumentType(documentType);
        document.setTitle(documentRequest.getTitle());
        documentRepository.save(document);
        String filename = UUID.randomUUID().toString();
        String documentName = "http://localhost:8080/files/" + storageService.saveAsString(file, filename);
        document.setDocumentName(documentName);
        documentRepository.save(document);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument typ var skapad."));
    }
    public ResponseEntity<?> deleteDocument(DeleteDocumentTypeRequest deleteDocumentTypeRequest) {
        System.out.println(deleteDocumentTypeRequest.getId());
        Document document = documentRepository.getOne(deleteDocumentTypeRequest.getId());
        document.setDocumentType(null);
        documentRepository.delete(document);
        return ResponseEntity.ok().body(new ApiResponse(true, "Dokument was deleted"));
    }
}

import React, {Component} from 'react';
import {notification} from "antd";
import {createNewDocument} from "../../util/APIUtils";
import {createDocumentType} from "../../util/CreateAPI";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./FileUpload.css";
import {deleteDocument, deleteDocumentType} from "../../util/DeleteAPI";

class DocumentUpload extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            documents: [],
            selectedDocumentType:'',
            deleteDocumentType:''
        }
        this.createNewDocument = this.createNewDocument.bind(this);
        this.getOptionsDocumentType=this.getOptionsDocumentType.bind(this);
        this.handleOnFileChange = this.handleOnFileChange.bind(this);
        this.loadDocumentType = this.loadDocumentType.bind(this);
        this.handleChangeSelect=this.handleChangeSelect.bind(this);
        this.handleChangeSelectToDelete=this.handleChangeSelectToDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitRemove = this.handleSubmitRemove.bind(this);
        this.handleSubmitRemove = this.handleSubmitRemove.bind(this);
        this.handleDeleteDocument=this.handleDeleteDocument.bind(this);
    }

    createNewDocument(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file)
        formData.append('properties',new Blob([JSON.stringify({
            "title": this.state.title,
            "documentTypeId": this.state.selectedDocumentType
        })],{type: "application/json"}))
        createNewDocument(formData)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Dokument var uppladat",
                });
                this.props.load();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }



    handleOnFileChange = (e) => {
        let file = e.target.files[0];
        this.setState({
            [e.target.id]: file
        })
    }

    loadDocumentType() {
        this.setState({
            documents: this.props.documents,
        })
        if (this.props.documents.length>0){
            this.setState({
                selectedDocumentType:this.props.documents[0].id,
                deleteDocumentType:this.props.documents[0].id
            })

        }

    }

    componentDidMount(): void {
        this.loadDocumentType();
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };
    handleChangeSelect(event) {
        this.setState({selectedDocumentType: event.target.value});
    }
    handleChangeSelectToDelete(event) {
        this.setState({deleteDocumentType: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const createDocumentTypeRequest = {
            typeName: this.state.typeName,
            associationNameId: this.props.match.params.associationId
        }
        createDocumentType(createDocumentTypeRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Document type was created",
                });
                this.props.load();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }
    handleSubmitRemove(event) {
        event.preventDefault();
        const deleteDocumentTypeRequest = {
            id: this.state.deleteDocumentType
        }
        deleteDocumentType(deleteDocumentTypeRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Dokument typ var tagit bort",
                });
                this.props.load();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }
    handleDeleteDocument(event,id) {
        event.preventDefault();
        const deleteDocumentRequest = {
            id: id
        }
        deleteDocument(deleteDocumentRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Du har tagit bort dokument",
                });
                this.props.load();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    componentDidUpdate(nextProps) {
        if (this.props.documents !== nextProps.documents) {
            // Reset State
            this.setState({
                documents: []
            });
            this.loadDocumentType();
        }
    }


    showDocumentTypes() {
        const files = this.state.documents;
        var filesList;
        if (this.state.documents.length<1){
            filesList = <div><h5>Du har inga dokument typer</h5></div>
        }
        else {
            filesList = files.map((doc, idx) =>
            {
                const documents = doc.documents;
                if (documents.length<1){
                    return (
                        <Col key={idx}>
                            <h5>{doc.typeName}</h5>
                            <p>Det finns inga dokumenter här</p>
                        </Col>
                    )
                }
        else {
            return(
                        <Col key={idx}>
                            <h5>{doc.typeName}</h5>
                            {doc.documents.map((document,idxDocument)=>{

                                    return(
                                        <div key={idxDocument}>
                                            <a href={document.documentName} target={"_blank"}>{document.title}</a>
                                            {this.deleteDocument(document.id)}
                                        </div>
                                    )
                                }
                            )}
                        </Col>
                    )
                }

            });
        }
        return (
            <Row className={"documentBlock"}>{filesList}</Row>
        );
    }

    addDocumentType() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="documentTypeName">
                        <Form.Label>Type Name</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" name="typeName"
                                      placeholder="Enter type name"/>
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Lägga till
                    </Button>
                </Form>
            </div>
        )
    }

    removeTypeName(){
        const documents = this.state.documents;
        const getTypes = documents.map((documentType, idx) =>{
            return (
                <option key={idx} value={documentType.id}>{documentType.typeName}</option>
            );
        });
        return(
            <Form.Group>
            <Form.Control onChange={this.handleChangeSelectToDelete} as="select">
                {getTypes}
            </Form.Control>
            </Form.Group>
        )
    }
    getOptionsDocumentType() {
        const documents = this.state.documents;
        const getTypes = documents.map((documentType, idx) =>{
            return (
                <option key={idx} value={documentType.id}>{documentType.typeName}</option>
            );
        });
        return(
            <Form.Control onChange={this.handleChangeSelect} as="select">
                {getTypes}
            </Form.Control>
        )
    }

    deleteDocumentType() {
        return (
            <div className={"site-block"}>
                <Form onSubmit={this.handleSubmitRemove}>
                    {this.removeTypeName()}
                    <Button variant="danger" type="submit">
                        Ta bort
                    </Button>
                </Form>
            </div>
        )
    }
    deleteDocument(id) {
        return (
            <div>
                <Form onSubmit={event=>this.handleDeleteDocument(event,id)}>
                    <Button variant="danger" type="submit">
                        Ta bort
                    </Button>
                </Form>
            </div>
        )
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className={"documentBlock"}>
                        {this.addDocumentType()}
                        {this.deleteDocumentType()}
                    </Col>
                    <Col className={"documentBlock"}>
                        <Form onSubmit={this.createNewDocument}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control onChange={this.handleChange} type="text" name={"title"} id={"title"} placeholder="Skriva in dokument namn" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Dokument typer</Form.Label>
                                {this.getOptionsDocumentType()}
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    id="file"
                                    name="file"
                                    onChange={this.handleOnFileChange}
                                />
                            </Form.Group>
                        <Form.Group>
                            <Button variant={"secondary"} type="submit">Ladda upp</Button>
                        </Form.Group>
                        </Form>
                    </Col>
                </Row>
                    {this.showDocumentTypes()}
            </Container>
        );
    }
}
export default DocumentUpload;
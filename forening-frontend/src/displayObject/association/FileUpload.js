import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {notification} from "antd";
import {createNewDocument, logoUpload} from "../../util/APIUtils";
import {getAllFiles} from "../../util/GetAPI";
import {createDocumentType} from "../../util/CreateAPI";

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            isLoading: false,
            documents: [],
            selectedDocumentType:''
        }
        this.createNewDocument = this.createNewDocument.bind(this);
        this.getOptionsDocumentType=this.getOptionsDocumentType.bind(this);
        this.uploadAssociationLogo = this.uploadAssociationLogo.bind(this);
        this.handleOnFileChange = this.handleOnFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadFiles = this.loadFiles.bind(this);
        this.loadDocumentType = this.loadDocumentType.bind(this);
        this.handleChangeSelect=this.handleChangeSelect.bind(this);
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
                this.loadFiles();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    uploadAssociationLogo(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.logo)
        formData.append('properties',new Blob([JSON.stringify({
            "associationId": this.props.match.params.associationId
        })],{type: "application/json"}))
        logoUpload(formData)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "File was uploaded",
                });
                this.loadFiles();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }


    loadFiles() {
        let promise;
        promise = getAllFiles();
        this.setState({
            isLoading: true,
            files: []
        });

        promise
            .then(response => {
                const files = this.state.files.slice();
                this.setState({
                    files: files.concat(response),
                })

            }).catch(() => {
            this.setState({
                isLoading: false
            })
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
            documents: this.props.documents
        })
    }

    componentDidMount(): void {
        this.loadFiles();
        this.loadDocumentType();
    }







    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };
    handleChangeSelect(event) {
        this.setState({selectedDocumentType: event.target.value});
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

    componentDidUpdate(nextProps) {
        if (this.props.documents !== nextProps.documents) {
            // Reset State
            this.setState({
                documents: []
            });
            this.loadDocumentType();
        }
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
    showDocumentTypes() {
        const files = this.state.documents;
        const filesList = files.map((doc, idx) =>
        {
            return(
                <div key={idx}>
                    <h5>{doc.typeName}</h5>
                    {doc.documents.map((document,idxDocument)=>
                            <div key={idxDocument}>
                                <a href={document.documentName} target={"_blank"}>{document.title}</a>
                            </div>

                    )}
                </div>
            )
        });

        return (
            <div>{filesList}</div>
        );
    }


    display() {
        const files = this.state.files;
        const filesList = files.map((file, idx) =>
            <li key={idx}><a href={file}>{file}</a></li>
        );
        return (
            <ul>{filesList}</ul>
        );
    }

    addDocument() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Type Name</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" name="typeName"
                                      placeholder="Enter type name"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }

    render() {
        return (
            <Container>
                {this.showDocumentTypes()}
                <Row><Col>{this.addDocument()}</Col></Row>
                <Row>
                    <Col md={6}>
                        <Form onSubmit={this.createNewDocument}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control onChange={this.handleChange} type="text" name={"title"} id={"title"} placeholder="Enter title" />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Dokument typer</Form.Label>
                                {this.getOptionsDocumentType()}
                            </Form.Group>
                            <Form.Label>Ladda upp filen</Form.Label>
                            <Form.File
                                id="file"
                                name="file"
                                onChange={this.handleOnFileChange}
                            />
                            <Button type="submit">Upload</Button>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <Form onSubmit={this.uploadAssociationLogo}>
                        <Form.Label>Upload logo</Form.Label>
                        <Form.File
                            id="logo"
                            name="logo"
                            onChange={this.handleOnFileChange}
                            // custom
                        />
                        <Button type="submit">Upload</Button>
                    </Form></Col>


                </Row>
            </Container>
        );
    }
}

export default FileUpload;
import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {createDocumentType, fileUpload, getAllFiles} from "../../util/APIUtils";
import {notification} from "antd";

class FileUpload extends Component{
    constructor(props) {
        super(props);
        this.state={
            file:null,
            files:[],
            isLoading:false,
            documents:[]
        }
        this.uploadFile=this.uploadFile.bind(this);
        this.handleOnFileChange=this.handleOnFileChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.loadFiles=this.loadFiles.bind(this);
        this.loadDocumentType=this.loadDocumentType.bind(this);
    }
    uploadFile(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append('file',this.state.file)
        fileUpload(formData)
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



    loadFiles(){
        let promise;
        promise=getAllFiles();
        this.setState({
            isLoading: true,
            files:[]
        });
        console.log(promise);
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
            [e.target.id] : file
        })
    }
    loadDocumentType(){
        this.setState({
            documents:this.props.documents
        })
    }
    componentDidMount(): void {
        this.loadFiles();
        this.loadDocumentType();
    }
    display(){
        const files = this.state.files;
        const filesList = files.map((file,idx)=>
            <li key={idx}><a href={file}>{file}</a></li>
        );
        return(
            <ul>{filesList}</ul>
        );
    }
    showDocumentTypes(){
        const files = this.state.documents;
        const filesList = files.map((doc,idx)=>
            <div key={idx}>{doc.typeName}</div>
        );
        return(
            <div>{filesList}</div>
        );
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit(event){
        event.preventDefault();
        const createDocumentTypeRequest={
            typeName:this.state.typeName,
            associationNameId:this.props.match.params.associationId
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
        console.log("Did updateFile")
        if(this.props.documents !== nextProps.documents) {
            // Reset State
            this.setState({
                documents:[]
            });
            this.loadDocumentType();
        }


    }
    addDocument(){
        console.log(this.state.typeName)
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Type Name</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" name="typeName" placeholder="Enter type name" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col md={6}>
                        {this.addDocument()}
                        <Form onSubmit={this.uploadFile}>
                                <Form.Label>Upload file</Form.Label>
                                <Form.File
                                    id="file"
                                    name="file"
                                    label="Custom file input"
                                    onChange={this.handleOnFileChange}
                                    // custom
                                />
                                <Button type="submit">Upload</Button>
                        </Form>
                        {this.display()}
                        {this.showDocumentTypes()}
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default FileUpload;
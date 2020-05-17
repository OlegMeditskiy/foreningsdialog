import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import {notification} from "antd";
import {createNews} from "../../util/CreateAPI";

class News extends Component{
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            isLoading: false,
            newsTitle:'',
            newsText:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        const saveNewsRequest={
            newsTitle:this.state.newsTitle,
            newsText:this.state.newsText,
            associationNameId:this.props.match.params.associationId
        }
        createNews(saveNewsRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Du har skapat nyhet",
                });
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    addNews(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nyhet titel</Form.Label>
                        <Form.Control onChange={this.handleChange} name={"newsTitle"} type={"text"} placeholder="Nyhet titel">

                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nyhet text</Form.Label>
                        <Form.Control onChange={this.handleChange} name={"newsText"} className={"newsText"} as="textarea" rows="10" placeholder="Nyhet text">
                        </Form.Control>
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
            this.addNews()
        )
    }
}
export default News;
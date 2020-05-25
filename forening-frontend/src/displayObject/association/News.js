import React, {Component} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {notification} from "antd";
import {createNews} from "../../util/CreateAPI";
import Moment from 'react-moment';
import 'moment-timezone';
import './News.css'
import {deleteNews} from "../../util/DeleteAPI";
import NewsList from "./NewsList";

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
        this.deleteNewsFunction = this.deleteNewsFunction.bind(this);
        this.loadNewsList=this.loadNewsList.bind(this);
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
                this.props.load();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }
    loadNewsList(){
        this.setState({
            news: this.props.news,
        })
    }
    componentDidMount(): void {

        this.loadNewsList();
    }
    componentDidUpdate(nextProps) {

        if (this.props.news !== nextProps.news) {
            this.setState({
                news: []
            });
            this.loadNewsList();
        }
    }
    deleteNewsFunction(event,id) {
        event.preventDefault();
        const deleteNewsRequest = {
            id: id
        }
        deleteNews(deleteNewsRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Du har tagit bort nyhet",
                });
                this.props.load();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    addNews(){
        return(
            <div className={"site-block"}>
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
                    <Button variant="secondary" type="submit">
                        Lägga till
                    </Button>
                </Form>
            </div>
        )
    }
    render() {

        return (
            <div>
                {this.addNews()}
                <NewsList news={this.state.news} {...this.props}/>
            </div>

        )
    }
}
export default News;
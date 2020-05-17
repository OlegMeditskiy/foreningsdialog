import React, {Component} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {notification} from "antd";
import {createNews} from "../../util/CreateAPI";
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment-timezone';
import './News.css'
import {deleteNews} from "../../util/DeleteAPI";
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
    newsList(){
        this.state.news.sort(function(a,b){
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        const newsList = this.state.news.map((news,idx)=>{
            return(
                <div className={"news"} key={idx}>
                    <div>
                        <h4>{news.newsTitle}
                            <Form onSubmit={event=>this.deleteNewsFunction(event, news.id)}>
                                <Button variant="primary" type="submit">
                                    Ta bort
                                </Button>
                            </Form></h4>
                    </div>
                    <div>
                        <Moment format={"YYYY-MM-DD HH:mm"}>{news.createdAt}</Moment>
                    </div>
                    <br/>
                    <div>

                        {news.newsText.split("\n").map((i,key) => {
                            return <p key={key}>{i}</p>;
                        })}

                    </div>

                </div>
            )
        })
        return(
            <Container>
                {newsList}
            </Container>
        )
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
            <div>
                {this.addNews()}
                {this.newsList()}
            </div>

        )
    }
}
export default News;
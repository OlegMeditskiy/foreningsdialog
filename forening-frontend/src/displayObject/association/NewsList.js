import React, {useState} from "react";
import {Form, notification, Popconfirm} from "antd";
import {deleteNews} from "../../util/DeleteAPI";
import {saveNews} from "../../util/SaveAPI";
import {returns} from "../Tables/EditableCell";
import Moment from 'react-moment';
import 'moment-timezone';
const NewsList = (props) => {

    const originData = []
    const news = props.news;
    news.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    news.forEach((news, idx) => {
        originData.push({
            key: idx,
            id: news.id,
            newsText:news.newsText,
            newsTitle:news.newsTitle,
            createdAt:news.createdAt
        })
    });



    const EditableTable = () => {
        const [form] = Form.useForm();
        const [data, setData] = useState(originData);
        const [editingKey, setEditingKey] = useState('');

        const isEditing = record => record.key === editingKey;

        const edit = record => {
            form.setFieldsValue({...record});
            setEditingKey(record.key);
        };

        const cancel = () => {
            setEditingKey('');
        };

        const deleteNewsFunction = async id => {
            const deleteNewsRequest = {
                id: id
            }
            deleteNews(deleteNewsRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Du har tagit bort nyhet",
                    });
                    props.load();
                }).catch(() => {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: 'Sorry! Something went wrong. Please try again!'
                });
            });

        }
        const save = async key => {
            try {
                const row = await form.validateFields();
                const newData = [...data];
                const index = newData.findIndex(item => key === item.key);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {...item, ...row});
                    setData(newData);
                    setEditingKey('');
                } else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                }

                const saveNewsRequest = {
                    newsText: newData[index].newsText,
                    newsTitle: newData[index].newsTitle,
                    newsId: newData[index].id,
                };

                saveNews(saveNewsRequest)
                    .then(() => {
                        notification.success({
                            message: 'Föreningsdialog App',
                            description: "Du har uppdaterat nyhet",
                        });
                        props.load();
                    }).catch(() => {
                    notification.error({
                        message: 'Föreningsdialog App',
                        description: 'Sorry! Something went wrong. Please try again!'
                    });
                });

            } catch (errInfo) {
                console.log('Validate Failed:', errInfo);
            }
        };

        function compareByAlph (a, b) { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }
        const columns = [
            {
                title: 'Datum',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render:(text)=><Moment format={"YYYY-MM-DD HH:mm"}>{text}</Moment>,
                sorter: {
                    compare: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                },
                editable: true,
            },
            {
                title: 'Nyhet titel',
                dataIndex: 'newsTitle',
                key: 'newsTitle',
                sorter: {
                    compare: (a, b) => compareByAlph(a.newsTitle,b.newsTitle)
                },
                editable: true,
            },
            {
                title: 'Nyhet text',
                dataIndex: 'newsText',
                key: 'newsText',
                editable: true,
            },
            {
                title: 'Ändra',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = isEditing(record);
                    return editable ? (
                        <span>
            <button className={"unstyled-button"}

                    onClick={(event) => {
                        event.preventDefault();
                        save(record.key)
                    }}
                    style={{
                        marginRight: 8,
                    }}
            >
              Spara
            </button>
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
              <button className={"unstyled-button"}>Cancel</button>
            </Popconfirm>
          </span>
                    ) : (
                        <button className={"unstyled-button"} disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Ändra
                        </button>
                    );
                },
            },
            {
                title: 'Ta bort',
                dataIndex: 'delete',
                render: (text, record) => (
                    <Popconfirm title="Är du säker att du vill ta bort nyhet?" onConfirm={(event) => {
                        event.preventDefault();
                        deleteNewsFunction(record.id)
                    }}>
                        <button className={"unstyled-button"}>Ta bort</button>
                    </Popconfirm>
                ),
            },
        ];
        return(returns(columns,isEditing,form,data,cancel))
    };
    return (
        <div>
            <div className={"site-block"}><EditableTable/></div>
        </div>
    );
}

export default NewsList;
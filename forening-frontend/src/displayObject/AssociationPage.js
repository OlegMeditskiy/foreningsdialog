import React, { useState,Component } from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Button, notification} from 'antd';
import {createNewAssociation, saveAssociation} from "../util/APIUtils";


const AssociationPage =(props)=>{
    // console.log("Organizations"+props.organizations)
    // console.log(props)
    // const columns=[
    //     {
    //         title: 'Föreningsnamn',
    //         dataIndex: 'associationName',
    //         key: 'associationName',
    //         sorter: {
    //             compare: (a, b) => a.associationName - b.associationName
    //         },
    //     },
    //     {
    //         title: 'Hus',
    //         key: 'action',
    //         render: (text, record) => (
    //             <span>
    //             <a onClick={event => {redirectToHouses(event,record)}}>Hus</a>
    //   </span>
    //         ),
    //     },
    //     {
    //         title: 'Kontakter',
    //         key: 'action',
    //         render: (text, record) => (
    //             <span>
    //             <a onClick={event => {redirectToContacts(event,record)}}>Kontakter</a>
    //   </span>
    //         ),
    //     },
    // ]
    // const dataSource=[]
    // const organization = props.organizations[props.location.state.orgIndex];
    // props.organizations.map((org,idx)=>{
    //
    //     dataSource.push({
    //         key:idx+1,
    //         id:org.id,
    //         associationName:org.associationName,
    //         houses: org.houses,
    //         contacts: org.contacts
    //     })
    // })
    // function onChange(pagination, filters, sorter, extra) {
    //     console.log('params', pagination, filters, sorter, extra);
    // }
    function redirectToHouses(event,record){
        console.log(props);
        return props.history.push(`association/${record.id}/houses`,{houses: record.houses})
    }
    function redirectToContacts(event,record){
        console.log(props);
        return props.history.push(`association/${record.id}/contacts`,{contacts: record.contacts})
    }
    const originData = []
    props.organizations.map((org1,idx)=>{
        if (org1.id==props.match.params.organisationId){
            org1.associations.map((association,idx)=>{
                originData.push({
                    key:idx+1,
                    id:association.id,
                    associationName:association.associationName,
                    houses: association.houses,
                    contacts: association.contacts,
                    association:association,
                    organisation: org1
                })
            })
        }});

    const EditableCell = ({
                              editing,
                              dataIndex,
                              title,
                              inputType,
                              record,
                              index,
                              children,
                              ...restProps
                          }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const EditableTable = () => {
        const [form] = Form.useForm();
        const [data, setData] = useState(originData);
        const [editingKey, setEditingKey] = useState('');

        const isEditing = record => record.key === editingKey;

        const edit = record => {
            form.setFieldsValue({ ...record });
            setEditingKey(record.key);
        };

        const cancel = () => {
            setEditingKey('');
        };

        const add = () =>{
            const createNewAssociationRequest ={
                userId: props.currentUser.id,
            }
            createNewAssociation(createNewAssociationRequest)
                .then(response => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Thank you! You have created new association!",
                    });
                    props.update();
                }).catch(error => {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
        }

        const save = async key => {
            console.log([...data][0].association)
            try {
                const row = await form.validateFields();
                const newData = [...data];
                const index = newData.findIndex(item => key === item.key);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...row });
                    setData(newData);
                    setEditingKey('');
                } else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                }

                const saveAssociationRequest = {
                    association: [...data][0].association,
                    associationName:newData[0].associationName
                };
                saveAssociation(saveAssociationRequest)
                    .then(response => {
                        notification.success({
                            message: 'Föreningsdialog App',
                            description: "Thank you! You have created new organizations! Please wait for their acceptation",
                        });
                        props.update();
                    }).catch(error => {
                    notification.error({
                        message: 'Föreningsdialog App',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });});

            } catch (errInfo) {
                console.log('Validate Failed:', errInfo);
            }
        };

        const columns = [
            {
                title: 'Föreningsnamn',
                dataIndex: 'associationName',
                key: 'associationName',
                sorter: {
                    compare: (a, b) => a.associationName - b.associationName
                },
                editable:true
            },
            {
                title: 'Hus',
                key: 'action',
                render: (text, record) => (
                    <span>
                <a onClick={event => {redirectToHouses(event,record)}}>Hus</a>
      </span>
                ),
            },
            {
                title: 'Kontakter',
                key: 'action',
                render: (text, record) => (
                    <span>
                <a onClick={event => {redirectToContacts(event,record)}}>Kontakter</a>
      </span>
                ),
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = isEditing(record);
                    return editable ? (
                        <span>
            <a
                href="#"
                onClick={(event) => {event.preventDefault();save(record.key)}}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                    ) : (
                        <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </a>
                    );
                },
            },
        ];
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        const mergedColumns = columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });
        return (
            <div>
                <Button onClick={add}>Add</Button>
                <Form form={form} component={false}>
                <Table
                    components={components}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
            </div>

        );
    };

        return(
            <div>
        <EditableTable/>
        {/*        <Table*/}
        {/*            dataSource={dataSource} onChange={onChange} columns={columns} />*/}

            </div>
        );
}

export default AssociationPage;
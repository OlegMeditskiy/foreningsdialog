import React, {useState} from "react";
import {Form, Input, InputNumber, notification, Popconfirm, Table} from "antd";
import {deleteContactFromAssociation, saveContact} from "../../util/APIUtils";
import NewContact from "./NewContact";

const ContactPage =(props)=>{
    const originData = []

                    props.contacts.map((contact,idx)=>{
                        originData.push({
                            key:idx,
                            id:contact.id,
                            contactName:contact.contactName,
                            contactEmail:contact.contactEmail,
                            contactTelephone:contact.contactTelephone,
                        })
                    });

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

        const deleteContact=async id=>{
            const deleteData = [...data];
            const index = deleteData.findIndex(item => id === item.id);
            const deleteContactRequest={
                associationId:props.match.params.associationId,
                contactId:id
            }
            deleteContactFromAssociation(deleteContactRequest)
                .then(response => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "You have deleted association",
                    });
                    props.load();
                }).catch(error => {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });});

        }
        const save = async key => {
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

                const saveContactRequest = {
                    contactId: newData[index].id,
                    contactEmail:newData[index].contactEmail,
                    contactName:newData[index].contactName,
                    contactTelephone:newData[index].contactTelephone,

                };

                saveContact(saveContactRequest)
                    .then(response => {
                        notification.success({
                            message: 'Föreningsdialog App',
                            description: "You have updated association",
                        });
                        // props.update();
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
                title: 'Namn',
                dataIndex: 'contactName',
                key: 'contactName',
                sorter: {
                    compare: (a, b) => a.contactName - b.contactName
                },
                editable:true,
            },
            {
                title: 'E-mail',
                dataIndex: 'contactEmail',
                key: 'contactEmail',
                sorter: {
                    compare: (a, b) => a.contactEmail - b.contactEmail
                },
                editable:true,
            },
            {
                title: 'Telefonnummer',
                dataIndex: 'contactTelephone',
                key: 'contactTelephone',
                sorter: {
                    compare: (a, b) => a.contactTelephone - b.contactTelephone
                },
                editable:true,
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
            {
                title: 'Delete',
                dataIndex: 'delete',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={(event) => {event.preventDefault();deleteContact(record.id)}}>
                        <a>Delete</a>
                    </Popconfirm>
                ),
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
            <NewContact {...props} update={props.update}/>
            <EditableTable/>
            {/*<Table*/}
            {/*    dataSource={dataSource} onChange={onChange} columns={columns} />;*/}

        </div>
    );
}

export default ContactPage;
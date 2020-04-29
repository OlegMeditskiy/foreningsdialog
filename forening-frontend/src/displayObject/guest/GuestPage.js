import React, {useState} from "react";
import {Form, notification, Popconfirm, Table} from "antd";
import {deleteGuestFromAssociation, saveGuest} from "../../util/APIUtils";
import {EditableCell} from "../Tables/EditableCell";
import NewGuest from "./NewGuest";

const GuestPage = (props)=>{
    // console.log(props)
    const originData = []
                                    props.guests.forEach((guest,idx)=> {
                                        originData.push({
                                            key: idx,
                                            id: guest.id,
                                            email: guest.email,
                                            name: guest.name,
                                        })
                                    });


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

        const deleteGuest=async id=>{
            console.log(id)
            const deleteGuestRequest={
                apartmentId:props.match.params.apartmentId,
                guestId:id
            }
            deleteGuestFromAssociation(deleteGuestRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "You have deleted association",
                    });
                    props.load();
                }).catch(() => {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: 'Sorry! Something went wrong. Please try again!'
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

                const saveGuestRequest = {
                    guestId: newData[index].id,
                    email:newData[index].email,
                };

                saveGuest(saveGuestRequest)
                    .then(() => {
                        notification.success({
                            message: 'Föreningsdialog App',
                            description: "You have updated association",
                        });
                        // props.update();
                    }).catch(() => {
                    notification.error({
                        message: 'Föreningsdialog App',
                        description: 'Sorry! Something went wrong. Please try again!'
                    });});

            } catch (errInfo) {
                console.log('Validate Failed:', errInfo);
            }
        };



        const columns = [
            {
                title: 'Namn',
                dataIndex: 'name',
                key: 'name',
                sorter: {
                    compare: (a, b) => a.name - b.name
                },
            },
            {
                title: 'E-mail',
                dataIndex: 'email',
                key: 'email',
                sorter: {
                    compare: (a, b) => a.area - b.area
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
            <button className={"unstyled-button"}

                onClick={(event) => {event.preventDefault();save(record.key)}}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </button>
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
              <button className={"unstyled-button"} >Cancel</button>
            </Popconfirm>
          </span>
                    ) : (
                        <button className={"unstyled-button"}  disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </button>
                    );
                },
            },
            {
                title: 'Delete',
                dataIndex: 'delete',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={(event) => {event.preventDefault();deleteGuest(record.id)}}>
                        <button className={"unstyled-button"} >Delete</button>
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
            <NewGuest {...props} update={props.update}/>
            <EditableTable/>

        </div>
    );
}

export default GuestPage;
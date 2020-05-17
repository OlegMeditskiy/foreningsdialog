import React, {useState} from "react";
import {Form, notification, Popconfirm} from "antd";

import {returns} from "../Tables/EditableCell";
import NewGuest from "./NewGuest";
import {deleteGuestFromAssociation} from "../../util/DeleteAPI";
import {saveGuest, sendMailToGuest} from "../../util/SaveAPI";

const GuestPage = (props) => {
    const originData = []
    props.guests.forEach((guest, idx) => {
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
            form.setFieldsValue({...record});
            setEditingKey(record.key);
        };

        const cancel = () => {
            setEditingKey('');
        };

        const deleteGuest = async id => {

            const deleteGuestRequest = {
                apartmentId: props.match.params.apartmentId,
                guestId: id
            }
            deleteGuestFromAssociation(deleteGuestRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Du har tagit bort gäst",
                    });
                    props.load();
                }).catch(() => {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: 'Sorry! Something went wrong. Please try again!'
                });
            });

        }
        const sendMail = async id => {

            const sendMailRequest = {
                guestId: id
            }
            sendMailToGuest(sendMailRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Post var skickad",
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

                const saveGuestRequest = {
                    guestId: newData[index].id,
                    email: newData[index].email,
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
                    });
                });

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
                dataIndex: 'taBort',
                render: (text, record) => (
                    <Popconfirm title="Är du saker att du vill ta bort gäst?" onConfirm={(event) => {
                        event.preventDefault();
                        deleteGuest(record.id)
                    }}>
                        <button className={"unstyled-button"}>Ta bort</button>
                    </Popconfirm>
                ),
            },
            {
                title: 'Skicka registrerings post',
                dataIndex: 'send',
                render: (text, record) => (
                    <Popconfirm title="Skicka registrerings post till gäst?" onConfirm={(event) => {
                        event.preventDefault();
                        sendMail(record.id)
                    }}>
                        <button className={"unstyled-button"}>Skicka post</button>
                    </Popconfirm>
                ),
            },
        ];
return(returns(columns,isEditing,form,data,cancel))
    };
    return (
        <div>
            <NewGuest {...props} update={props.update}/>
            <EditableTable/>

        </div>
    );
}

export default GuestPage;
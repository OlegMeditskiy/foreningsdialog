import React, {useState} from "react";
import {Form, notification, Popconfirm} from "antd";
import NewContact from "./NewContact";
import {deleteContactFromAssociation} from "../../util/DeleteAPI";
import {saveContact} from "../../util/SaveAPI";
import {returns} from "../Tables/EditableCell";

const ContactsList = (props) => {
    const originData = []

    props.contacts.forEach((contact, idx) => {
        originData.push({
            key: idx,
            id: contact.id,
            contactName: contact.contactName,
            contactEmail: contact.contactEmail,
            contactTelephone: contact.contactTelephone,
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

        const deleteContact = async id => {
            const deleteContactRequest = {
                associationId: props.match.params.associationId,
                contactId: id
            }
            deleteContactFromAssociation(deleteContactRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Du har tagit bort kontakt",
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

                const saveContactRequest = {
                    contactId: newData[index].id,
                    contactEmail: newData[index].contactEmail,
                    contactName: newData[index].contactName,
                    contactTelephone: newData[index].contactTelephone,

                };

                saveContact(saveContactRequest)
                    .then(() => {
                        notification.success({
                            message: 'Föreningsdialog App',
                            description: "Du har uppdaterat kontakt",
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



        function compareByAlph (a, b) { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }
        const columns = [
            {
                title: 'Namn',
                dataIndex: 'contactName',
                key: 'contactName',
                sorter: {
                    compare: (a, b) => compareByAlph(a.contactName,b.contactName)
                },
                editable: true,
            },
            {
                title: 'E-mail',
                dataIndex: 'contactEmail',
                key: 'contactEmail',
                sorter: {
                    compare: (a, b) =>compareByAlph(a.contactEmail,b.contactEmail)
                },
                editable: true,
            },
            {
                title: 'Telefonnummer',
                dataIndex: 'contactTelephone',
                key: 'contactTelephone',
                sorter: {
                    compare: (a, b) => a.contactTelephone - b.contactTelephone
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
                dataIndex: 'delete',
                render: (text, record) => (
                    <Popconfirm title="Är du säker att du vill ta bort kontakt?" onConfirm={(event) => {
                        event.preventDefault();
                        deleteContact(record.id)
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
            <div className={"site-block"}><NewContact {...props} update={props.update}/></div>
            <div className={"site-block"}><EditableTable/></div>

        </div>
    );
}

export default ContactsList;
import React, {useEffect, useState} from "react";
import {Form, notification, Popconfirm} from "antd";
import {deleteAssociationFromOrganization} from "../../util/DeleteAPI";
import {saveAssociation} from "../../util/SaveAPI";
import {returns} from "./EditableCell";


const AssociationTable = (props) => {
    function redirectToAssociation(event, record) {
        return props.history.push({pathname: `/association/${record.id}`})
    }

    const [form] = Form.useForm();
    const [data, setData] = useState(props.originData);
    useEffect(() => {
        setData(props.originData);
    }, [props.originData])
    const [editingKey, setEditingKey] = useState('');
    const isEditing = record => record.key === editingKey;
    const edit = record => {
        form.setFieldsValue({...record});
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const deleteAssociation = async id => {
        const deleteData = [...data];
        const index = deleteData.findIndex(item => id === item.id);
        const deleteAssociationRequest = {
            association: deleteData[index].association,
            organizationId: props.match.params.organisationId
        }
        deleteAssociationFromOrganization(deleteAssociationRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Du har tagit bort förening",
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

            const saveAssociationRequest = {
                association: newData[index].association,
                associationName: newData[index].associationName
            };

            saveAssociation(saveAssociationRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "You have updated association",
                    });
                }).catch(() => {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: 'Sorry! Something went wrong. Please try again!'
                });
            });

        } catch (errInfo) {

        }
    };

    function compareByAlph (a, b) { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }
    const columns = [
        {
            title: 'Förening',
            key: 'action',
            render: (text, record) => (
                <span>
               <button className={"unstyled-button"}
                       onClick={event => {
                           redirectToAssociation(event, record)
                       }}>Öppna</button>
      </span>
            ),
        },
        {
            title: 'Föreningsnamn',
            dataIndex: 'associationName',
            key: 'associationName',
            sorter: {
                compare: (a, b) =>compareByAlph(a.associationName,b.associationName)
            },
            editable: true
        },
        {
            title: "Ändra",
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
                    <button className={"unstyled-button"}
                            disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Ändra
                    </button>
                );
            },
        },
        {
            title: 'Ta bort',
            dataIndex: 'delete',
            render: (text, record) => (
                <Popconfirm title="Är du säker att du vill ta bort förening?" onConfirm={(event) => {
                    event.preventDefault();
                    deleteAssociation(record.id)
                }}>
                    <button className={"unstyled-button"}>Ta bort</button>
                </Popconfirm>
            ),
        },
    ];

    return(
        returns(columns,isEditing,form,data,cancel)
    )
};


export default AssociationTable;
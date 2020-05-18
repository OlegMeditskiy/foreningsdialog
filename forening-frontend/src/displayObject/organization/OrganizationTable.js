import React, {useEffect, useState} from "react";
import {Form, notification, Popconfirm} from "antd";
import {deleteOrganization} from "../../util/DeleteAPI";
import {returns} from "../Tables/EditableCell";

const OrganizationTable =(props)=>{
    function redirectToOrganisation(event, record) {
        return props.history.push({pathname: `/organisation/${record.id}`})
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
    const deleteOrganizationFunction = async id => {
        const deleteAssociationRequest = {
            id: id,
        }
        deleteOrganization(deleteAssociationRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Du har tagit bort organization",
                });
                props.update();
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

            const saveOrganizationRequest = {
                id: newData[index].id,
                orgNumber: newData[index].orgNumber,
                totalArea:newData[index].totalArea,
                numberOfApartments:newData[index].numberOfApartments
            };

            props.saveMethod(saveOrganizationRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "You have updated association",
                    });
                    props.update();
                }).catch(() => {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: 'Sorry! Something went wrong. Please try again!'
                });
            });

        } catch (errInfo) {

        }
    };
    const columns = [
        {
            title: 'Organisation',
            key: 'action',
            render: (text, record) => (
                <span>
                <button className={"unstyled-button"} onClick={event => {
                    redirectToOrganisation(event, record)
                }}>Öppna
                </button>
      </span>
            ),
        },
        {
            title: 'Organisationsnummer',
            dataIndex: 'orgNumber',
            key: 'orgNumber',
            sorter: {
                compare: (a, b) => a.orgNumber - b.orgNumber
            },
            editable: true
        },
        {
            title: 'Area',
            dataIndex: 'totalArea',
            key: 'totalArea',
            sorter: {
                compare: (a, b) => a.totalArea - b.totalArea
            },
            editable: true
        },
        {
            title: 'Antal lägenheter',
            dataIndex: 'numberOfApartments',
            key: 'numberOfApartments',
            sorter: {
                compare: (a, b) => a.numberOfApartments - b.numberOfApartments
            },
            editable: true
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
                <Popconfirm title="Är du säker att du vill ta bort organisation?" onConfirm={(event) => {
                    event.preventDefault();
                    deleteOrganizationFunction(record.id)
                }}>
                    <button className={"unstyled-button"}>Ta bort</button>
                </Popconfirm>
            ),
        }
    ]


    return(
        returns(columns,isEditing,form,data,cancel)
    )
}
export default OrganizationTable;
import React, {useState} from "react";
import {Form, notification, Popconfirm} from "antd";
import NewHouse from "./NewHouse";
import {deleteHouseFromAssociation} from "../../util/DeleteAPI";
import {saveHouse} from "../../util/SaveAPI";
import {returns} from "../Tables/EditableCell";

const HousesList = (props) => {
    function redirectToHouse(event, record) {
        return props.history.push({pathname: `/house/${record.id}`})
    }

    const originData = []

    props.houses.forEach((house, idx) => {
        originData.push({
            key: idx,
            id: house.id,
            street: house.street,
            city: house.city,
            zipCode: house.zipCode,
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

        const deleteHouse = async id => {
            const deleteHouseRequest = {
                associationId: props.match.params.associationId,
                houseId: id
            }
            deleteHouseFromAssociation(deleteHouseRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Du har tagit bort hus",
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

                const saveHouseRequest = {
                    houseId: newData[index].id,
                    street: newData[index].street,
                    city: newData[index].city,
                    zipCode: newData[index].zipCode,

                };

                saveHouse(saveHouseRequest)
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
        function compareByAlph (a, b) { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }
        const columns = [

            {
                title: 'Öppna',
                key: 'action',
                render: (text, record) => (
                    <span>
                <button className={"unstyled-button"} onClick={event => {
                    redirectToHouse(event, record)
                }}>Öppna</button>
      </span>
                ),
            },
            {
                title: 'Gatudaddress',
                dataIndex: 'street',
                key: 'street',
                sorter: (a, b) => compareByAlph(a.street,b.street),
                editable: true,
            },
            {
                title: 'Ort',
                dataIndex: 'city',
                key: 'city',
                sorter: {
                    compare: (a, b) => compareByAlph(a.city,b.city)
                },
                editable: true,
            },
            {
                title: 'Postnummer',
                dataIndex: 'zipCode',
                key: 'zipCode',
                sorter: {
                    compare: (a, b) => a.zipCode - b.zipCode
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
                    <Popconfirm title="Är du säker att du vill ta bort hus?" onConfirm={(event) => {
                        event.preventDefault();
                        deleteHouse(record.id)
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
            <div className={"site-block"}><NewHouse {...props} update={props.update}/></div>
            <div className={"site-block"}><EditableTable/></div>
        </div>
    );
}

export default HousesList;
import React, {useState} from "react";
import {Form, notification, Popconfirm} from "antd";
import {returns} from "../Tables/EditableCell";
import NewApartment from "./NewApartment";
import {deleteApartmentFromAssociation} from "../../util/DeleteAPI";
import {saveApartment} from "../../util/SaveAPI";

const ApartmentsPage = (props) => {
    const originData = []
    props.apartments.forEach((apartment, idx) => {
        originData.push({
            key: idx,
            id: apartment.id,
            number: apartment.number,
            area: apartment.area,
            roomAndKitchen: apartment.roomAndKitchen,
            guests: apartment.guests
        })
    });

    function redirectToApartment(event, record) {
        return props.history.push({pathname: `/apartment/${record.id}`})
    }

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

        const deleteApartment = async id => {
            const deleteApartmentRequest = {
                houseId: props.match.params.houseId,
                apartmentId: id
            }
            deleteApartmentFromAssociation(deleteApartmentRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Du har tagit bort lägenhet",
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

                const saveApartmentRequest = {
                    apartmentId: newData[index].id,
                    number: newData[index].number,
                    area: newData[index].area,
                    roomAndKitchen: newData[index].roomAndKitchen,

                };

                saveApartment(saveApartmentRequest)
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


        const columns = [
            {
                title: 'Lägenhet',
                key: 'action',
                render: (text, record) => (
                    <span>
                <button className={"unstyled-button"}
                        onClick={event => redirectToApartment(event, record)}>Öppna</button>
      </span>
                ),
            },
            {
                title: 'Lägenhetsnummer',
                dataIndex: 'number',
                key: 'number',
                sorter: {
                    compare: (a, b) => a.number - b.number
                },
                editable: true,
            },
            {
                title: 'Area',
                dataIndex: 'area',
                key: 'area',
                sorter: {
                    compare: (a, b) => a.area - b.area
                },
                editable: true,
            },
            {
                title: 'Rum och Kök',
                dataIndex: 'roomAndKitchen',
                key: 'roomAndKitchen',
                sorter: {
                    compare: (a, b) => a.roomAndKitchen - b.roomAndKitchen
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
                    <Popconfirm title="Är du saker att du vill ta bort lägenhet?" onConfirm={(event) => {
                        event.preventDefault();
                        deleteApartment(record.id)
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
            <NewApartment {...props} update={props.update}/>
            <EditableTable/>
            {/*<Table*/}
            {/*    dataSource={dataSource} onChange={onChange} columns={columns} />;*/}

        </div>
    );
}

export default ApartmentsPage;
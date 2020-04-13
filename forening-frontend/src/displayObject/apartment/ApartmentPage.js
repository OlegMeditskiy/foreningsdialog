import React, {useState} from "react";
import {Form, notification, Popconfirm, Table} from "antd";
import {deleteApartmentFromAssociation, saveApartment} from "../../util/APIUtils";
import {EditableCell} from "../Tables/EditableCell";
import NewApartment from "./NewApartment";

const ApartmentsPage =(props)=>{
    const originData = []
                            props.apartments.map((apartment,idx)=>{
                                originData.push({
                                    key:idx,
                                    id:apartment.id,
                                    number:apartment.number,
                                    area:apartment.area,
                                    roomAndKitchen:apartment.roomAndKitchen,
                                    guests:apartment.guests
                                })
                            });
    function redirectToApartment(event,record){
        return props.history.push({pathname:`/apartment/${record.id}`})
    }
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

        const deleteApartment=async id=>{
            const deleteData = [...data];
            const index = deleteData.findIndex(item => id === item.id);

            const deleteApartmentRequest={
                houseId:props.match.params.houseId,
                apartmentId:id
            }
            deleteApartmentFromAssociation(deleteApartmentRequest)
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

                const saveApartmentRequest = {
                    apartmentId: newData[index].id,
                    number:newData[index].number,
                    area:newData[index].area,
                    roomAndKitchen:newData[index].roomAndKitchen,

                };

                saveApartment(saveApartmentRequest)
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
                title: 'Lägenhetsnummer',
                dataIndex: 'number',
                key: 'number',
                sorter: {
                    compare: (a, b) => a.number - b.number
                },
                editable:true,
            },
            {
                title: 'Area',
                dataIndex: 'area',
                key: 'area',
                sorter: {
                    compare: (a, b) => a.area - b.area
                },
                editable:true,
            },
            {
                title: 'Rum och Kök',
                dataIndex: 'roomAndKitchen',
                key: 'roomAndKitchen',
                sorter: {
                    compare: (a, b) => a.roomAndKitchen - b.roomAndKitchen
                },
                editable:true,
            },
            {
                title: 'Open',
                key: 'action',
                render: (text, record) => (
                    <span>
                <a onClick={event => redirectToApartment(event,record)}>Open</a>
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
            {
                title: 'Delete',
                dataIndex: 'delete',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={(event) => {event.preventDefault();deleteApartment(record.id)}}>
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
            <NewApartment {...props} update={props.update}/>
            <EditableTable/>
            {/*<Table*/}
            {/*    dataSource={dataSource} onChange={onChange} columns={columns} />;*/}

        </div>
    );
}

export default ApartmentsPage;
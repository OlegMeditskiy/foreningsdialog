import React, {useState} from "react";
import {Form, Input, InputNumber, notification, Popconfirm, Table} from "antd";
import {
    deleteAssociationFromOrganization,
    deleteHouseFromAssociation,
    saveAssociation,
    saveHouse
} from "../../util/APIUtils";
import NewHouse from "./NewHouse";
import AddNew from "../association/AddNew";

const HousesPage =(props)=>{
    function redirectToHouse(event,record){
        return props.history.push({pathname:`/house/${record.id}`})
    }
    const originData = []

                    props.houses.map((house,idx)=>{
                        originData.push({
                            key:idx,
                            id:house.id,
                            street:house.street,
                            city:house.city,
                            zipCode:house.zipCode,
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

        const deleteHouse=async id=>{
            const deleteData = [...data];
            const index = deleteData.findIndex(item => id === item.id);
            const deleteHouseRequest={
                associationId:props.match.params.associationId,
                houseId:id
            }
            deleteHouseFromAssociation(deleteHouseRequest)
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

                const saveHouseRequest = {
                    houseId: newData[index].id,
                    street:newData[index].street,
                    city:newData[index].city,
                    zipCode:newData[index].zipCode,

                };

                saveHouse(saveHouseRequest)
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
                title: 'Gatudaddress',
                dataIndex: 'street',
                key: 'street',
                sorter: {
                    compare: (a, b) => a.street - b.street
                },
                editable:true,
            },
            {
                title: 'Ort',
                dataIndex: 'city',
                key: 'city',
                sorter: {
                    compare: (a, b) => a.city - b.city
                },
                editable:true,
            },
            {
                title: 'Postnummer',
                dataIndex: 'zipCode',
                key: 'zipCode',
                sorter: {
                    compare: (a, b) => a.zipCode - b.zipCode
                },
                editable:true,
            },
            {
                title: 'Open',
                key: 'action',
                render: (text, record) => (
                    <span>
                <a onClick={event => {redirectToHouse(event,record)}}>Open</a>
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
                    <Popconfirm title="Sure to delete?" onConfirm={(event) => {event.preventDefault();deleteHouse(record.id)}}>
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
            <NewHouse {...props} update={props.update}/>
            <EditableTable/>
        </div>
    );
}

export default HousesPage;
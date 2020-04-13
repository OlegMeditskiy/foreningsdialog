import React, {useEffect, useState} from "react";
import {Form, notification, Popconfirm, Table} from "antd";
import {deleteAssociationFromOrganization, saveAssociation} from "../../util/APIUtils";
import {EditableCell} from "./EditableCell";



const AssociaionTable = (props) => {
    function redirectToAssociation(event,record){
        return props.history.push({pathname:`/association/${record.id}`})
    }
    const [form] = Form.useForm();
    const [data, setData] = useState(props.originData);
    useEffect(() => {
        setData(props.originData);
    }, [props.originData])
    const [editingKey, setEditingKey] = useState('');
    const isEditing = record => record.key === editingKey;
    const edit = record => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const deleteAssociation=async id=>{
        const deleteData = [...data];
        const index = deleteData.findIndex(item => id === item.id);
        const deleteAssociationRequest={
            association:deleteData[index].association,
            organizationId:props.match.params.organisationId
        }
        deleteAssociationFromOrganization(deleteAssociationRequest)
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
                console.log(">1")
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                console.log("<1")
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }

            const saveAssociationRequest = {
                association: newData[index].association,
                associationName:newData[index].associationName
            };

            saveAssociation(saveAssociationRequest)
                .then(response => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "You have updated association",
                    });
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
            title: 'Föreningsnamn',
            dataIndex: 'associationName',
            key: 'associationName',
            sorter: {
                compare: (a, b) => a.associationName - b.associationName
            },
            editable:true
        },
        {
            title: 'Open',
            key: 'action',
            render: (text, record) => (
                <span>
               <a onClick={event => {redirectToAssociation(event,record)}}>Open</a>
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
                <Popconfirm title="Sure to delete?" onConfirm={(event) => {event.preventDefault();deleteAssociation(record.id)}}>
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


export default AssociaionTable;
import React from 'react';
import {Divider, Table} from 'antd';
import {Form} from "react-bootstrap";

const SettingsTable = (props) =>{


    const columns = [
        {
            title: 'Objekt',
            dataIndex: 'objekt',
            render: text => <a href="/#">{text}</a>,
        },
    ];
    const data=[];
    props.loan.forEach((object,idx)=>{
        data.push({
            key: object.id,
            objekt: object.name,
            settings: ''
        })
        switch (object.name) {
            case "Extern lokal": data[idx].settings=
                <p>Extern lokal settings</p>
             break;
            case "Gästlägenhet": data[idx].settings=
                <p>Gästlägenhet settings</p>
                break;
            case "Tvättstuga": data[idx].settings=
                <div>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Tid</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>
                break;
            case "Parkering": data[idx].settings=
                <p>Parkering settings</p>
                break;
            case "Festlokal": data[idx].settings=
                <p>Festlokal settings</p>
                break;
            case "Pool": data[idx].settings=
                <p>Pool settings</p>
                break;
            default:break;
        }
    })
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            name: record.name
        }),
    };
    const Demo = () => {

        return (
            <div>
                <Divider />
                <Table
                    rowSelection={{
                        type: rowSelection,
                    }}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <div style={{ margin: 0 }}>{record.settings}</div>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={data}
                />
            </div>
        );
    };

    return(
        <div>
            <Demo/>
        </div>
    )

}


export default SettingsTable;
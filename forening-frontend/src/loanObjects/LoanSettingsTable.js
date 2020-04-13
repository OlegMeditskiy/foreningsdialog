import React, { useState } from 'react';
// import 'antd/dist/antd.css';
import { Table, Radio, Divider } from 'antd';
import {text} from "@fortawesome/fontawesome-svg-core";

const SettingsTable = (props) =>{


    const columns = [
        {
            title: 'Objekt',
            dataIndex: 'objekt',
            render: text => <a>{text}</a>,
        },
    ];
    const data=[];
    props.loan.map((object,idx)=>{
        data.push({
            key: object.id,
            objekt: object.id,
            settings: ''
        })
        switch (object.id) {
            case 5: data[idx].settings=<p>ffff</p>
             break;
            default:break;
        }
    })
    // const data = [
    //     {
    //         key: '1',
    //         objekt: 'Tvättstuga',
    //         settings: <p>ffff</p>
    //     },
    //     {
    //         key: '2',
    //         objekt: 'Parkering',
    //         settings: <p>ffff</p>,
    //     },
    //     {
    //         key: '3',
    //         objekt: 'Gästlägenhet',
    //         settings: <p>ffff</p> ,
    //     },
    //     {
    //         key: '4',
    //         objekt: 'Festlokal',
    //         settings: <p>ffff</p> ,
    //     },
    //     {
    //         key: '5',
    //         objekt: 'Pool',
    //         settings: <p>ffff</p>,
    //     },
    //     {
    //         key: '6',
    //         objekt: 'Extern Lokal',
    //         settings: <p>ffff</p>,
    //     },
    //
    // ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            name: record.name
        }),
    };
    const Demo = () => {
        const [selectionType, setSelectionType] = useState('checkbox');
        return (
            <div>
                <Divider />
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
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
import {Form, Input, InputNumber, Table} from "antd";
import React from "react";
const { TextArea } = Input;

export const editableCell = ({
                                 editing,
                                 dataIndex,
                                 title,
                                 inputType,
                                 record,
                                 index,
                                 children,
                                 ...restProps
                             }) => {
    const inputNode = inputType === 'textarea' ? <TextArea/> : <Input/>;
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
export const returns=(columns,isEditing,form,data,cancel)=> {
    const components = {
        body: {
            cell: editableCell,
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
                inputType: col.dataIndex === 'newsText' ? 'textarea' : 'text',
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
}



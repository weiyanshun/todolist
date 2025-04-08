import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Input, Table } from "antd";

const TodoList = () => {
  const [dataList, setDataList] = useState([]);
  console.log('dataList',dataList)
  const [inputValue, setInputValue] = useState('');
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (value, record, index) => (
        <a onClick={() => Delete(index)}>Delete</a>
      ),
    },
  ];
  const onInputChange = (e) => {
    const { value } = e.target;
    console.log('value',value)
    setInputValue(value);
  };
  const addList = () => {
    setDataList([{ name: inputValue },...dataList]);
    if (inputValue) {
      setInputValue('');
    }
  };
  const Delete = (index) => {
    const list = [...dataList];
    list.splice(index, 1)
    setDataList([...list]);
  };
  return (
    <div>
      <div>todolist</div>
      <div>
        <Input
          placeholder="Basic usage"
          value={inputValue}
          onChange={onInputChange}
        />
      <Button type="primary" icon={<SearchOutlined />} onClick={addList}>
          Search
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={dataList} />
      </div>
    </div>
  );
};

export default TodoList;

import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Input, Table, Space } from "antd";
import "./TodoList.css";

const TodoList = () => {
  const [dataList, setDataList] = useState([]);
  console.log("dataList", dataList);
  const [inputValue, setInputValue] = useState("");
  const [statusFlag, setStatusFlag] = useState("all");
  const statusMap = {
    all: "全部",
    progress: "进行中",
    finished: "已完成",
  };
  const statuslist = [
    { status: "all", color: "purple", variant: "outlined" },
    { status: "progress", color: "primary", variant: "solid" },
    { status: "finished", color: "cyan", variant: "filled" },
  ];
  const filterdata = (val) => {
    if (val === "progress") {
      const progressList = dataList.filter(
        (item) => item?.status === "progress"
      );
      return progressList;
    } else if (val === "finished") {
      const finishedList = dataList.filter(
        (item) => item?.status === "progress"
      );
      return finishedList;
    }
    return dataList;
  };
  useEffect(() => {}, [statusFlag]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text) => <a>{statusMap[text]}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (value, record, index) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => onFinish(record, index)}
            disabled={record?.status === "finished"}
          >
            Finish
          </Button>
          <Button type="link" onClick={() => onDelete(index)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const onInputChange = (e) => {
    const { value } = e.target;
    console.log("value", value);
    if (value) {
      setInputValue(value);
    }
  };
  const addList = () => {
    if (inputValue) {
      setDataList([{ name: inputValue, status: "progress" }, ...dataList]);
      setInputValue("");
    }
  };
  const onFinish = (record, index) => {
    const list = [...dataList];
    list.splice(index, 1, { name: record?.name, status: "finished" });
    setDataList([...list]);
  };
  const onDelete = (index) => {
    const list = [...dataList];
    list.splice(index, 1);
    setDataList([...list]);
  };
  const filterChange = (status) => {
    setStatusFlag(status);
  };

  return (
    <div>
      <h1>todolist</h1>
      <div className="search-header">
        <Input
          className="input"
          placeholder="请输入"
          value={inputValue}
          onChange={onInputChange}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={addList}>
          Search
        </Button>
      </div>
      <div className="buttonMap">
          {statuslist.map(({ status, color, variant }) => (
            <Button
              className="button"
              color={color}
              variant={variant}
              onClick={() => filterChange(status)}
            >
              {statusMap[status]}
            </Button>
          ))}
        </div>
      <div className="table">
        <Table columns={columns} dataSource={filterdata(statusFlag)} />
      </div>
    </div>
  );
};

export default TodoList;

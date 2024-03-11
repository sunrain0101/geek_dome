// 需求：
// 1. 实现频道本身的功能，获取频道数据，展示频道选项，可以选择频道
// 2. 实现传入频道ID显示对应频道，自己更改频道的时候需要把更改的频道ID传给父组件
// 3. 而且现在是在form表单上使用，要符合form表单的要求，value赋值，onChange改值
import React from "react";
import { useEffect } from "react";
import { getChannels } from "@/store/actions";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
const Channel = ({ width, value, onChange }) => {
  // 频道相关逻辑
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);
  const { channels } = useSelector((state) => state.article);
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e)}
      placeholder="请选择所属频道"
      style={width ? { width } : null}
    >
      {channels.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default Channel;

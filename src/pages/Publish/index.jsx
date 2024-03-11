import React from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Input,
  Space,
  Radio,
  Upload,
  message,
} from "antd";
import {
  editArticle,
  getArticle,
  getChannels,
  addArticle,
} from "@/store/actions";
import { useDispatch } from "react-redux";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import Channel from "@/components/Channel";
const Publish = () => {
  //封面逻辑
  const [type, setType] = useState(1);
  const onTypeChange = (e) => {
    setType(e.target.value);
    //重置上传图片的数据
    setFileList([]);
  };

  const [fileList, setFileList] = useState([]);
  //上传图片
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  //发布逻辑（合并编辑逻辑）
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const onFinish = async (values, draft = false) => {
    if (type !== fileList.length) {
      return message.warning("请按照选择的封面类型上传照片");
    }
    const data = {
      ...values,
      cover: {
        type,
        images: fileList.map((item) => item?.response?.data?.url || item.url),
      },
    };
    console.log(data);
    if (params.id) {
      data.id = params.id;
      await dispatch(editArticle(data, draft));
    } else {
      await dispatch(addArticle(data, draft));
    }
    message.success("保存成功");
    history.push("/home/article");
  };

  //存入草稿
  const saveArticle = async () => {
    // 1. 对表单进行校验，获取values数据
    // 2. 调用onFinish函数传入values和是否存入草稿
    const values = await form.validateFields();
    onFinish(values, true);
  };
  //编辑页面逻辑
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);
  useEffect(() => {
    const initialFormValues = async () => {
      if (params.id) {
        //回显数据
        const { title, channel_id, content, cover } = await dispatch(
          getArticle(params.id)
        );
        form.setFieldsValue({ title, channel_id, content, cover });
        setType(cover.type);
        setFileList(cover.images.map((item) => ({ url: item })));
      } else {
        //编辑状态==》发布状态
        //重置数据
        form.resetFields();
        setType(1);
        setFileList([]);
      }
    };
    initialFormValues();
  }, [dispatch, form, params.id]);
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to="/home/dashboard">首页</Link> },
              { title: <Link to="/home/article">内容管理</Link> },
              { title: `${params.id ? "修改" : "发布"}文章` },
            ]}
          />
        }
      >
        <Form form={form} onFinish={onFinish} labelCol={{ span: 4 }}>
          <Form.Item
            label="文章标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }}></Input>
          </Form.Item>
          <Form.Item
            label="所属频道："
            name="channel_id"
            rules={[{ required: true, message: "请输入所属频道" }]}
          >
            <Channel width={400} />
          </Form.Item>
          <Form.Item label="文章封面">
            <Form.Item style={{ marginBottom: 0 }}>
              <Radio.Group value={type} onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {type > 0 ? (
              <div style={{ marginTop: 16 }}>
                <Upload
                  name="image"
                  listType="picture-card"
                  action="http://geek.itheima.net/v1_0/upload"
                  fileList={fileList}
                  onPreview={() => {}}
                  onChange={onUploadChange}
                >
                  {fileList.length < type ? (
                    <div>
                      <div style={{ marginTop: 8 }}>上传图片</div>
                    </div>
                  ) : null}
                </Upload>
              </div>
            ) : null}
          </Form.Item>
          <Form.Item
            label="文章内容"
            name="content"
            initialValue=""
            wrapperCol={{ span: 16 }}
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill placeholder="请输入文章内容" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {params.id ? "修改" : "发布"}文章
              </Button>
              <Button onClick={saveArticle}>保存草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Publish;

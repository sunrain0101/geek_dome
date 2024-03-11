import React from "react";
import { Layout, Menu, Popconfirm, Button } from "antd";
import "./index.scss";
import {
  LogoutOutlined,
  EditOutlined,
  HomeOutlined,
  DiffOutlined,
} from "@ant-design/icons";
import Dashboard from "../Dashboard";
import NotFound from "../NotFound";
import Article from "../Article";
import Publish from "../Publish";
import logo from "../../assets/logo.png";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { getUserInfo, logout } from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
const { Header, Sider, Content } = Layout;

const GeekLayout = () => {
  const items = [
    {
      label: <Link to="/home/dashboard">数据面板</Link>,
      key: "/home/dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/home/article">内容管理</Link>,
      key: "/home/article",
      icon: <DiffOutlined />,
    },
    {
      label: <Link to="/home/publish">发布文章</Link>,
      key: "/home/publish",
      icon: <EditOutlined />,
    },
  ];
  //页面初始化获取用户信息
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //退出登录
  const history = useHistory();
  const location = useLocation();
  // 激活菜单的key
  let defaultKey = location.pathname;
  if (defaultKey.startsWith("/home/publish")) {
    defaultKey = "/home/publish";
  }
  const onConfirm = () => {
    dispatch(logout());
    history.push("/login");
  };
  const menu = () => {
    
  };
  useEffect(() => {
    try {
      dispatch(getUserInfo());
    } catch {}
  }, [dispatch]);
  useEffect(() => {});
  return (
    <Layout className="geek-layout">
      <Sider width={148}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <Menu
          onSelect={menu}
          defaultSelectedKeys={[defaultKey]}
          mode="inline"
          theme="dark"
          items={items}
          selectedKeys={[location.pathname]}
        ></Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#001529" }}>
          <div>
            <span style={{ color: "#fff" }}>{user.name}</span>
            <Popconfirm
              placement="bottomRight"
              title="是否确认退出？"
              okText="确认"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <Button
                type="link"
                style={{ color: "#fff" }}
                icon={<LogoutOutlined />}
              >
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content>
          <Switch>
            <Route
              path="/home"
              exact
              render={() => <Redirect to="/home/dashboard" />}
            />
            <Route path="/home/dashboard" component={Dashboard} />
            <Route path="/home/article" component={Article} />
            <Route path="/home/publish/:id?" component={Publish} />
            <Route>
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;

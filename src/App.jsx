import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: (<Link to={'/'}>create invoice</Link>),
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: (<Link to={'/invoices'}>invoices</Link>),
            },
            
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          
            <div className="min-h-screen bg-gray-100">
              <div className="mx-auto max-w-7xl">
                <Outlet />
              </div>
            </div>
          
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          {/* footer content */}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
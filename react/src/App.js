import React, { Component } from 'react';
import { Layout, Menu,
//  Breadcrumb
} from 'antd';
//import logo from './logo.svg';

import Catalog from './components/catalog';
// import Form from './components/steps';
//           <Form/>
import './App.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px'}}>
            <Menu.Item key="1">Experiensa</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 85 }}>
          <Catalog/>
          <br/>
          <hr/>
          <br/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Experiensa ©2018 Created by Sevinci Sàrl
        </Footer>
      </Layout>
    );
  }
}


export default App;

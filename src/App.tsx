import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Tabs, Badge } from 'antd-mobile';
import { Book } from './Book/Book';
import { Message } from './Message/Message';
import { Order } from './Order/Order';
import { createForm, formShape } from 'rc-form';

class App extends Component {
  render() {
    const tabs = [
      { title: <Badge>我要订餐</Badge> },
      { title: <Badge>我的订单</Badge> },
      { title: <Badge dot>公告</Badge> }
    ];
    const BookForm = createForm()(Book);
    return (
      <div className="App">
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {
            console.log('onChange', index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab);
          }}
        >
          <div className="content">
            <BookForm />
          </div>
          <div className="content">
            <Order />
          </div>

          <div className="content">
            <Message />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Button, Tabs, Badge } from 'antd-mobile';
import { Book } from '../Book/Book';
import { createForm, formShape } from 'rc-form';
import { Message } from '../Message/Message';
import { Order } from '../Order/Order';
import { Link } from 'react-router-dom';
import './Home.less';

export class Home extends Component {
  state = {
    orderList: [],
    messageList: []
  };
  render() {
    const tabs = [
      { title: <Badge>我要订餐</Badge> },
      { title: <Badge>我的订单</Badge> },
      { title: <Badge dot>公告</Badge> }
    ];
    const BookForm = createForm()(Book);

    return (
      <div className="home">
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {
            console.log('onChange', index, tab);
            if (index === 1) {
              this.setState({ orderList: [] });
            } else if (index === 2) {
              this.setState({ messageList: [] });
            }
          }}
          onTabClick={(tab, index) => {
            // console.log('onTabClick', index, tab);
          }}
        >
          <div className="content">
            <BookForm />
          </div>
          <div className="content">
            <Order orderList={this.state.orderList} />
          </div>

          <div className="content">
            <Message messageList={this.state.messageList} />
          </div>
        </Tabs>
        <Link className="footer" to="./about">
          ©Copyright 2019, evilbinary.org.
        </Link>
      </div>
    );
  }
}

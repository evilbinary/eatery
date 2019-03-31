import React, { Component } from 'react';
import {
  WingBlank,
  DatePicker,
  List,
  Card,
  WhiteSpace,
  Flex,
  Toast
} from 'antd-mobile';
import './Total.less';
import { Base } from '../Common/Base';
import moment from 'moment';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export class Total extends Base {
  state = {
    orderList: [],
    date: now
  };
  type = [
    {
      label: '早餐',
      value: 1
    },
    {
      label: '午餐',
      value: 2
    },
    {
      label: '晚餐',
      value: 3
    }
  ];
  componentWillMount() {}
  componentDidMount() {
    this.getTotal(this.state.date);
  }
  getTotal(d) {
    const start = moment(d).format('YYYY-MM-DD');
    const end = moment(d).add(1,'day').format('YYYY-MM-DD');
    this.client.get(`order/total?start=${start}&end=${end}`).then(ret => {
      if (ret.data.code === 200) {
        this.setState({
          orderList: ret.data.result
        });
      } else {
        Toast.fail(ret.data.message, 1);
      }
    });
  }
  getTypeName(type) {
    const i: any = this.type.find(o => o.value === type);
    return i.label;
  }
  render() {
    const orderList = this.state.orderList;
    return (
      <div className="order">
        <DatePicker
          mode="date"
          value={this.state.date}
          onChange={date => {
            this.setState({ date });
            this.getTotal(date);
          }}
        >
          <List.Item arrow="horizontal">下单时间</List.Item>
        </DatePicker>

        {orderList.map((item: any, index) => (
          <div key={item.id}>
            <WingBlank>
              <WhiteSpace size="lg" />
              <Card>
                <Card.Header
                  title={this.getTypeName(item.type) + '订单'}
                  thumb={item.icon}
                />
                <Card.Body>
                  <Flex
                    direction="column"
                    wrap="wrap"
                    align="start"
                    justify="start"
                  >
                    <Flex.Item>类型：{this.getTypeName(item.type)}</Flex.Item>
                    <Flex.Item>数量：{item.count}份</Flex.Item>
                    <WhiteSpace size="sm" />
                    {/* <Flex.Item>
                      时间：
                      {moment(item.date).format('YYYY年MM月DD日 HH:mm:ss')}
                    </Flex.Item> */}
                    {/* <WhiteSpace size="sm" /> */}
                    {/* <Flex.Item>备注：{item.note}</Flex.Item> */}
                  </Flex>
                </Card.Body>
                {/* <Card.Footer
              content="footer content"
              extra={<div>extra footer content</div>}
            /> */}
              </Card>
            </WingBlank>
          </div>
        ))}
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

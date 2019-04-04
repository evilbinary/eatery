import React, { Component } from 'react';
import { WingBlank, Card, WhiteSpace, Flex, Toast } from 'antd-mobile';
import './Order.less';
import { Base } from '../Common/Base';
import moment from 'moment';

export class Order extends Base {
  state = {
    orderList: []
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
  getList(){
    this.client.get('order/list').then(ret => {
      if (ret.data.code === 200) {
        this.setState({
          orderList: ret.data.result
        });
      } else {
        Toast.fail(ret.data.message, 1);
      }
    });
  }
  componentWillReceiveProps(){
    console.log('componentWillReceiveProps');
    this.getList();
  }
  componentWillMount() {}
  componentDidMount() {
    this.getList();
  }
  getTypeName(type) {
    const i: any = this.type.find(o => o.value === type);
    return i.label;
  }
  render() {
    const orderList = this.state.orderList;
    return (
      <div className="order">
        {orderList.map((item: any, index) => (
          <div key={item.id}>
            <WingBlank>
              <WhiteSpace size="lg" />
              <Card>
                <Card.Header title={'订单编号：' + item.id} thumb={item.icon} />
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
                    <Flex.Item>
                      时间：
                      {moment(item.date).format('YYYY年MM月DD日 HH:mm:ss')}
                    </Flex.Item>
                    <WhiteSpace size="sm" />
                    <Flex.Item>备注：{item.note}</Flex.Item>
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

import React, { Component } from 'react';
import { Button, Card, WhiteSpace, Flex } from 'antd-mobile';
import './Order.less';

export class Order extends Component {
  render() {
    return (
      <div className="order">
        <Card>
          <Card.Header
            title="This is title"
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            extra={<span>2019-01-01 11:20:10</span>}
          />
          <Card.Body>
            <Flex align="start">
              <Flex.Item>午餐：20份</Flex.Item>
              <Flex.Item>备注：无</Flex.Item>
            </Flex>
          </Card.Body>
          <Card.Footer
            content="footer content"
            extra={<div>extra footer content</div>}
          />
        </Card>
      </div>
    );
  }
}

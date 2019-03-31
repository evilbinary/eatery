import React, { Component } from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';

export class About extends Component {
  render() {
    return (
      <div>
        <Flex direction="column" wrap="wrap" align="center" justify="start">
          <Flex.Item>关于</Flex.Item>
          <Flex.Item>作者： 🦆依依鸭</Flex.Item>
          <Flex.Item>主页：http://evilbinary.org</Flex.Item>
          <Flex.Item>邮箱：rootdebug@163.com</Flex.Item>
        </Flex>
      </div>
    );
  }
}

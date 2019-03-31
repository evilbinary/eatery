import React, { Component } from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';
import './Abount.less';

export class About extends Component {
  render() {
    return (
      <div className="about">
        <Flex  direction="column" wrap="wrap" align="start" justify="start">
          <Flex.Item className="title">关于</Flex.Item>
          <Flex.Item className="item">作者： 🦆依依鸭</Flex.Item>
          <Flex.Item className="item">主页：<a href='http://evilbinary.org'>http://evilbinary.org</a></Flex.Item>
          <Flex.Item className="item">邮箱：<a href="mailto:rootdebug@163.com">rootdebug@163.com</a></Flex.Item>
        </Flex>
      </div>
    );
  }
}

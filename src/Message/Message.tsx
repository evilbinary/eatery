import React, { Component } from 'react';
import { Button, NoticeBar, WhiteSpace, Card } from 'antd-mobile';
import { MarqueeProps } from 'antd-mobile/lib/notice-bar/Marquee';
import './Message.less';

export class Message extends Component {
  render() {
    return (
      <div className="message">
        <NoticeBar
          marqueeProps={
            { loop: true, style: { padding: '0 7.5px' } } as MarqueeProps
          }
        >
          通知:
          通知，是运用广泛的知照性公文。用来发布法规、规章，转发上级机关、同级机关和不相隶属机关的公文，批转下级机关的公文，要求下级机关办理某项事务等。通知，一般由标题、主送单位（受文对象）、正文、落款四部分组成。
        </NoticeBar>

        <WhiteSpace size="lg" />
        <Card full>
          <Card.Header
            title="通知标题"
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            extra={<span>this is extra</span>}
          />
          <Card.Body>
            <p>
              根据公司作自时间规定并结合员工实际情况需要，公司食堂就餐时间规定如下：
              早餐：7：00----- 7：30
              中餐：12：00-----12：30{' '}
            </p>
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

import React, { Component } from 'react';
import {
  WingBlank,
  Toast,
  Flex,
  NoticeBar,
  WhiteSpace,
  Card
} from 'antd-mobile';
import { MarqueeProps } from 'antd-mobile/lib/notice-bar/Marquee';
import './Message.less';
import { Base } from '../Common/Base';
import moment from 'moment';

export class Message extends Base {
  componentDidMount() {
    this.client.get('/message').then(ret => {
      if (ret.data.code === 200) {
        this.setState({
          message: ret.data.result
        });
      } else {
        Toast.fail(ret.data.message, 1);
      }
    });
  }
  state = {
    message: {
      list: [],
      notice: null
    }
  };
  render() {
    const { list, notice } = this.state.message;
    return (
      <div className="message">
        {notice ? (
          <NoticeBar
            marqueeProps={
              { loop: true, style: { padding: '0 7.5px' } } as MarqueeProps
            }
          >
            通知:
            {notice}
          </NoticeBar>
        ) : null}

        {list.map((item: any, index) => (
          <div key={item.id}>
            {/* <WingBlank> */}
            <WhiteSpace size="xl" />
            <Card>
              <Card.Header
                title={item.title}
                extra={moment(item.date).format('MM月DD日 HH:mm:ss')}
              />
              <Card.Body>
                <div className="content"> {item.content}</div>
              </Card.Body>

              <Card.Footer content={item.footer} extra={item.footerExtra} />
            </Card>
            {/* </WingBlank> */}
          </div>
        ))}
        <WhiteSpace size="xl" />
      </div>
    );
  }
}

import React, { Component } from 'react';
import {
  Button,
  List,
  DatePicker,
  Picker,
  InputItem,
  TextareaItem,
  WhiteSpace,
  WingBlank,
  Toast
} from 'antd-mobile';
import { PickerData } from 'antd-mobile/lib/picker/PropsType';
import { createForm, formShape } from 'rc-form';
import './Book.less';
import axios from 'axios';
import { client } from '../client';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export class Book extends Component<any> {
  constructor(props: any) {
    super(props);
  }
  static propTypes = {
    form: formShape
  };

  state = {
    date: now,
    time: now
  };
  inputRef: any;
  customFocusInst: any;

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log('ok', values);
        client
          .post('order/submit', values)
          .then(ret => {
            console.log('ret', ret);
          })
          .catch(err => console.log(err));
      } else {
        for (const i of Object.keys(error)) {
          const msg = error[i].errors.map(o => o.message).join(',');
          Toast.fail(msg, 1);
        }
      }
    });
  };
  onErrorClick(e) {
    Toast.fail(e, 1);
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    const Item = List.Item;
    const Brief = Item.Brief;
    const type = [
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
    return (
      <div className="book-list">
        <List>
          <DatePicker
            {...getFieldProps('date', {
              initialValue: this.state.date,
              rules: [{ required: true }]
            })}
            value={this.state.date}
            onChange={date => this.setState({ date })}
          >
            <List.Item arrow="horizontal">日期</List.Item>
          </DatePicker>
          {(errors = getFieldError('type')) ? errors.join(',') : null}

          <Picker
            {...getFieldProps('type', {
              initialValue: 1,
              rules: [{ required: true }]
            })}
            data={type as PickerData[]}
            cols={1}
            className="forss"
          >
            <List.Item arrow="horizontal">类型</List.Item>
          </Picker>
          {(errors = getFieldError('type')) ? errors.join(',') : null}

          <InputItem
            {...getFieldProps('count', {
              initialValue: 0,
              rules: [
                { required: true, type: 'string', message: '数量输入不正确' }
              ]
              // normalize: (v: any, prev: any) => {
              //   if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
              //     if (v === '.') {
              //       return 0;
              //     }
              //     return prev;
              //   }
              //   return v;
              // }
            })}
            error={getFieldError('count')}
            onErrorClick={this.onErrorClick.bind(this, getFieldError('count'))}
            type="number"
            extra="份"
            placeholder="请输入数量"
            ref={(el: any) => (this.inputRef = el)}
            onVirtualKeyboardConfirm={v =>
              console.log('onVirtualKeyboardConfirm:', v)
            }
            clear
          >
            数量
          </InputItem>

          <TextareaItem
            title="备注"
            {...getFieldProps('note', {
              initialValue: ''
            })}
            placeholder="请输入备注"
            rows={2}
            count={30}
          />
        </List>
        <WhiteSpace size="xl" />
        <WingBlank size="md">
          <Button onClick={this.onSubmit} type="primary">
            提交
          </Button>
        </WingBlank>
      </div>
    );
  }
}

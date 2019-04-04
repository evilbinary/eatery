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
import { Base } from '../Common/Base';
import { conf } from '../config';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export class Book extends Base {
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
        const data = {
          ...values,
          type: values['type'][0]
        };
        this.client
          .post('order/submit', data)
          .then(ret => {
            if (ret.data.code === 200) {
              Toast.success(ret.data.message, 1);
            } else {
              Toast.fail(ret.data.message, 1);
            }
            this.props.form.resetFields();
          })
          .catch(err => console.log(err));
      } else {
        // for (const i of Object.keys(error)) {
        //   const msg = error[i].errors.map(o => o.message).join(',');
        //   Toast.fail(msg, 1);
        // }
      }
    });
  };
  onErrorClick(e) {
    Toast.fail(e, 1);
  }

  validateCount = (rule, value, callback) => {
    if (value && value > conf.maxNumber) {
      callback();
    } else {
      callback(new Error(`不能超过${conf.maxNumber}份`));
    }
  };
  render() {
    let errors;
    const { getFieldProps, getFieldError, getFieldValue } = this.props.form;
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
        <List
          renderFooter={() =>
            (getFieldError('type') && getFieldError('type').join(',')) ||
            (getFieldError('count') && getFieldError('count').join(','))
          }
        >
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
          <Picker
            {...getFieldProps('type', {
              // initialValue: 1,
              rules: [{ required: true, message: '请选择类型' }]
            })}
            data={type as PickerData[]}
            value={getFieldValue('type')}
            cols={1}
          >
            <List.Item arrow="horizontal">
              类型{getFieldValue('type')}
            </List.Item>
          </Picker>

          <InputItem
            {...getFieldProps('count', {
              // initialValue: 0,
              rules: [
                { required: true, type: 'string', message: '数量输入不正确' },
                { validator: this.validateCount }

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
        <WingBlank size="md">
          <Button onClick={this.onSubmit} type="primary">
            提交
          </Button>
        </WingBlank>
      </div>
    );
  }
}

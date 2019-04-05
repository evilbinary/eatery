import React, { Component } from 'react';
import {
  Button,
  List,
  DatePicker,
  Picker,
  InputItem,
  Radio,
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
import moment from 'moment';


export class Book extends Base {
  constructor(props: any) {
    super(props);

    const now = moment();
    let type = this.getTodayDefaultType();
    this.state = {
      date: type > 0 ? now.toDate() : now.add(1, 'days').toDate(),  // 自动选择今日或明日
      type: [type || 1], // 今日或明日早餐
      time: now
    };
  }
  static propTypes = {
    form: formShape
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
    if (value && value < conf.maxNumber) {
      callback();
    } else {
      callback(new Error(`不能超过${conf.maxNumber}份`));
    }
  };

  /*
  根据当前时间和就餐时间段表数据，智能选择默认今日订餐类型
  @return 0 今日不能订餐
  */
  getTodayDefaultType() {
    let typeTimeRanges = [ // 这个数据可能从后端来
      {begin: '7:00'},
      {begin: '12:00'},
      {begin: '18:00'}
    ];

    let result = 0;
    const now = moment('16:00', 'HH:mm');
    for (let i = 0; i < typeTimeRanges.length; i++) {
      let begin = moment(typeTimeRanges[i].begin, 'HH:mm');
      if (now.diff(begin, 'minutes') < -30) { // 如果在就餐30分钟之前或者更早
        result = i + 1;
        break;
      }
    }

    return result;
  }

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
            mode="date"
            value={this.state.date}
            minDate={this.state.date} 
            onChange={date => this.setState({ date })}
          >
            <List.Item arrow="horizontal">日期</List.Item>
          </DatePicker>
          <Picker
            {...getFieldProps('type', {
              initialValue: this.state.type,
              rules: [{ required: true, message: '请选择类型' }]
            })}
            data={type as PickerData[]}
            value={getFieldValue('type')}
            cols={1}
          >
            <List.Item arrow="horizontal">
              类型
            </List.Item>
          </Picker>

          <InputItem
            {...getFieldProps('count', {
              initialValue: 1,
              rules: [
                { required: true, message: '数量输入不正确' },
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

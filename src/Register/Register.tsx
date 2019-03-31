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
import { Base } from '../Common/Base';
const Item = List.Item;

export class Register extends Base {
  constructor(props) {
    super(props);
  }
  validateName = (rule, value, callback) => {
    if (value && value.length >= 3) {
      callback();
    } else {
      callback(new Error('请输入至少3个字符的用户名'));
    }
  };
  validatePassword =(rule, value, callback) => {
    if (value && value.length >= 3) {
      callback();
    } else {
      callback(new Error('请输入至少3个字符的密码'));
    }
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        let data=this.props.form.getFieldsValue();
        data.password= new Buffer(data.password).toString('base64');
        this.client
          .post('/register', data)
          .then(res => {
            if (res.data.code === 200) {
              Toast.success(res.data.message, 1);
              this.props.location.pathname = '/';
            } else {
              Toast.fail(res.data.message, 1);
            }
          });
      } else {
        // new Error('请输入至少3个字符的账号')
      }
    });
  };

  login = () => {
    this.props.history.push('/login', {
      dotData: 'haha'
    });
  };
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <List
          //   renderHeader={() => '登录'}
          renderFooter={() =>
            getFieldError('name') && getFieldError('name').join(',') ||
            getFieldError('password') && getFieldError('password').join(',')
          }
        >
          <InputItem
            {...getFieldProps('name', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入用户名' },
                { validator: this.validateName }
              ]
            })}
            clear
            error={!!getFieldError('name')}
            onErrorClick={() => {
              alert(getFieldError('name').join('、'));
            }}
            placeholder="请输入用户名"
          >
            用户名
          </InputItem>
          <InputItem
            {...getFieldProps('password',{
              rules: [
                { required: true, message: '请输入密码' },
                { validator: this.validatePassword }
              ]
            })
          }
            placeholder="请输入密码"
            type="password"
          >
            密码
          </InputItem>
          <Item>
            <WhiteSpace />
            <Button type="primary" onClick={this.onSubmit}>
              注册
            </Button>
            <WhiteSpace />
            <Button onClick={this.login}>登录</Button>
          </Item>
        </List>
      </div>
    );
  }
}

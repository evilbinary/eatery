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

export class Login extends Base {
  constructor(props) {
    super(props);
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <List
          //   renderHeader={() => '登录'}
          renderFooter={() =>
            getFieldError('name') && getFieldError('name').join(',')
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
            {...getFieldProps('password')}
            placeholder="请输入密码"
            type="password"
          >
            密码
          </InputItem>
          <Item>
            <WhiteSpace />
            <Button type="primary" onClick={this.onSubmit}>
              登录
            </Button>
            <WhiteSpace />
            <Button onClick={this.register}>注册</Button>
          </Item>
        </List>
      </div>
    );
  }
  validateName = (rule, value, callback) => {
    if (value && value.length >= 3) {
      callback();
    } else {
      callback(new Error('请输入至少3个字符的用户名'));
    }
  };

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        this.client
          .post('/login', this.props.form.getFieldsValue())
          .then(res => {
            console.log('res',res);
            if (res.data.code === 200) {
              this.saveToken(res);
              Toast.success(res.data.message, 1);
              this.redirect('/');
            } else {
              Toast.fail(res.data.message, 1);
            }
          });
      } else {
        // new Error('请输入至少3个字符的账号')
      }
    });
  };
  register = () => {
    this.navigate('/register');
  };
}

import React from 'react';
import reactDom from 'react-dom';
import {Button} from 'antd';
import Toast from '../index';
import 'antd/dist/antd.less';


reactDom.render(
  <div className="toast-demo">
    <Button onClick={e => Toast.show('this is a success message.', {type: 'success'})}>success</Button>
    <Button onClick={e => Toast.show('this is a error message.', {type: 'error'})}>error</Button>
    <Button onClick={e => Toast.show('this is a warning message.', {type: 'warning'})}>warning</Button>
    <Button onClick={e => Toast.show('this is a info message.', {type: 'info'})}>info</Button>
    <Button onClick={e => Toast.show('this is a no-type message.', {timeout: 5000})}>delay 5000</Button>
  </div>,
  document.querySelector('#root')
);
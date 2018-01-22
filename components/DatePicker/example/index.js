import React from 'react';
import reactDom from 'react-dom';
import {Button} from 'antd';
import DatePicker from '../index';
import 'antd/dist/antd.less';


reactDom.render(
  <div className="toast-demo">
    <DatePicker />
  </div>,
  document.querySelector('#root')
);
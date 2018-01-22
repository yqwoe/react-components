import React from 'react';
import reactDom from 'react-dom';
import Button from '../index';
import 'antd/dist/antd.less';

reactDom.render(
  <div className="hello-world" > <Button onClick={e => alert('hello')} >click</Button></div>,
  document.querySelector('#root')
);
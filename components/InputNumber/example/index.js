import React from 'react';
import reactDom from 'react-dom';
import {Button} from 'antd';
import InputNumber from '../index';
import 'antd/dist/antd.less';
function onChange(e){
	console.log(e)
}
reactDom.render(
  <div style={{marginLeft:40}} className="InputNumber-demo">
    <InputNumber style={{width:100}} onChange={onChange}/>
  </div>,
  document.querySelector('#root')
);
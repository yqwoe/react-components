import React from 'react';
import reactDom from 'react-dom';
import {Button} from 'antd';
import FormatPrice from '../index';

import 'antd/dist/antd.less';
reactDom.render(
  <div style={{marginLeft:40}} className="FormatPrice-demo">
    {FormatPrice(10000000.00111)}
  </div>,
  document.querySelector('#root')
);
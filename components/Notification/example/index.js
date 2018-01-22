import React from 'react';
import reactDom from 'react-dom';
import {Button} from 'antd';
import Notification from '../index';
import 'antd/dist/antd.less';



reactDom.render(
  <div className="notification-demo">
    <Button style={{marginRight:30}} type="primary" onClick={e => Notification.show('success title','success description','success',2)}>notification success</Button>
    <Button style={{marginRight:30}} type="primary" onClick={e => Notification.show('success title','success description','success',2,'topLeft')}>notification success</Button>
    <Button style={{marginRight:30}} type="primary" onClick={e => Notification.show('info title','info description','info',4.5,'topRight')}>notification info</Button>
    <Button style={{marginRight:30}} type="primary" onClick={e => Notification.show('warning title','warning description','warning',4.5,'bottomLeft')}>notification warning</Button>
    <Button style={{marginRight:30}} type="primary" onClick={e => Notification.show('error title','error description','error',0,'bottomRight')}>notification error</Button>
    <Button style={{marginRight:30}} type="primary" onClick={e => Notification.show(null,null,null,null,null)}>notification error</Button>
  </div>,
  document.querySelector('#root')
);
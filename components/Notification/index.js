/**
 * Notification
 * @author lawrence llane@llanenet.com
 * @date 2018-10-15 14:00:00
 * @description 
 */

import React,{Component} from 'react';
import { notification } from 'antd';
import moment from 'moment';


const openNotification = (m,d,type,t,l) => {
  const args = {
    message: m,
    placement:l,
    description: d,
    duration: t,
  };
  if(type!=null){
    notification[type](args); 
  }else{
    notification.open(args); 
  }  
};

export default {
  show(m,d,type,t,l){
    openNotification(m,d,type,t,l)
  },
}

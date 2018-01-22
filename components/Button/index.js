/**
 * Button extend
 * @author lawrence llane@llanenet.com
 * @date 2018-01-04 14:05:32
 * @description 
 */

import {Component} from 'react';
import {Button} from 'antd';

let isCapture = false;
const XHRList = [];
const XHRSend = window.XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.send = function() {
  if(isCapture) {
    XHRList.push(this);
  }
  return XHRSend.apply(this, arguments);
}

function XHRProcess(instance) {
  isCapture = true;
  return () => {
    isCapture = false;
    XHRList.length > 0 && instance.setState({loading: true});
    Promise.all(XHRList.splice(0).map(xhr => new Promise((resolve, reject) => xhr.addEventListener('loadend', resolve, false)))).then(e => instance.setState({loading: false}));
  }
}

export default class ButtonEx extends Component {
  static launchEvent(instance) {
    setTimeout(XHRProcess(instance))
  }
  state = {
    loading: false,
  }
  clickHandler() {
    ButtonEx.launchEvent(this);
    if(typeof this.props.onClick === 'function') {
      this.props.onClick.apply(null, arguments);
    }
  }
  render() {
    const {onClick, loading, ...props} = this.props;
    return <Button {...props} loading={loading !== undefined ? loading : this.state.loading} onClick={this.clickHandler.bind(this)}/>
  }
}
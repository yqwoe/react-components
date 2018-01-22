/**
 * RangePickerExtend
 * @author lawrence llane@llanenet.com
 * @date 2017-09-28 16:33:24
 * @description 
 */

import React,{ Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { flow } from 'lodash' 


function getDateInput( selector, target ){
  return new Array( Array.prototype.slice.call(document.querySelectorAll(selector)), target );
}

function addEvent([ doms=[], target ]){
  doms.forEach(( dom, index ) => dom.addEventListener( 'input', onInputHandler.bind( target, index ), false));
  return new Array( doms, target )
}

function removeEvent([ doms=[], target ]){
  doms.forEach(( dom, index ) => {
    dom.removeEventListener( 'input', onInputHandler.bind( target, index ), false)});
  return new Array( doms, target )
}

function inputFocus([ doms=[], index ]){
  const input = doms[typeof index === "number" ? index : 0];
  if(input){
    setTimeout( e => ( input.focus(), input.select() ),200);
  }
}


const initHandler = flow( getDateInput, addEvent, inputFocus );
const destroyHandler = flow( getDateInput, removeEvent );

function onInputHandler(index,evt){
  const date_value = evt.target.value.match(/(\d{4})(\d{2})(\d{2})/);
  if (date_value) {
    const date_format = date_value.slice(1).join('-')
    var date = moment(date_format);
    if(date._isValid){
      this.state.value[index] = date;
      if(this.state.value[index-1]){
        this.onChange(this.state.value.sort((a,b) => +a > +b));
      }
      if(index === 0){
        flow( getDateInput, inputFocus )('.ant-calendar-input',1)
      }
    }
  }
}

export default class RangePickerExtend extends Component{
  state = {
    open:false,
    value:[]
  }
  onOpenChange(status){
    this.setState({open:status});
    destroyHandler(".ant-calendar-input",this);
    if(status){
      setTimeout(initHandler.bind(null,".ant-calendar-input",this));
    }
    typeof this.props.onOpenChange === "function" && this.props.onOpenChange(status)
  }
  onChange(value){
    typeof this.props.onChange == 'function' && this.props.onChange(value);
    this.setState({open:false});
  }
  render(){ 
    const { onChange,onOpenChange,...props} = this.props;
    return <DatePicker.RangePicker value={[moment('2017-08-08')]}  {...props} onOpenChange={this.onOpenChange.bind(this)} onChange={this.onChange.bind(this)} open={this.state.open} />
  }


}




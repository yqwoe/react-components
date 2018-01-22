/**
 * DatePickerExtend
 * @author lawrence llane@llanenet.com
 * @date 2017-08-15 18:30:25
 * @description 
 */


import React,{Component} from 'react';
import { DatePicker } from 'antd';
import RangePicker from './RangePicker';
import moment from 'moment';

function onInputHandler(input,showTime=false){
  const date_value = input.value.match(/(\d{4})(\d{2})(\d{2})/);
  const time_value = input.value.match(/(\d{8}\s)(\d{2})(\d{2})(\d{2})/);
  if (showTime ? date_value && time_value : date_value) {
    const date_format = date_value.slice(1).join('-')
    if (showTime) {
      var date = moment(date_format+' '+time_value.slice(2).join(':'))
    } else { 
      var date = moment(date_format);
    }
    if(date._isValid){
      this.onChange(date);
    }
  }
}

export default class DatePickerExtend extends Component{
  state = {
    open:false
  }
  onOpenChange(showTime = false,status){
    this.setState({open:status});
    const input = document.querySelector('.ant-calendar-input');
    if(input){
      input.removeEventListener('input',onInputHandler.bind(this,input,showTime),false);
    }
    if(status){
      setTimeout(()=>{
        const input = document.querySelector('.ant-calendar-input');
        input.focus();
        input.select();
        input.addEventListener('input',onInputHandler.bind(this,input,showTime),false);
      },1000/2);
    }
    typeof this.props.onOpenChange === "function" && this.props.onOpenChange(status)
  }
  onChange(value){
    typeof this.props.onChange == 'function' && this.props.onChange(value);
    if(value && value._isValid){
      this.setState({open:false});
    }
  }
  render(){
    // filter onChange & onOpenChange
    const { onChange,onOpenChange,showTime,...props} = this.props;
    return <DatePicker showTime={showTime} {...props} onOpenChange={this.onOpenChange.bind(this,showTime)} onChange={this.onChange.bind(this)} open={this.state.open} />
  }
}

// deep copy
Object.assign(DatePickerExtend,DatePicker,{RangePicker});



import { Form, Select, DatePicker, Input } from 'antd';

const {MonthPicker, RangePicker} = DatePicker;
const Option = Select.Option;

/**
 * 根据映射找到相应的组件
 * */
const fieldControls = (title, props = {type, options: []}) => {
    let key = `form_${title}`
    return {
      "Select": <Select {...props} key={key}>{
        buildOptions(props.options)
      }</Select>,
      "Input": <Input {...props} key={key}/>,
      "DatePicker": <DatePicker {...props} style={{width: '100%'}} key={key}/>,
      "RangePicker": <RangePicker {...props} style={{width: '100%'}} key={key}/>
    }[props.type]
  }

/**
 * 为select添加options
 * */
const buildOptions = (array = []) => {
 return array.map(obj => {
    return <Option key={obj.key} value={obj.key}>{obj.value}</Option>
 })
}

const buildFields = ({title, props={}}) => {
    let newProps = {
        placeholder: '请输入'+ `${title}`
    }

    Object.assign(newProps, props)
    return fieldControls(title, newProps)
}
  
export default {
 buildFields
}
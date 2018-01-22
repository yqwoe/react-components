
/**
 * InputNumber
 * @author lawrence llane@llanenet.com
 * @date 2018-10-15 14:00:00
 * @description 
 */

import React,{Component} from 'react';
import { InputNumber } from 'antd';
import moment from 'moment';



export default class InputNumberExtend extends Component{
  render(){
    const {...props} = this.props;
    return <InputNumber
                    {...props}
                    formatter={(value="")=> {
                      var formatThousands = require('format-thousands');
                      let [prefix,last] = `${value}`.split('.')
                      if(prefix&&last){
                        return formatThousands(`${prefix}.${last}`,',')
                      }else{
                        if(prefix&&`${value}`.indexOf('.') > -1){
                          return formatThousands(`${prefix}`,',') + '.'
                        }else{
                          return formatThousands(`${prefix}`,',')
                        }
                      }
                    }}
                    />
  }
}

// deep copy
Object.assign(InputNumberExtend,InputNumber);
/**
 * FormatPrice
 * @author lawrence llane@llanenet.com
 * @date 2018-10-15 14:00:00
 * @description 
 */

import React,{Component} from 'react';
import moment from 'moment';
export default function FormatPrice(price = 0, precision = 2){
  price = price.toString();
  let [prefix, last = ""] = price.split('.');
  let newLast = new Array(precision).fill(0).map((item, index) => (last[index] || item));
  prefix = prefix.split('').reverse().map( (item, index) => (index%3 === 0 ? [item, ','].join('') : item)).reverse().join('');
  return `${prefix.substring(0, prefix.length - 1)}.${newLast.join('')}`
}
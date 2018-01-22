import React from 'react';
import reactDom from 'react-dom';
import TableEx from '../index';
import 'antd/dist/antd.less';

import {Input} from 'antd'

const columns = [
  {
    title: '序号',
    dataIndex: 'no',
    render(text, record, index){
      return index + 1;
    }
  },
  {
    title: 'input',
    dataIndex: 'input',
    props: {
      type: 'Input' 
    }
  },
  {
    title: '日期',
    dataIndex: 'date',
    props: {
      type: 'DatePicker' 
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    props: {
      type: 'Select',
      options: [
        {
          key: "1",
          value: '草稿'
        },
        {
          key: "2",
          value: '待审核'
        },
        {
          key: "3",
          value: '已审核'
        },
      ] 
    },
  }
];

const dataSource = [
  {input: 'Daved', date: '2018-09-10', state: '草稿'},
  {input: 'John', date: '2018-01-10', state: '待审核'},
  {input: 'Tom', date: '2018-09-20', state: '已审核'},
  {input: '小明', date: '2018-09-10', state: '已审核'},
]

const rowSelection = {
  type: "checkbox"
}

reactDom.render(
  <TableEx dataSource={dataSource} columns={columns} rowSelection={rowSelection} />,
  document.querySelector('#root')
);

setTimeout(function(){
  let tdWidthArray = [],
      flag = false;
  const searchBarTds = document.querySelector('.table-search-bar tr').children;
  Array.prototype.forEach.call(document.querySelector('.antd-table-ex thead tr').children, (td, index) => {
    tdWidthArray.push(td.clientWidth);

    if(document.querySelector('.antd-table-ex thead tr th.ant-table-selection-column')) {
      document.querySelector('.table-search-bar table').style.marginLeft = tdWidthArray[0];
      flag = true;
    }

    let num = flag ? (index - 1) : index

    if(searchBarTds[num]){
      searchBarTds[num].setAttribute('width', td.clientWidth);
    }
  });
  document.querySelector('.table-search-bar table').style.display = 'table'
})
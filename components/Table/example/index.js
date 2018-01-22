import React from 'react';
import reactDom from 'react-dom';
import TableEx from '../index';
import 'antd/dist/antd.less';

const columns = [
  {
    title: 'index',
    dataIndex: 'index',
    render(text, record, index){
      return index + 1;
    }
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'age',
    dataIndex: 'age',
  }
];

const dataSource = [
  {name: 'Daved', age: 19},
  {name: 'John', age: 12},
  {name: 'Tom', age: 2},
  {name: '小明', age: 18},
]

const rowSelection = {
  type: "checkbox"
}

reactDom.render(
  <TableEx className="hello-world" dataSource={dataSource}  columns={columns} rowSelection={rowSelection}  />,
  document.querySelector('#root')
);
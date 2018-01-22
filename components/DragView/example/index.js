import React,{Component} from 'react';
import reactDom from 'react-dom';
import {Table} from 'antd';
import DragView from '../index';
import 'antd/dist/antd.less';
import {Resizable} from 'react-resizable'

import '../style.css';

const ResizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};



class DragTableDemo extends Component{
    constructor(props){
        super(props)
        this.state={
            data: [
                {
                    key: "1",
                    name: "Boran",
                    gender: "male",
                    age: "12",
                    address: "New York"
                },
                {
                    key: "2",
                    name: "JayChou",
                    gender: "male",
                    age: "38",
                    address: "TaiWan"
                },
                {
                    key: "3",
                    name: "Lee",
                    gender: "female",
                    age: "22",
                    address: "BeiJing"
                },
                {
                    key: "4",
                    name: "ChouTan",
                    gender: "male",
                    age: "31",
                    address: "HangZhou"
                },
                {
                    key: "5",
                    name: "AiTing",
                    gender: "female",
                    age: "22",
                    address: "Xi’An"
                }
            ],
            columns:[
                {
                    title: "Key",
                    dataIndex: "key",
                    width: 100,
                },
                {
                    title: "Name",
                    dataIndex: "name",
                    width: 100,
                },
                {
                    title: "Gender",
                    dataIndex: "gender",
                    width: 100,
                },
                {
                    title: "Age",
                    dataIndex: "age",
                    width: 100,
                },
                {
                    title: "Address",
                    dataIndex: "address",
                    width: 100,
                },
                {
                    title: 'Operations', dataIndex: '', key: 'd', render() {
                    return <a href="#">Operations</a>;
                },
                },
            ]
        }
    }

    components = {
        header: {
            cell: ResizeableTitle,
        },
    }

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            console.log(columns)
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { columns: nextColumns };
        });
    }

    render(){
        const that = this;
        const recolumns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: (column) => ({
                width: column.width,
                onResize: this.handleResize(index),
            }),
        }));
        //row拖拽
        const dragRowPrps={
            onDragEnd(fromIndex,toIndex){
                console.log(fromIndex,toIndex,that.state)
                const data = that.state.data;
                const item = data.splice(fromIndex, 1)[0];
                data.splice(toIndex, 0, item);
                that.setState({
                    data
                })
            },
            handleSelector: 'tr' // or 'th'
        }

        const dragColumnPrps={
            onDragEnd(fromIndex,toIndex){
                const columns = recolumns;
                const item = columns.splice(fromIndex, 1)[0];
                columns.splice(toIndex, 0, item);
                that.setState({
                    columns
                })
            },
            nodeSelector: 'th' // or 'th'
        }
        return (
            <div>
                <a href="/components/DragTable"><h1>Click me!!</h1></a>
            </div>
        )
    }
}

reactDom.render(
    <div>
    <DragTableDemo />
    </div>,
    document.querySelector('#root')
);
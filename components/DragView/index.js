import React,{Component} from 'react';
import { Table } from 'antd';
import ReactDragListView from 'react-drag-listview';

export default class DragView extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <ReactDragListView {...this.props}/>
        )
    }
}
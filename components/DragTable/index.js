import React,{Component} from 'react'
import TableExtend from '../Table'
import ReactDragListView from 'react-drag-listview';


export default class DragColumn extends Component{
    // state={
    //     data:[],
    //     columns: []
    // }


    render(){
        // const that = this;
        // const dragColumnPrps={
        //     onDragEnd(fromIndex,toIndex){
        //         const columns = that.state.columns;
        //         const item = columns.splice(fromIndex, 1)[0];
        //         columns.splice(toIndex, 0, item);
        //         that.setState({
        //             columns
        //         })
        //     },
        //     nodeSelector: 'th' // or 'th'
        // }
        return (
            <ReactDragListView>
                <TableExtend dataSrouce={[]} columns={[]}/>
            </ReactDragListView>
        )
    }
}
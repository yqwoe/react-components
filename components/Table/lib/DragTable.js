import React, {Component} from 'react'
import TableExtend from './TableExtend'
import ReactDragListView from 'react-drag-listview';
import {Resizable} from 'react-resizable'

import './style.less';

const ResizableColumn = (props) => {
    const {onResize, width, ...restProps} = props;

    if (!width) {
        return <th {...restProps} />;
    }
    console.log(restProps)
    console.log(width)

    return (
        <Resizable width={width} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};

function findElement(eles = []) {
    return eles.filter(ele => ele.localName == "thead" || ele.localName == "tbody" || (ele.localName == "span" && ele.className == "react-resizable-handle")).map(e => e.localName)
}

function isThead(e) {
    const {path} = e
    return findElement(path).includes("thead")
}

function isTbody(e) {
    const {path} = e
    return findElement(path).includes("tbody")
}

function isResizable(e) {
    const {path} = e
    return findElement(path).includes("span")
}


export default class DragTable extends Component {
    state = {
        data: this.props.dataSource,
        columns: this.props.columns,
        type: 'row'
    }

    componentDidMount(prevProps, prevState) {
        let table = document.getElementsByTagName("table")[0]
        console.log(table.clientWidth)
        table.onmousedown = this.onMouseDown.bind(this)
    }


    onDragColumn(fromIndex, toIndex) {
        const columns = this.state.columns;
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        this.setState({
            columns
        })
    }

    onDragRow(fromIndex, toIndex) {
        const data = this.state.data;
        const item = data.splice(fromIndex, 1)[0];
        data.splice(toIndex, 0, item);
        this.setState({
            data
        })
    }


    onMouseDown(e) {
        console.log(e)
        if (isTbody(e)) {
            console.log("isTbody")
            this.setState({
                type: 'row'
            })
        }
        if (isThead(e)) {
            console.log("isThead")
            this.setState({

                type: 'col'
            })
        }
        if (isResizable(e)) {
            console.log("isResizable")
            this.setState({

                type: 'resizable'
            })
        }

    }

    components = {
        header: {
            cell: ResizableColumn,
        },
    }

    handleResize = index => (e, {size}) => {
        this.setState(({columns}) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return {columns: nextColumns};
        });
    }

    render() {
        const columns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: (column) => ({
                width: column.width,
                onResize: this.handleResize(index),
            }),
        }));

        const dragColumnPrps = {}
        if (this.state.type == 'row') {
            Object.assign(dragColumnPrps, {
                onDragEnd: this.onDragRow.bind(this),
                handleSelector: 'tr'
            })
        }
        if (this.state.type == 'col') {
            Object.assign(dragColumnPrps, {
                onDragEnd: this.onDragColumn.bind(this),
                nodeSelector: 'th'
            })
        }
        if (this.state.type == 'resizable') {
            Object.assign(dragColumnPrps, {
                onDragEnd(){console.log('resizable')},
                nodeSelector: 'nothing'
            })
        }
        return (
            <ReactDragListView {...dragColumnPrps}>
                <TableExtend dataSource={this.state.data} columns={columns} components={this.components}/>
            </ReactDragListView>
        )
    }
}
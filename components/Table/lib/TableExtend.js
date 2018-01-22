import React, { Component,PropTypes } from 'react';
import { Table, Button } from 'antd';
import './style.less';

export default class TableExtend extends Component {
    state = {
        isSelectedAll : false,
        rowSelection: {
            selectedRowKeys: [],
            selectedRows: [],
        },
        activeIndex: null,
    }
    componentWillReceiveProps({ dataSource, rowSelection }) {
        if (rowSelection) {
            const state = {};
            const { selectedRowKeys = this.state.rowSelection.selectedRowKeys } = rowSelection;
            const selectedRows = [];
            const rowKey = this.getRowKey();
            if(this.state.isSelectedAll === true && dataSource.length !== this.props.dataSource.length) {
                this.onChange(dataSource.map((record, index) => rowKey ? record[rowKey] : index), dataSource);
                return;
            }
            dataSource.forEach((item, index) => {
                const rowVal = rowKey ? item[rowKey] : index;
                if (selectedRowKeys.includes(rowVal)) {
                    selectedRows.push(item);
                }
            });
            state.rowSelection = { selectedRowKeys, selectedRows };
            if(selectedRowKeys.length === 0){
                state.activeIndex = null;
            }
            this.setState(state);
        }
    }
    getRowKey() {
        let { rowKey } = this.props;
        // 支持 rowkey = record => record.id || record["pid"]
        if (typeof rowKey === 'function') {
            const fnString = rowKey.toString();
            rowKey = fnString.match(/\w+\.(\w+)/);
            rowKey = rowKey && rowKey[1];
            if (!rowKey) {
                rowKey = fnString.match(/\W{2}(\w+)\W{2}/);
                rowKey = rowKey && rowKey[1];
            }
        }
        return rowKey;
    }
    onChange(selectedRowKeys, selectedRows, upstram) {
        if(upstram === 'proxySelect'){
            return null;
        }
        const { rowSelection = {} } = this.props;
        const { onChange, onDetail = e => e  } = rowSelection;

        this.setState(({ rowSelection: { selectedRowKeys, selectedRows } }), () => {
            if (typeof onChange === 'function') {
                onChange(selectedRowKeys, selectedRows);
            }
            if (selectedRowKeys.length === 0) {
                onDetail({}, false);
            }
        });
    }
    rowClassName(record, index) {
        const rowKey = this.getRowKey();
        const rowVal = rowKey ? record[rowKey] : index;

        let className = '';

        if (rowVal === this.state.activeIndex) {
            className = 'table-tr-active';
        }

        if (typeof this.props.rowClassName === 'function') {
            className = `${this.props.rowClassName(record, index)} ${className}`;
        }

        return className;
    }
    onRowClick(record, index, event, upstram) {
        const sRowSelection = this.state.rowSelection;
        const pRowSelection = this.props.rowSelection
        const { onRowClick } = this.props;
        const rowKey = this.getRowKey();
        const rowVal = rowKey ? record[rowKey] : index;
        const isCheckbox = pRowSelection.type !== 'radio';

        const targetInSelected = sRowSelection.selectedRowKeys.includes(rowVal);
        const selected = isCheckbox ? !targetInSelected : true;

        if (typeof onRowClick === 'function') {
            onRowClick(record, index, event);
        }

        if (pRowSelection.getCheckboxProps === 'function') {
            const CheckboxProps = pRowSelection.getCheckboxProps(record);
            if (CheckboxProps && CheckboxProps.disabled === true) {
                return;
            }
        }

        let selectedRows = [];
        let selectedRowKeys = [];
        if (isCheckbox) {
            selectedRows = sRowSelection.selectedRows.filter(item => item != record);
            selectedRowKeys = sRowSelection.selectedRowKeys.filter(key => key != rowVal);
            if (selected) {
                selectedRows.push(record);
                selectedRowKeys.push(rowVal);
            }
        } else {
            selectedRows.push(record);
            selectedRowKeys.push(rowVal);
        }

        this.setState(({ rowSelection: { selectedRowKeys, selectedRows }, activeIndex: selected ? rowVal : rowVal }), () => {
            if (typeof pRowSelection.onSelect === 'function') {
                pRowSelection.onSelect(record, selected, selectedRows);
            }
            if (typeof pRowSelection.onDetail === 'function') {
                pRowSelection.onDetail(record, selected);
            }
            this.onChange(selectedRowKeys, selectedRows, upstram);
        });
    }
    onSelect(record, selected, selectedRows) {
        const index = this.props.dataSource.indexOf(record);
        this.onRowClick(record, index, new Event('oops'), 'proxySelect');
    }
    onCustomSelectAll() {
        this.setState({isSelectedAll: true}, () => {
            typeof this.props.onChange === 'function' && this.props.onChange({
                current: 1,
                pageSize: 1000 * 1000,
            });
            const rowKey = this.getRowKey();
            console.log(this.props.dataSource.map((record, index) => rowKey ? record[rowKey] : index))
            this.onChange(this.props.dataSource.map((record, index) => rowKey ? record[rowKey] : index), this.props.dataSource);
        });
        console.log(window._ref = this.refs.table);
    }
    onPageChange(pagination, filters, sorter) {
        if(this.state.isSelectedAll){
            this.setState({
                pagination,
            })
            return;
        }
        this.props.onChange(pagination, filters, sorter)
    }
    onCustomCancelSelectAll() {
        this.setState({isSelectedAll: false}, (e) => {
            this.onChange([], []);
        });
    }
    render() {
        let { rowSelection, onRowClick, rowClassName, pagination,  ...props } = this.props;

        rowClassName = this.rowClassName.bind(this);

        if(props.onChange){
            props.onChange = this.onPageChange.bind(this);
        };

        const proxyHandler = {
            onChange: this.onChange.bind(this),
            onSelect: this.onSelect.bind(this),
        };

        let rowSelectionCombine = null;
        if (rowSelection) {
            onRowClick = this.onRowClick.bind(this);
            rowSelectionCombine = Object.assign({}, rowSelection, this.state.rowSelection, proxyHandler);
        }

        if(this.state.isSelectedAll) {
            pagination = this.state.pagination;
        }
        return <div className="tableEx" >
            {
                this.props.extendSelectBtn &&
                <Button.Group>
                    <Button onClick={this.onCustomSelectAll.bind(this)}>全选</Button>
                    <Button onClick={this.onCustomCancelSelectAll.bind(this)}>取消全选</Button>
                </Button.Group>
            }
            <Table ref="table" {...props} rowClassName={rowClassName} onRowClick={onRowClick} rowSelection={rowSelectionCombine} pagination={pagination} />
        </div>;
    }
}
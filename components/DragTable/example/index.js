import reactDom from 'react-dom';
import TableExtend from '../../Table';

const data= [
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
]
const columns = [
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

reactDom.render(
    <div>
        <TableExtend.DragTable dataSource = {data} columns={columns} />
    </div>,
    document.querySelector('#root')
);
# DragTable

### Development
```js
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
                    dataIndex: "key"
                },
                {
                    title: "Name",
                    dataIndex: "name"
                },
                {
                    title: "Gender",
                    dataIndex: "gender"
                },
                {
                    title: "Age",
                    dataIndex: "age"
                },
                {
                    title: "Address",
                    dataIndex: "address"
                }
            ]
        }
    }

    render(){
        const that = this;
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
        //columns拖拽
        const dragColumnPrps={
            onDragEnd(fromIndex,toIndex){
                const columns = that.state.columns;
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
                <h1>Drag Row</h1>
                <DragView {...dragRowPrps}>
                    <Table dataSource = {this.state.data} columns={this.state.columns}/>
                </DragView>

                <h1>Drag Column</h1>
                <DragView {...dragColumnPrps}>
                    <Table dataSource = {this.state.data} columns={this.state.columns}/>
                </DragView>
            </div>
        )
    }
}
```
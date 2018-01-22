# antdx

### Development
```shell
$ git clone https://e.coding.net/minsheng/antdx.git 
$ yarn install 
$ yarn start
```
### Component's statement
组件按照以下结构组织。组件名以大写开头的驼峰命名，当前组件目录下必须包含index.js，也必须通过index来export default module；
```shell
| components
  |-- ComponentName # 首字母大写的驼峰命名
    |-- index.js # 模块入口
    ...
    |-- example
      |-- index.js # demo入口
```
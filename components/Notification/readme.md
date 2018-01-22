# Notification 使用说明

### 引用
```js
import { Notification } from 'components';

// 显示一个带Icon，title，description的Notification
// 默认4.5秒关闭
Notification.show(m,d,type,t,l)

内含5个参数

m: 'message' ----提示框的title
d: 'description' ----提示框的描述信息
type: 'Icon类型' ---- 'success','info','warning','error'四种类型
t: 'time' ----提示框展示的时长，默认为数字类型的，设置为0时不会关闭，只能手动点击关闭按钮关闭
l: 'placement' ----提示框出现的位置 ，'topLeft','topRight','boottomLeft','bottomRight'四种类型


注意不需要的参数可用null补齐，如

Notification.show(null,null,null,null,null)

具体用法请参考示例
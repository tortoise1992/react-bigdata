import React, { Component } from 'react'
import { DropTarget} from 'react-dnd';
const rowTarget = {
    // drop返回的对象可以在drap里面拿到
    drop(props, monitor,component) {
      // component对应当前绑定的组件的this,更新状态使用setState
      // console.log(component)
      // 接收来自可拖拽组件的传值
      const item = monitor.getItem();
      // console.log(item)
      return {
          name:'左侧容器'
      }
    },
  };
class Container extends Component {
  state={
    test:'123456'
  }
  render() {
        const {connectDropTarget}=this.props
        return connectDropTarget(<div className='t-container'>
            11111
            
        </div>)          
  }
}

export default DropTarget(
    'row',
    rowTarget,
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }),
  )(Container)

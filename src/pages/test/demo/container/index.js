import React, { Component } from 'react'
import { DropTarget} from 'react-dnd';
import BasicInput from '../component/input'

const rowTarget = {
    // drop返回的对象可以在drap里面拿到
    drop(props, monitor,component) {
      // component对应当前绑定的组件的this,更新状态使用setState
      // console.log(component)
      // 接收来自可拖拽组件的传值
      const item = monitor.getItem();
      // console.log(item)
      return {
          name:'容器'
      }
    },
  };
class Container extends Component {
  state={
    custom:[]    
  }
  componentWillReceiveProps(nextProps,nextState){
    if(JSON.stringify(nextProps !==this.props)){
      this.setState({
        custom:nextProps.data
      })
    }
  }
  handleEdit=(item)=>{
    this.props.getEditData(item)    
  }
  handleDelete=(id)=>{
    this.props.deleteItem(id)
  }
  render() {
    const {connectDropTarget}=this.props
    return connectDropTarget(<div className='t-container'>
        {
          this.state.custom.map((item,index)=>{
            if(item.type === 'input'){
              return <BasicInput edit={this.handleEdit} delete={this.handleDelete} item={item} key={index}></BasicInput>
            }
          })
        }
        
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

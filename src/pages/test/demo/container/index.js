import React, { Component } from 'react'
import { DropTarget} from 'react-dnd';
import BasicInput from '../component/input'
import BasicTextArea from '../component/textarea'
import BasicDate from '../component/date'
import BasicCheckBox from '../component/checkbox'
import BasicRadio from '../component/radio'
let template={
  sort:'',
  unid:'',
  type:'',
  label:'label',
  width:'100%',
  name:'',
  collection:'',
  dataSource:''
}
const rowTarget = {
    // drop返回的对象可以在drap里面拿到
    // component对应当前绑定的组件的this,更新状态使用setState
    drop(props, monitor,component) {      
      // 接收来自可拖拽组件的传值      
      const item = monitor.getItem();
      //前端随机生成一个组件的unid作为唯一标识，方便前端未提交的状态下可删除对应的组件
      let newItem={
        ...template,
        type:item.type,
        unid:`com${new Date().getTime()}`
      }
      // 传递到父组件
      component.props.dropComp(newItem)
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
            }else if(item.type === 'textarea'){
              return <BasicTextArea edit={this.handleEdit} delete={this.handleDelete} item={item} key={index}></BasicTextArea>
            }else if(item.type === 'date'){
              return <BasicDate edit={this.handleEdit} delete={this.handleDelete} item={item} key={index}></BasicDate>
            }else if(item.type === 'checkbox'){
              return <BasicCheckBox edit={this.handleEdit} delete={this.handleDelete} item={item} key={index}></BasicCheckBox>
            }else if(item.type === 'radio'){
              return <BasicRadio edit={this.handleEdit} delete={this.handleDelete} item={item} key={index}></BasicRadio>
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

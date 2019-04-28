import React, { Component } from 'react'
import { DragSource} from 'react-dnd';
const rowSource = {
    beginDrag(props) {
        // console.log(props)
        return {
            // 开始拖拽的时候返回的对象可以在end的时候接收
            type:props.item.type
        };
    },
    endDrag(props, monitor) {
        const item = monitor.getItem()
        // console.log(item.item)
        const dropResult = monitor.getDropResult()
        // 由容器的drop方法里面传入
        // if (dropResult) {
        //   alert(`You dropped ${item.id} into ${dropResult.name}!`)
        // }
    },
  };

class DragItem extends Component{
    render(){
        const {
            connectDragSource,
            item
        } = this.props;
        return connectDragSource(<div style={{height:30,lineHeight:'30px',marginBottom:10,backgroundColor:'#09f',color:'#fff',cursor:'move'}} key={this.props.index}>
            <span style={{margin:'0 10px'}}>{item.icon}</span>{item.title}
        </div>)
    }
}

DragItem=DragSource(
    'row',
    rowSource,
    (connect,monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(DragItem)

export default DragItem
import React, { Component } from 'react'
import { DragSource} from 'react-dnd';
import {Icon} from 'antd'
const rowSource = {
    beginDrag(props) {
        // console.log(props)
        return {
            // 开始拖拽的时候返回的对象可以在end的时候接收
            id:props.item.id
        };
    },
    endDrag(props, monitor) {
        const item = monitor.getItem()
        // console.log(item.item)
        const dropResult = monitor.getDropResult()
        // 由容器的drop方法里面传入
        if (dropResult) {
          alert(`You dropped ${item.id} into ${dropResult.name}!`)
        }
    },
  };

class DragItem extends Component{
    render(){
        const {
            connectDragSource,
            item
        } = this.props;
        return connectDragSource(<div style={{height:30,lineHeight:'30px',marginBottom:10,backgroundColor:'#09f',color:'#fff',cursor:'move'}} key={this.props.index}>
            {item.title}
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
class Comp extends Component {
    state={
        data:[
            {
                id:'component-1',
                title:'单行文本框',
                desc:'用于输入单行文本内容',
                icon:<Icon type="edit" />
            },
            {
                id:'component-2',
                title:'多行文本框',
                desc:'用于输入多行文本内容',
                icon:<Icon type="form" />
            },
            {
                id:'component-3',
                title:'日期控件',
                desc:'用于选择时间',
                icon:<Icon type="calendar" />
            }
        ]
    }
    render() {        
        return   (
                <div className='t-list'>
                    组件列表
                    {
                        this.state.data.map((item,index)=><DragItem key={index} item={item} index={index}></DragItem>)
                    }                         
                </div>  
        )
          
    }
}

export default Comp

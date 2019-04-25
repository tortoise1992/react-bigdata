import React, { Component } from 'react'
import {Icon} from 'antd'
import DragItem from './dragItem'
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

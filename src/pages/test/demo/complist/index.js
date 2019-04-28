import React, { Component } from 'react'
import {Icon} from 'antd'
import DragItem from './dragItem'
class Comp extends Component {
    state={
        data:[
            {
                type:'input',
                title:'单行文本框',
                desc:'用于输入单行文本内容',
                icon:<Icon type="edit" />
            },
            {
                type:'textarea',
                title:'多行文本框',
                desc:'用于输入多行文本内容',
                icon:<Icon type="form" />
            },
            {
                type:'date',
                title:'日期控件',
                desc:'用于选择时间',
                icon:<Icon type="calendar" />
            },
            {
                type:'checkbox',
                title:'复选框',
                desc:'',
                icon:<Icon type="calendar" />
            },
            {
                type:'radio',
                title:'单选框',
                desc:'',
                icon:<Icon type="calendar" />
            },
            {
                type:'table',
                title:'表格',
                desc:'',
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

import React, { Component } from 'react'
import { Table } from 'antd'
import Hoc from '../hoc'
class BasicInput extends Component {
    state={
        columns:[
            {
                title:'示例列1',
                dataIndex:'row1'
            },
            {
                title:'示例列2',
                dataIndex:'row2'
            }
        ]
    }
    render() {   
        // 判断展示用户生成的table还是默认的table
        let columns=this.props.item.columns && this.props.item.columns.length>0?this.props.item.columns:this.state.columns
        return (
            <Table bordered  columns={columns}></Table>
        )
    }
}
export default Hoc(BasicInput)
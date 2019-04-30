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
        return (
            <Table size='small' columns={this.state.columns}></Table>
        )
    }
}
export default Hoc(BasicInput)
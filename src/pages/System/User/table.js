import React, { Component,Fragment } from 'react'
import { Table ,Divider,Button} from 'antd'
import request from '@/utils/request';
export default class MyTable extends Component {
    state = {
        data: [],
        pagination: {
            current:1,
            pageSize:10,
            showQuickJumper:true,
            showTotal:(total)=>{
                return `共${total}条数据`
            },
            total:0
        }
    }
    componentDidMount() {
        request('/api/users').then(res=>{
            if(res.success){
                this.setState({
                    data:res.obj.data
                })
            }
            
        });
    }
    
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                width:'10%'
            },
            {
                title: '用户名',
                dataIndex: 'username',
                width:'15%'
            },
            {
                title: '姓名',
                dataIndex: 'name',
                width:'15%'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render:(text,record)=>{
                    return text === 1?'男' : '女'
                },
                width:'15%'
            },
            {
                title: '角色',
                dataIndex: 'role',
                width:'15%'
            },
            {
                title: '操作',
                width:'30%',
                render:()=>{
                    return(
                        <Fragment>
                            <span>
                                编辑
                            </span>
                            <Divider type='vertical'></Divider>
                            <span>
                                初始化密码
                            </span>
                            <Divider type='vertical'></Divider>
                            <span>
                                删除
                            </span>
                        </Fragment>
                    )
                }
            }
        ]
        return (
            <Table columns={columns} dataSource={this.state.data} pagination={this.state.pagination}>

            </Table>
        )
    }
}

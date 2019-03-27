import React,{useEffect,useCallback,useState,Fragment} from 'react'
import {Button,Table} from 'antd'
export default function B(props){
    const [list,setList]=useState([])
    const columns=[
        {
            title:'序号',
            dataIndex:'key'
        },
        {
            title:'用户名',
            dataIndex:'name'
        },
        {
            title:'年龄',
            dataIndex:'age'
        },
        {
            title:'邮箱',
            dataIndex:'email'
        }
    ]
    const data=[{
        key:1,
        name:'阿晖',
        age:27,
        email:'772084015@qq.com'
    },{
        key:2,
        name:'安布',
        age:25,
        email:'12345@qq.com'
    }]
    // 类似于componentDidMount，初次加载的时候setState数据，第二个参数为[]表示不依赖外部参数
    useEffect(()=>{
        console.log('页面初始化请求数据')
        setList([...list,...data])
        // return一个函数类似于componentWillunmount
        return ()=>{
            console.log('当前组件卸载了')
        }
    },[])
    return(
        <Fragment>
            <Table
                columns={columns}
                dataSource={list}
            ></Table>
        </Fragment>        
    )
}
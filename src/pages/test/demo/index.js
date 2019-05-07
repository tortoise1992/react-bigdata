import React, { Component } from 'react'
import Container from './container'
import Comp from './complist'
import CustomProp from './customprop'
import './index.less'
class Demo extends Component {
    state={
        // 自定义组件
        custom:[],
        editData:null
    }
    componentDidMount() {
        this.setState({
            custom:[{
                sort:1,
                unid:'03170471',
                type:'input',
                label:'姓名',
                width:'80%',
                name:'name',
                collection:'user',
                dataSource:'user_name'
            },{
                sort:2,
                unid:'12646163',
                type:'input',
                label:'年龄',
                width:'100%',
                name:'age',
                collection:'user',
                dataSource:'user_age'
            },
            {
                sort:3,
                unid:'45da45d4ad',
                type:'radio',
                label:'性别',
                width:'100%',
                name:'sex',
                // 如果有自己手动输入的值，存在value字段
                value:1,
                collection:'user',
                dataSource:'user_sex',
                // 针对单选框和复选框选项配置
                configSource:['男','女']                
            },            
            {
                sort:4,
                unid:'1143dafa',
                type:'checkbox',
                label:'喜欢的水果',
                width:'100%',
                name:'flu',
                // 如果有自己手动输入的值，存在value字段
                value:[1,2,3],
                collection:'user',
                dataSource:'user_flu',
                // 针对单选框和复选框选项配置
                configSource:['香蕉','苹果','菠萝','梨子']                
            },{
                sort:5,
                unid:'dafafafg',
                type:'table',
                label:'测试表格',
                width:'100%',
                columns:[
                    {
                        title:'学号',
                        database:'user',
                        dataIndex:'userNo',
                        width:'20%'
                    },
                    {
                        title:'就业情况',
                        database:'user',
                        dataIndex:'employ',
                        children:[
                            {
                                title:'工作',
                                database:'user',
                                dataIndex:'work',
                                width:'20%'
                            },
                            {
                                title:'升学',
                                database:'user',
                                dataIndex:'school',
                                width:'20%'
                            }
                        ]
                    }
                ]               
                
            }]
        })
    }
    getEditData=(item)=>{
        this.setState({
            editData:item
        })
    }
    handleEditList=(item)=>{
        let deepCustom=JSON.parse(JSON.stringify(this.state.custom))
        let res=deepCustom.map(comp=>{
            if(comp.unid === item.unid){
                return {
                    ...comp,
                    ...item
                }
            }else{
                return comp
            }
        })
        this.setState({
            custom:res,
            editData:null
        })
    }
    handleDelete=(id)=>{
        let deepCustom=JSON.parse(JSON.stringify(this.state.custom))
        let res=deepCustom.filter(item=>item.unid !==id)
        this.setState({
            custom:res,
            editData:null
        })
    }
    dropComp=(item)=>{
        // 将拖动生成的组件合并到初始的组件列表
        let deepCustom=JSON.parse(JSON.stringify(this.state.custom))
        let res=[
            ...deepCustom,
            item
        ]
        this.setState({
            custom:res,
            editData:null
        })
    }
    render() {
        return (
        <div className='t-parent'>
            <Comp></Comp>
            <Container dropComp={this.dropComp} deleteItem={this.handleDelete} getEditData={this.getEditData} data={this.state.custom}></Container> 
            <CustomProp handleEdit={this.handleEditList} editData={this.state.editData}></CustomProp>           
        </div>
        )
    }
}

export default Demo

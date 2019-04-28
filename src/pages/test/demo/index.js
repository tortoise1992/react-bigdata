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
    // componentDidMount() {
    //     this.setState({
    //         custom:[{
    //             sort:1,
    //             unid:'03170471',
    //             type:'input',
    //             label:'姓名',
    //             width:'50%',
    //             name:'name',
    //             collection:'user',
    //             dataSource:'user_name'
    //         },{
    //             sort:2,
    //             unid:'12646163',
    //             type:'input',
    //             label:'年龄',
    //             width:'100%',
    //             name:'age',
    //             collection:'user',
    //             dataSource:'user_age'
    //         }]
    //     })
    // }
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

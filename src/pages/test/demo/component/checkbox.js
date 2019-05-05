import React, { Component } from 'react'
import { Checkbox } from 'antd'
import Hoc from '../hoc'
const CheckboxGroup = Checkbox.Group;
class BasicInput extends Component {   
    render() {
        if(this.props.item.configSource && this.props.item.configSource.length>0){
            let options=this.props.item.configSource.map((item,index)=>{
                return {
                    label:item,
                    value:index
                }
            })
            return <CheckboxGroup disabled options={options} defaultValue={this.props.item.value || []}></CheckboxGroup>
        }else{
            return (
                <Checkbox disabled>复选框</Checkbox>
            )
        }
        
    }
}

export default Hoc(BasicInput)


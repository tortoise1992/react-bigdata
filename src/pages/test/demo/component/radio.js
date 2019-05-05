import React, { Component } from 'react'
import { Radio } from 'antd'
import Hoc from '../hoc'
const RadioGroup = Radio.Group;
class BasicInput extends Component {
  render() {
    if(this.props.item.configSource && this.props.item.configSource.length>0){
      return (
        <RadioGroup defaultValue={this.props.item.value} disabled>
          {
            this.props.item.configSource.map((item,index)=><Radio key={index} value={index}>{item}</Radio>)
          }
        </RadioGroup>          
      )
    }else{
      return (
        <RadioGroup disabled>
          <Radio>单选框</Radio>
        </RadioGroup>          
      )
    }    
  }
}

export default Hoc(BasicInput)

import React, { Component } from 'react'
import { Radio } from 'antd'
import Hoc from '../hoc'
class BasicInput extends Component {
  render() {
    return (
        <Radio>单选框</Radio>
    )
  }
}

export default Hoc(BasicInput)

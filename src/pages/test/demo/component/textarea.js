import React, { Component } from 'react'
import { Input } from 'antd'
import Hoc from '../hoc'
const { TextArea } = Input;
class BasicInput extends Component {
  render() {
    return (
        <TextArea placeholder='测试内容，仅供参考' disabled></TextArea>
    )
  }
}

export default Hoc(BasicInput)

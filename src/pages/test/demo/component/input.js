import React, { Component } from 'react'
import { Input } from 'antd'
import Hoc from '../hoc'
class BasicInput extends Component {
  render() {
    return (
        <Input placeholder='测试内容，仅供参考' disabled></Input>
    )
  }
}

export default Hoc(BasicInput)

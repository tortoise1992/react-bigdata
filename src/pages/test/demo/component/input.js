import React, { Component } from 'react'
import { Input } from 'antd'
import Hoc from '../hoc'
class BasicInput extends Component {
  render() {
    return (
        <Input></Input>
    )
  }
}

export default Hoc(BasicInput)

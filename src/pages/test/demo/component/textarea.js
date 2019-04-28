import React, { Component } from 'react'
import { Input } from 'antd'
import Hoc from '../hoc'
const { TextArea } = Input;
class BasicInput extends Component {
  render() {
    return (
        <TextArea></TextArea>
    )
  }
}

export default Hoc(BasicInput)

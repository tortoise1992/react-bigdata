import React, { Component,Fragment } from 'react'
import { Form,Button } from 'antd'
const FormItem=Form.Item
class Search extends Component {
  render() {
    return (
      <div style={{marginBottom:20}}>
        <Button type='primary'>
          搜索
        </Button>
        <Button type='primary' style={{marginLeft:15}}>
          新建用户
        </Button>
      </div>
    )
  }
}
export default Form.create()(Search)

import React, { Component, Fragment } from 'react'
import { Form, Button, Input } from 'antd'
const FormItem = Form.Item
class Search extends Component {
  
  handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSearch(values)
        
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ marginBottom: 20 }}>
        <Form layout='inline'>
          <FormItem label='用户名'>
            {
              getFieldDecorator('username', {

              })(<Input></Input>)
            }
          </FormItem>
          <FormItem label='姓名'>
            {
              getFieldDecorator('name', {

              })(<Input></Input>)
            }
          </FormItem>
          <FormItem>
            <Button type='primary' onClick={this.handleSearch}>
              搜索
            </Button>
          </FormItem>
          <FormItem>
            <Button type='primary' style={{ marginLeft: 15 }}>
              新建用户
            </Button>
          </FormItem>
        </Form>



      </div>
    )
  }
}
export default Form.create()(Search)

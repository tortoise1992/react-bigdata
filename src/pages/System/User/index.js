import React, { Component } from 'react'
import { Card } from 'antd'
import Search from './search'
import MyTable from './table'
export default class User extends Component {
  state = {
    username: '',
    name: ''
  }
  handleSearch=(values)=>{
    this.setState({
      username: values.username,
      name: values.name
    })
  }
  
  render() {
    return (
      <Card title='用户管理'>
        <Search handleSearch={this.handleSearch}></Search>
        {/* 利用key替代componentWillReceiveProps */}
        <MyTable key={`key${this.state.username}-${this.state.name}`} username={this.state.username} name={this.state.name}></MyTable>
      </Card>
    )
  }
}

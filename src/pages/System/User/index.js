import React, { Component } from 'react'
import { Card } from 'antd'
import Search from './search'
import MyTable from './table'
export default class User extends Component {
  render() {
    return (
      <Card title='用户管理'>
        <Search></Search>
        <MyTable></MyTable>
      </Card>
    )
  }
}

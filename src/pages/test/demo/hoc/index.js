import React from 'react'
import './index.less'
import { Button, Popconfirm } from 'antd'
export default (WrappedComponent) => {
  class hocComponent extends React.Component {    
    //打开编辑状态的方法
    handleEdit = (item) => {
      this.props.edit(item)
    }
    //删除当前组件的方法
    handleDelete = (id) => {
      this.props.delete(id)
    }
    render() {      
      return (
        <div className='myCol' style={{ width: this.props.item.width || '100%' }}>
          <div>
            <Button onClick={() => { this.handleEdit(this.props.item) }} type='primary' icon='form' style={{ marginRight: 5 }}></Button>
            <Popconfirm title="确定删除该组件吗?" onConfirm={() => { this.handleDelete(this.props.item.unid) }} onCancel={() => { }} okText="确定" cancelText="取消">
              <Button type='primary' icon='delete'></Button>
            </Popconfirm>
          </div>
          <div className='myCol-form'>
            <div className='myCol-label'>
              {this.props.item.label}：
            </div>
            <div className='myCol-form-item'>
              <WrappedComponent {...this.props.item}></WrappedComponent>
            </div>
          </div>
        </div>
      )
    }
  }
  return hocComponent
}

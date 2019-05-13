import React, { Component } from 'react'
import { Modal } from 'antd'
class AddOrEdit extends Component {
  render() {
    return (
      <Modal
      visible={this.props.visible}
      onCancel={this.props.closeModel}
      >
        新增或者编辑的弹窗
      </Modal>
    )
  }
}
export default AddOrEdit

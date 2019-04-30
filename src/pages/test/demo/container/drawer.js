import React, { Component } from 'react'
import { Drawer, Button,Tree,Row,Col } from 'antd'
const { TreeNode } = Tree;
export default class MyDrawer extends Component {
    render() {
        return (
            <Drawer
                title="编辑表格"
                placement="right"
                width={500}
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.drawerVisible}
            >
                <Row>
                    <Col span={16}>
                    树形结构
                    <Tree
                        defaultExpandedKeys={['0-0-0', '0-0-1']}
                        defaultSelectedKeys={['0-0-0', '0-0-1']}
                        defaultCheckedKeys={['0-0-0', '0-0-1']}
                    >
                        <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="parent 1-0" key="0-0-0">
                            <TreeNode title="leaf" key="0-0-0-0" />
                            <TreeNode title="leaf" key="0-0-0-1" />
                        </TreeNode>
                        <TreeNode title="parent 1-1" key="0-0-1">
                            <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                        </TreeNode>
                        </TreeNode>
                    </Tree>
                    </Col>
                    <Col span={8}>
                    属性区域
                    </Col>
                </Row>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    
                    <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={this.props.onClose} type="primary">
                        确定
                    </Button>
                </div>
            </Drawer>
        )
    }
}

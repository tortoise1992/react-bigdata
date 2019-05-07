import React, { Component } from 'react'
import { Drawer, Button,Tree,Row,Col } from 'antd'
const { TreeNode } = Tree;
export default class MyDrawer extends Component {
    state={
        treeData:[]
    }
    componentDidMount() {
        this.setState({
            treeData:this.props.editTable.columns
        })
    }
    renderTreeNodes = data => data.map((item,index) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.title+index} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.title+index} {...item} dataRef={item} />;
    })
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
                    >
                        {
                            this.renderTreeNodes(this.state.treeData)
                        }
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

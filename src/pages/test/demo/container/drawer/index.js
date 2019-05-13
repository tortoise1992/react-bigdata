import React, { Component } from 'react'
import { Drawer, Button,Tree,Row,Col } from 'antd'
import AddOrEdit from './model'
const { TreeNode } = Tree;
export default class MyDrawer extends Component {
    state={
        treeData:[],
        modelVisible:false
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
    handleAddRow=()=>{
        this.setState({
            modelVisible:true
        })
    }
    closeModel=()=>{
        this.setState({
            modelVisible:false
        })
    }
    handleEditRow=()=>{
        this.setState({
            modelVisible:true
        })
    }
    handleDeleteRow=()=>{

    }
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
                {
                    this.state.modelVisible?<AddOrEdit 
                    visible={this.state.modelVisible}
                    closeModel={this.closeModel}
                    ></AddOrEdit>
                    :null
                }
                <Row>
                    <Col span={24}>
                    树形结构
                    <div style={{margin:'10px 0'}}>
                        <Button style={{marginRight:20}} onClick={this.handleAddRow} type='primary'>新增列</Button>
                        <Button style={{marginRight:20}} onClick={this.handleEditRow} type='primary'>编辑列</Button>
                        <Button type='primary' onClick={this.handleDeleteRow}>删除列</Button>
                    </div>
                    
                    <Tree                        
                    >
                        {
                            this.renderTreeNodes(this.state.treeData)
                        }
                    </Tree>
                    </Col>
                    {/* <Col span={8}>
                    属性区域
                    </Col> */}
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

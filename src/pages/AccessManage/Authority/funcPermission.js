/**
 * Created by hutao on 2018/8/31.
 * 权限配置
 */
import React, { Component } from 'react';
import { Button, message, Tree } from 'antd';
import './style.less'
import { getAction, postAction } from '@/axios'
const TreeNode = Tree.TreeNode;

class MenuLists extends Component {
    state = {
        menuLists: [],//菜单列表
        roleMenuData: [],
        selectedKeys: [],
        halfCheckMenu:[]
    }

    handleMenuIdtoString(data) {
        // data.map(item=>{//id转成字符串类型便于树组件匹配
        //     item.id=(item.id).toString()
        //     if(item.subMenus && item.subMenus.length>0){
        //         this.handleMenuIdtoString(item.subMenus)
        //     }
        //     return item
        // })
        data.forEach(item => {
            item.id = (item.id).toString()
            if (item.subMenus && item.subMenus.length > 0) {
                this.handleMenuIdtoString(item.subMenus)
            }
        })
        return data
    }


    componentWillReceiveProps(nextProps) {
        //当选中角色改变时重新获取权限配置
        if (nextProps.activeRole.id !== this.props.activeRole.id) {
            this.getRoleMenuLists({ roleId: nextProps.activeRole.id, sourceCode: 'pc' })
        }
    }
    //获取角色菜单权限列表
    getRoleMenuLists = (data) => {
        //获取当前角色的权限列表
        // const res = {
        //     "success": true,
        //     "msg": "成功",
        //     "obj": {
        //         "roleId": 1,
        //         "menu": [
        //             '1802',
        //             '1803',
        //             '1804',
        //             '181',
        //             '10'

        //         ]
        //     },
        //     "errorCode": null
        // }
        getAction('/bigdata/system/role/res/list', data).then(res => {
            if (res.success) {
                //id转成字符串类型便于树组件
                let menus = []
                res.obj.allCheckMenu.forEach(element => {
                    menus.push(element.toString())
                })
                this.setState({
                    roleMenuData: menus || [],
                    selectedKeys: menus || [],
                    halfCheckMenu:res.obj.halfCheckMenu
                })
            }
        })
    }


    componentWillMount() {
        // //获取菜单列表,根绝请求数据设置菜单列表   
        getAction('/bigdata/system/menu/list').then(res => {
            if (res.success) {
                let data = this.handleMenuIdtoString(res.obj)
                // console.log(data)
                this.setState({
                    menuLists: data || []
                })
            }
        })

        this.getRoleMenuLists()
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.subMenus) {
                if (item.id === '60' || item.id === '61' ||item.id === '62' ||item.id === '63') {
                    return (
                        <TreeNode disabled={true} title={item.name} key={item.id} dataRef={item}>
                            {this.renderTreeNodes(item.subMenus)}
                        </TreeNode>
                    );
                } else {
                    return (
                        <TreeNode title={item.name} key={item.id} dataRef={item}>
                            {this.renderTreeNodes(item.subMenus)}
                        </TreeNode>
                    );
                }

            }
            return <TreeNode {...item} />;
        });
    }
    //保存修改后的菜单权限
    saveAction = () => {
        // 进行保存操作，获取对应数据，发送请求，根据请求返回就行相应提示
        let data = {
            roleId: this.props.activeRole.id,
            allCheckMenu: this.state.roleMenuData.join(','),
            sourceCode: 'pc',
            halfCheckMenu:this.state.halfCheckMenu.join(',')
        }
        // console.log(this.state.roleMenuData)
        postAction('/bigdata/system/role/res/update', data, 0, 1).then(res => {
            if (res.success) {
                message.success('权限配置成功！');
            } else {
                message.error(res.obj);
            }
        })

    }
    handleCheckTree = (selectNodes, e) => {
        this.setState({
            roleMenuData: selectNodes,
			halfCheckMenu:e.halfCheckedKeys
        })
        // console.log(selectNodes)
    }
    render() {
        const { roleMenuData, menuLists } = this.state
        return (

            <div>
                <Tree
                    checkable
                    // onExpand={this.onExpand}
                    // expandedKeys={this.state.expandedKeys}
                    // autoExpandParent={this.state.autoExpandParent}
                    // onCheck={this.onCheck}
                    // checkedKeys={this.state.checkedKeys}
                    // onSelect={this.onSelect}
                    checkedKeys={roleMenuData}
                    onCheck={this.handleCheckTree}
                >
                    {this.renderTreeNodes(menuLists)}
                </Tree>


                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" onClick={this.saveAction}>保存</Button>
                </div>
            </div>


        )
    }
}

export default MenuLists;
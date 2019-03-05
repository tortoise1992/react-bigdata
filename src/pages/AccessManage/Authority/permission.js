/**
 * Created by hutao on 2018/8/31.
 * 权限配置
 */
import React, { Component } from 'react';
import { Card} from 'antd';
import FuncPermission from './funcPermission'
// import DataPermission from './dataPermission'
// const TabPane=Tabs.TabPane
// function callback(key) {
//     console.log(key);
// }
class MenuLists extends Component {
    state = {
        menuLists: [],//菜单列表
        roleMenuData: [],
        selectedKeys: [],
    }
   
   
    render() {
        
        return (
            <Card
                className={'authority-menuLists'}
                title={<span style={{ color: '#1890FF' }}>{this.props.activeRole.roleName}角色权限配置</span>}
            >
                <FuncPermission activeRole={this.props.activeRole}></FuncPermission>
                                
            </Card>
        )
    }
}

export default MenuLists;
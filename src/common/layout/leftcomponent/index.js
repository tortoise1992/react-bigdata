import React from 'react';
import { withRouter} from "react-router-dom";
import { Menu } from 'antd';

const leftcomponent = {
    position: "fixed",
    zIndex: "2",
    top: "0px",
    left: "0px",
    width: "220px",
    height: "100vh",
    background:"#121a2c",
    paddingTop: "80px",
    boxShadow:"0 2px 4px 0 rgba(35,36,37,0.30)"
}

const scrollconstainer = {
	width:"100%",
	height:"100%",
	overflowX: "hidden",
	overflowY: "auto"
}

const iconStyle = {
	marginRight: 8, 
	fontSize: 22
}

const SubMenu = Menu.SubMenu;

class LeftComponent extends React.Component{
	
	// 点击导航跳转页面
	selectClick = ({ key })=> {
        this.props.history.push(key);
    }
	
	// 登陆后返回的字段中生成需要的菜单
	setMenus = (menus, bool) => {
		return menus.map(
			(item) => {
				if (item.subMenus && item.subMenus[0]) {
					return (
							<SubMenu 
								key={item.name} 
								title={
									<span>
										<i className={`iconfont icon-shujumofang`} style={iconStyle}></i>
										<span>{item.name}</span>
									</span>
								}
							>
								{
									this.setMenus(item.subMenus, false)
								}
							</SubMenu>
					)
				} else{
					return (
						<Menu.Item key={item.url}>
							{
								bool
								?
								<i className={`iconfont icon-shujumofang`} style={iconStyle}></i>
								:
								null
							}
							<span>{item.name}</span>
						</Menu.Item>
					)
				}
			}
		)
	}
    
    render () {
		// 先使用静态菜单开发
		// const menus = JSON.parse(localStorage.getItem("userInfo")).menus;
        return (
            <div style={leftcomponent}>
                <div style={scrollconstainer}>
                    <Menu
						mode="inline"
						theme="dark"
						onClick={this.selectClick}
					>
						{/*开发最后，根据角色权限修改动态菜单，放开此处代码即可*/}
						{/* {this.setMenus(menus, true)} */}
						
						{/*前期开发，放开此处代码，将菜单固定*/}
						
							<Menu.Item key="/test">
								<i className="iconfont icon-shujumofang" style={{ marginRight: 8, fontSize: 22 }}></i>
								<span>测试</span>
							</Menu.Item>					  
							<Menu.Item key="/hooks">
								<i className="iconfont icon-shujumofang" style={{ marginRight: 8, fontSize: 22 }}></i>
								<span>React-hooks</span>
							</Menu.Item>
							  
							<SubMenu 
								key="/accessmanage" 
								title={
									<span>
										<i className="iconfont icon-shujumofang" style={{ marginRight: 8, fontSize: 22 }}></i>
										<span>权限管理</span>
									</span>
								}
							>
								<Menu.Item key="/accessmanage/account">账号管理</Menu.Item>
								<Menu.Item key="/accessmanage/authority">角色管理</Menu.Item>
								<Menu.Item key="/accessmanage/menu">菜单管理</Menu.Item>
							</SubMenu> 
						
						
					</Menu>
                </div>
            </div>
        )
    }
}

export default withRouter(LeftComponent)
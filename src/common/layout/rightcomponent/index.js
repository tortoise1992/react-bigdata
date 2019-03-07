import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import { asyncComponent } from '../../../utils';

const rightcomponent = {
	position: "fixed",
	zIndex: "1",
	top: "0px",
	left:  "0px",
	width: "100%",
	height: "100vh",
	background: "#eceef3",
	paddingTop: "80px",
	paddingLeft: "220px"
}

const scrollcontainer = {
	width:"100%",
	height: "100%",
	overflowX: "hidden",
	overflowY: "auto"
}

// 获取异步组件

// 账号管理
const Account = asyncComponent(() => import('../../../pages/AccessManage/Account'));
// 角色管理
const Authority = asyncComponent(() => import('../../../pages/AccessManage/Authority'));
// 菜单管理
const Menu = asyncComponent(() => import('../../../pages/AccessManage/Menu'));

const Test = asyncComponent(() => import('../../../pages/test'));
const Detail = asyncComponent(() => import('../../../pages/test/detail'));
class RightComponent extends React.Component{
    render () {
		// 动态获取重定向路由
		const menus = JSON.parse(localStorage.getItem("userInfo")).menus;
		let redictUrl;
		if (menus && menus[0]) {
			let level1 =  menus[0].url;
			if (level1) { // 第一级
				redictUrl = level1
			} else { // 第一级没有url，只负责展开
				let level2 = menus[0].subMenus[0].url
				if (level2) { // 第二级
					redictUrl = level2
				} else{
					let level3 = menus[0].subMenus[0].subMenus[0].url
					if (level3) {// 第三级
						redictUrl = level3
					} else{ 
						alert("层级过多，打死产品")
					}
				}
			}
			
		}
        return (
            <div style={rightcomponent}>
                <div style={scrollcontainer}>
                    <Switch>                       
						
                        <Route path="/accessmanage/account" component={Account}/>
						<Route path="/accessmanage/authority" component={Authority}/>
						<Route path="/accessmanage/menu" component={Menu}/>
						<Route path="/test" exact component={Test}/>
						<Route path="/test/detail/:userId" exact component={Detail}/>
                        <Route path="/" render={(props) => <Redirect to="/test"/>}/>

                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(RightComponent)
import React from 'react';
import { connect} from 'react-redux';
import { loginAction } from './../../redux/actions/loginAction';
// import { postAction } from './../../axios';
import { setLocal } from './../../utils';
import { Input, Icon, Button, message, Form } from 'antd';
import BgImg from './bg.jpg';
import LoginLogo from './loginLogo.png';

const FormItem = Form.Item;

const divstyle={
	width: "100vw", 
	height:"100vh", 
	overflow: "hidden",
	position: "relative"
};

const bgimg = {
	position: "absolute",
	top:"0px",
	left:"0px",
	width: "100%",
	height:"100%",
	zIndex: "0",
}

const content = {
	position: "absolute",
	top:"50%",
	left:"50%",
	width: "348px",
	height: "418px",
	background: "white",
	borderRadius: "5px",
	padding:"35px",
	zIndex: "1",
	marginTop: "-209px",
	marginLeft:"-174px"
}



class LoginPage extends React.Component{
	
	// 账户名称
	userEmpty = () => {
	    this.userNameInput.focus();
	    this.props.form.setFieldsValue({username: undefined});
	}
	
	// 账户密码
	passwordEmpty = () => {
	    this.userCodeInput.focus();
	    this.props.form.setFieldsValue({password: undefined});
	}

	handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
				this.props.handleLogin(values);
            }
        });
    }
    render () {
		const { getFieldDecorator } = this.props.form;
		let username = this.props.form.getFieldValue('username');
		let password = this.props.form.getFieldValue('password');
    	const suffixUserName = username ? <Icon type="close-circle" onClick={this.userEmpty} style={{ color: 'rgba(0,0,0,.25)' }} /> : null;
    	const suffixUserCode = password ? <Icon type="close-circle" onClick={this.passwordEmpty} style={{ color: 'rgba(0,0,0,.25)' }} /> : null;
        return (
            <div style={divstyle}>
               	<img src={BgImg} alt="" style={bgimg} />
               	<div style={content}>
               		<div style={{textAlign:'center',paddingBottom:20}}>
					   	<img src={LoginLogo} alt="" style={{marginTop: 10}} />
               			<h4 style={{fontSize: "18px", margin: "20px auto"}}>院校研究数据中心后台管理系统</h4>
					</div>
               		<Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入账户名称!' }],
                            })(
                                <Input 
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
									suffix={suffixUserName}
									ref={node => this.userNameInput = node}
                                    placeholder="请输入账户名称"
                                    size="large" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入账户密码!' }],
                            })(
                                <Input 
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
									type="password" 
									suffix={suffixUserCode}
									ref={node => this.userCodeInput = node}
                                    placeholder="请输入账户密码"
                                    size="large" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" block htmlType="submit" size="large" style={{marginTop:20}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
               	</div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin (data) {
			// postAction(
			// 	"/bigdata/user/login",
			// 	{
			// 		username: data.username, 
			// 		password: data.password
			// 	}
			// ).then(
			// 	(res) => {
			// 		if (res.success) {
			// 			setLocal("userInfo", JSON.stringify(res.obj));
			// 			setLocal("loginStatus", true);
			// 			const action  = loginAction(true);
			// 			dispatch(action);
			// 		} else {
			// 			message.error(res.obj)
			// 		}
			// 	}
			// )
			setLocal("userInfo", JSON.stringify({}));
			setLocal("loginStatus", true);
			const action  = loginAction(true);
			dispatch(action);
        }
    }
}

export default connect(null, mapDispatchToProps)(Form.create()(LoginPage))


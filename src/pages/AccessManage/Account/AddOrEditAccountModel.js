/**
 * Created by hutao on 2018/8/31.
 * 新增或编辑账户管理
 */
import React, { Component } from 'react';
import { Form, Input, Select, message } from 'antd';
import { getAction, postAction } from '@/axios';
import MainModal from '@/common/components/MainModal';

const FormItem = Form.Item;
const Option = Select.Option;

//表单布局
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17, style: { paddingLeft: '10px' } },
};

class AddOrEditAccount extends Component {
    state = {
        roleList: [],
    }
    componentWillMount() {
        // 获取用户角色列表信息
        getAction("/bigdata/system/role/list", { sourceCode: "pc" }).then((res) => {
            if (res.success && res.obj.length > 0) {
                let newRoleList = [];
                res.obj.forEach((item) => {
                    if(item.roleName!=='超级管理员'){
                        newRoleList.push({
                            roleName: item.roleName,
                            roleId: item.id + "" // 这里需要string类型， 后端传过来的是num类型， 简单转换一下
                        })
                    }
                })
                this.setState({
                    roleList: newRoleList
                })
            }
        });
    }
    sureAction = () => {
        //表单验证
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    let { userName, name, sex, accountCode, roleId } = values;
                    // let roleName = this.state.roleList.filter(item=>item.roleId===roleId)[0].roleName;
                    let reqUrl = "/bigdata/system/user/save";
                    let data = {
                        sourceCode: "pc", // 调用端：(默认PC)
                        userName, // 账户名 string
                        name, // 姓名 string
                        sex: sex - 0, // 性别 num init ， state中存储的是string类型， 这里简单转换一下
                        accountCode, // 学号/教工号 string
                        roleId:roleId - 0, // 用户角色 num init ， state中存储的是string类型， 这里简单转换一下
                        // roleName
                    }
                    if (this.props.rowInfo) {
                        reqUrl = "/bigdata/system/user/update";
                        data.id = this.props.rowInfo.id;
                    }
                    postAction(reqUrl, data,0,1).then((res) => {
                        if (res.success) {
                            message.success("保存成功！！！");
                            this.props.hideModal();
                            this.props.onOk();
                        } else {
                            message.error(res.obj);
                        }
                    })
                }
            },
        );
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let editData = this.props.rowInfo;
        let roleId;
        if (editData) {
            this.state.roleList.forEach((item, index) => {
                if (item.roleName === editData.roles) {
                    roleId = item.roleId
                }
            });
        }
        return (
            <MainModal
                okText="确定"
                title={this.props.title}
                visible={true}
                onOk={this.sureAction}
                onCancel={this.props.hideModal}
                cancelText="取消"
            >
                <FormItem {...formItemLayout} label="账户名称">
                    {getFieldDecorator('userName', {
                        rules: [{
                            required: true,
                            message: '请输入账户名称'
                        }],
                        initialValue: editData && editData.username
                    })(
                        <Input placeholder="请输入账户名称" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="姓名">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: '请输入姓名'
                        }],
                        initialValue: editData && editData.name
                    })(
                        <Input placeholder="请输入姓名" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="性别">
                    {getFieldDecorator('sex', {
                        rules: [{
                            required: true,
                            message: '请输入性别'
                        }],
                        initialValue: editData && editData.sex
                    })(
                        <Select placeholder="请选择性别" style={{ width: "100%" }}>
                            <Option value={1}>男</Option>
                            <Option value={2}>女</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="学号/教工号">
                    {getFieldDecorator('accountCode', {
                        rules: [{
                            required: true,
                            message: '请输入学号/教工号'
                        }],
                        initialValue: editData && editData.accountCode
                    })(
                        <Input placeholder="请输入学号/教工号" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="用户角色">
                    {getFieldDecorator('roleId', {
                        rules: [{
                            required: true,
                            message: '请输入用户角色'
                        }],
                        initialValue: roleId
                    })(
                        <Select placeholder="请选择用户角色" style={{ width: "100%", marginBottom: 8 }} onChange={this.roleIdChange}>
                            {this.state.roleList.length > 0 ? this.state.roleList.map((item) => {
                                return (
                                    <Option value={item.roleId} key={item.roleId}>{item.roleName}</Option>
                                )
                            }
                            ) : null
                            }
                        </Select>
                    )}
                </FormItem>
            </MainModal>
        )
    }
}

const AddOrEditAccountModel = Form.create()(AddOrEditAccount);
export default AddOrEditAccountModel;
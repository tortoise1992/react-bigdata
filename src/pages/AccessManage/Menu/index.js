import React from 'react';
import { Card, Tree, Icon, Modal, message } from 'antd';
import AddOrEditRoleModel from './AddOrEditRoleModel'
import { getAction, postAction } from '@/axios'

const TreeNode = Tree.TreeNode;

const iconStyle = {
	fontSize: '20px',
	color: '#aaa',
	marginLeft: '10px'
}
const iconActiveStyle = Object.assign({},iconStyle,{color:'rgb(24, 144, 255)'});

class Menu extends React.Component {
	state = {
		menuLists: [], //菜单列表
		selectedKeys: [], //选中节点
		expandedKeys: [], //展开节点
		visible: false, //是否显示新增或修改模态框
		isEditor: false, //是否修改
		activeData: undefined, //选中节点信息
	}
	componentWillMount() {
		this.getMenuLists();
	}
	//获取菜单列表
	getMenuLists = () => {
		getAction('/bigdata/system/menu/list').then(res => {
			if (res.success) {
				this.setState({
					menuLists: res.obj || [],
					activeData: undefined,
					selectedKeys: []
				})
			}
		})
	}
	//选中节点修改
	onSelect = (selectedKeys, info) => {
		if(selectedKeys.length>0){
			// console.log(selectedKeys)
			// console.log(info)
			this.setState({ selectedKeys, activeData: info.node.props.detail });
		} else {
			this.setState({ selectedKeys, activeData: undefined });
		}
	}
	//拖拽开始
	onDragEnter = (info) => {
		// expandedKeys 需要受控时设置
		this.setState({
		  expandedKeys: info.expandedKeys,
		});
	}
	//拖拽中
	onDrop = (info) => {
		// console.log(info.dragNode)
		let dragNodeDetail = info.dragNode.props.detail;//拖动节点
		let dropNodeDetail = info.node.props.detail;//放置节点

		const dropKey = info.node.props.eventKey; //放置节点id
		const dragKey = info.dragNode.props.eventKey; //拖动节点id
		const dropPos = info.node.props.pos.split('-');

		//如果是父节点不能拖动到别人节点里面
		
		if(dragNodeDetail && dragNodeDetail.parentId<=0 && dragNodeDetail.subMenus.length>0 &&(dropPos.length>2 || !info.dropToGap)){
			message.warn('不能移动有子节点的节点！');
			return;
		}
		//限制不能拖动到子节点上
		if(!info.dropToGap && dropPos.length>2){
			return;
		}
		const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
		//参数
		let targetSeq,targetParentId,id=dragKey;
		if(dropPos.length===2 && !info.dropToGap){
			targetParentId = dropKey;
			targetSeq = dropNodeDetail.seq+1;
		} else if(dropPos.length>2){
			targetParentId = dropNodeDetail.parentId;
			targetSeq = dropNodeDetail.seq+dropPosition;
		} else if(dropPos.length===2 && info.dropToGap){
			targetParentId = -1;
			targetSeq = dropNodeDetail.seq+dropPosition;
		}
		// console.log(dropPos.length,dropPosition,info.dropToGap,targetSeq,targetParentId,id)
		let params = { id, targetParentId, targetSeq };
		postAction('/bigdata/system/menu/move',params,0,1).then(res=>{
            if(res.success){
                message.success('移动成功！');
				this.getMenuLists();
            } else {
                message.error(res.obj);
            }
        })
	}

	//删除菜单
    deleteAction = () => {
		if(this.state.activeData){
			Modal.confirm({
				title: `确定删除${this.state.activeData.name}菜单吗?`,
				onOk:()=> {
					let data = {
						id: this.state.activeData.id
					}
					postAction('/bigdata/system/menu/delete',data,0,1).then(res=>{
						if(res.success){
							message.success('删除成功！');
							this.getMenuLists();
						} else {
							message.error(res.obj);
						}
					})
				},
				onCancel() {},
				okText:'确定',
				cancelText:'取消',
			});
		}
    }
	//删除和新增确定时保存角色信息
	saveAction = (values) => {
		let isEditor = this.state.isEditor;
		// let { name, seq, url } = values;
		let { name } = values
		// let data = {name, seq, url, sourceCode: 'pc',iconUrl:'test',iconSelectedUrl:'test'};
		let data={name}
		let reqUrl = '/bigdata/system/menu/save'; //新增时的角色保存接口
		
        if(isEditor){ //编辑角色时修改请求接口、添加角色id参数
            reqUrl = '/bigdata/system/menu/update';
			data.id = this.state.activeData.id
			data.level=(this.state.activeData.id).toString().length
		} 
		// else if(this.state.activeData && this.state.activeData.parentId<=0) {
		// 	data.parentId = this.state.activeData.id;
		// }
		
        postAction(reqUrl,data,0,1).then(res=>{
            if(res.success){
                message.success('保存成功！');
                this.setState({visible:false,isEditor:false},()=>{
					this.getMenuLists();
				});
            } else {
                message.error(res.obj);
            }
        })
	}
	render() {
		//递归菜单列表
		const loop = data => data.map((item) => {
			if (item.subMenus && item.subMenus.length) {
				return <TreeNode key={item.id} title={item.name} detail={item}>{loop(item.subMenus)}</TreeNode>;
			}
			return <TreeNode key={item.id} title={item.name} detail={item}/>;
		});
		return (
			<div style={{margin: "20px"}}>
				<Card
					title={<span style={{ color: '#1890FF', lineHeight: '34px' }}>菜单</span>}
					extra={<div>
						{/* <Button icon="plus" type="primary" disabled={this.state.activeData&&(this.state.activeData.id).toString().length===3} style={{ marginRight: 20 }} onClick={()=>{
							this.setState({visible:true,isEditor:false})
						}}>添加菜单</Button> */}
						<Icon type="form" style={this.state.activeData?iconActiveStyle:iconStyle} onClick={()=>{
							if(this.state.activeData){
								this.setState({visible:true,isEditor:true})
							}
						}} />
						{/* <Icon type="delete" style={this.state.activeData?iconActiveStyle:iconStyle} onClick={this.deleteAction} /> */}
					</div>}
				>
					<Tree
						onSelect={this.onSelect}
						selectedKeys={this.state.selectedKeys}
						defaultExpandedKeys={this.state.expandedKeys}
						draggable
						onDragEnter={this.onDragEnter}
						onDrop={this.onDrop}
					>
						{loop(this.state.menuLists)}
					</Tree>
				</Card>
				{this.state.visible?(
                    <AddOrEditRoleModel
                        title={this.state.isEditor?'编辑菜单':'新建菜单'}
						visible={this.state.visible}
						isEditor={this.state.isEditor}
                        onOk={this.saveAction}
                        activeData={this.state.activeData}
                        onCancel={()=>this.setState({visible:false,isEditor:false})}
                    />
                ):null}
			</div>
		)
	}
}

export default Menu;
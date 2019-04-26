import React, { Component } from 'react'
import './index.less'
import { Form,Input,Card,Button } from 'antd'
// 预定义key对应的展示名称
const propDict={  
  label:'标签',
  width:'宽度',
  name:'占位符',
  collection:'数据集',
  dataSource:'字段'
}
const FormItem=Form.Item
class CustomProp extends Component {
  handleSave=()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data={
          ...this.props.editData,
          ...values
        }
        this.props.handleEdit(data)
      }
    });
  }
  render() {
    const {getFieldDecorator}=this.props.form;
    let propArr=[];
    if(this.props.editData){
        for(let i in this.props.editData){
          if(i === 'sort' || i === 'unid' || i === 'type'){            
          }else{
            propArr.push({
              name:i,
              value:this.props.editData[i]
            })
          }          
        }
    }
    return (
      <Card title='组件属性配置' className='t-prop' extra={
        <React.Fragment>
          <Button type='primary' onClick={this.handleSave} style={{marginRight:5}}>保存</Button>
          <Button type='primary'>取消</Button>
        </React.Fragment>
      
      }>        
        {
          propArr.length>0?(
            <div className='t-prop-form'>
              <Form>
                {
                  propArr.map((item,index)=><FormItem label={propDict[item.name]} key={index}>
                    {
                      getFieldDecorator(item.name,{
                        initialValue:item.value
                      })(<Input></Input>)
                    }
                  </FormItem>)
                }
              </Form>
            </div>
          ):null
        }
       
      </Card>
    )
  }
}

export default Form.create()(CustomProp)

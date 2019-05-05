import React, { Component } from 'react'
import './index.less'
import { Form,Input,Card,Button,Radio,Select  } from 'antd'
const RadioGroup = Radio.Group;
const FormItem=Form.Item,Option = Select.Option;
// 预定义key对应的展示名称
const propDict={  
  label:'标签',
  width:'宽度',
  name:'占位符（填充位置标识）',
  collection:'数据集（数据库中的某张表）',
  dataSource:'字段（数据表中的某个字段）',
  configSource:'配置项'
}
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
          // 此处过滤不用配置的字段
          if(i === 'sort' || i === 'unid' || i === 'type'|| i === 'value'){            
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
          {/* <Button type='primary'>取消</Button> */}
        </React.Fragment>
      
      }>        
        {
          propArr.length>0?(
            <div className='t-prop-form'>
              <Form>
                {/* 根据组件类型生成不同的属性配置，表格单独配置 */}
                {
                  propArr.map((item,index)=>{
                    if(item.name === 'configSource'){
                      return (
                        <FormItem label={propDict[item.name]} key={index}>
                          {
                            getFieldDecorator(item.name,{
                              initialValue:item.value
                            })(<Select
                              mode="tags"
                              style={{ width: '100%' }}
                              placeholder="请输入配置项"
                            >
                            </Select>)
                          }
                        </FormItem>                        
                      )
                    }else{
                      if(item.name !=='isEdit'){
                        return (
                          <FormItem label={propDict[item.name]} key={index}>
                            {
                              getFieldDecorator(item.name,{
                                initialValue:item.value
                              })(<Input></Input>)
                            }
                          </FormItem>
                        )     
                      }else{
                        return null
                      }
                                       
                    }
                  }                  
                  )
                }                
                <FormItem label={'是否编辑'}>
                    {
                      getFieldDecorator('isEdit',{
                        initialValue:0
                      })(<RadioGroup>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>                       
                      </RadioGroup>)
                    }
                </FormItem>
              </Form>
            </div>
          ):null
        }
       
      </Card>
    )
  }
}

export default Form.create()(CustomProp)

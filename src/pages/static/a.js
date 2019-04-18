import React, { Component } from 'react'
import { Select } from 'antd'
const Option = Select.Option
const data = [
    {
        name: '2019年',
        value: 2019
    },
    {
        name: '2018年',
        value: 2018
    },
    {
        name: '2017年',
        value: 2017
    }
]
export default class C extends Component {
    state={
        year:'',
        data:[]
    }
    componentDidMount = () => {
        let defaultYear=data[0].value
        this.setState({
            data,
            year:defaultYear
        })
    }
    
    static getDerivedStateFromProps(props,state){
        return null
    }
    handleChangeYear=(value)=>{
        this.setState({
            year:value
        })
    }
    render() {
        return (
            <div>
                <Select onChange={this.handleChangeYear} value={this.state.year} style={{ width: 200 }}>
                    {
                        this.state.data.map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)
                    }
                </Select>
            </div>
        )
    }
}

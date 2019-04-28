import React, { Component } from 'react'
import { Checkbox } from 'antd'
import Hoc from '../hoc'
class BasicInput extends Component {
    onChange(e) {
    }
    render() {
        
        return (
            <Checkbox  onChange={this.onChange.bind(this)}>复选框</Checkbox>
        )
    }
}

export default Hoc(BasicInput)


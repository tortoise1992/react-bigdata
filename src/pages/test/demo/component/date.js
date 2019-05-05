import React, { Component } from 'react'
import { DatePicker } from 'antd'
import Hoc from '../hoc'
class BasicInput extends Component {
    onChange(date, dateString) {
        console.log(date, dateString);
    }
    render() {
        
        return (
            <DatePicker disabled  onChange={this.onChange.bind(this)}></DatePicker>
        )
    }
}

export default Hoc(BasicInput)

import React, { Component } from 'react'
import { Select } from 'antd'
const Option = Select.Option
const data = [
  {
    name: 2019,
    value: [
      {
        name: 'aa',
        value: 'aa'
      },
      {
        name: 'bb',
        value: 'bb'
      }
    ]
  },
  {
    name: 2018,
    value: [
      {
        name: 'cc',
        value: 'cc'
      },
      {
        name: 'dd',
        value: 'dd'
      }
    ]
  },
  {
    name: 2017,
    value: [
      {
        name: 'ee',
        value: 'ee'
      },
      {
        name: 'ff',
        value: 'ff'
      }
    ]
  },
]
export default class C extends Component {
  render() {
    return (
      <div>
        <Select style={{width:200}}>
            {
                data[0].value.map(item=><Option key={item.value} value={item.value}>{item.name}</Option>)
            }
        </Select>
      </div>
    )
  }
}

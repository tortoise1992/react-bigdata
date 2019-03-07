import React, { Component } from 'react'

export default class Detail extends Component {
  componentDidMount = () => {
    console.log(this.props.match.userId)
    alert(`传过来的参数是${this.props.match.params.userId}`)
  }  
  render() {
    return (
      <div>
        我是详情页
      </div>
    )
  }
}

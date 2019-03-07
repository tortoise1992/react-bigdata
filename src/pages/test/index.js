import React, { Component } from 'react'

export default class Test extends Component {
  render() {
    return (
      <div>
        <iframe src={'./test.html'} style={{width:1200,height:600,border:'1px solid #09f'}} title='test'></iframe>
      </div>
    )
  }
}

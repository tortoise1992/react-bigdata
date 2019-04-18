import React, { Component } from 'react'
import { Card,Row,Col } from 'antd'
import A from './a'
import B from './b'
import C from './c'
export default class Comp extends Component {
  render() {
    return (
      <div style={{padding:'20px'}}>
        <Card title='静态方法'>
            <Row>
                <Col span={6}>
                    条件1
                    <A></A>
                </Col>
                <Col span={6}>
                    条件2
                    <B></B>
                </Col>
                <Col span={12}>
                    内容区域
                    <C></C>
                </Col>
            </Row>
        </Card>
      </div>
    )
  }
}

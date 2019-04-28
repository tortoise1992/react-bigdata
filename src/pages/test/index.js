import React from 'react';
import {Card } from 'antd';
import { DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DemoPage from './demo'
class DragSortingTable extends React.Component {
  
  render() {
    return (
      <div style={{padding:20}}>

        
      <Card title='容器拖拽'> 
          <DemoPage></DemoPage>
      </Card>
      
      </div>
      
      
    );
  }
}

const Demo = DragDropContext(HTML5Backend)(DragSortingTable);

export default Demo

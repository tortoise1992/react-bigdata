import React, { Component } from 'react'
import { DropTarget} from 'react-dnd';
const rowTarget = {
    // drop返回的对象可以在drap里面拿到
    drop(props, monitor) {
      return {
          name:'左侧容器'
      }
    },
  };
class Container extends Component {

  render() {
        const {connectDropTarget}=this.props
        return connectDropTarget(<div className='t-container'>
            11111
            
        </div>)          
  }
}

export default DropTarget(
    'row',
    rowTarget,
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }),
  )(Container)

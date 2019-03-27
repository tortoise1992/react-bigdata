import React,{useState,Fragment} from 'react'
import {Button} from 'antd'
export default function A(props){
    const [text,setText]=useState('hello world')
    return(
        <Fragment>
            {text}
            {/* click事件里面如果不是回调函数的形式会报无限循环的错误 */}
            {/* <Button onClick={setText('我被修改成功了')} type='primary' style={{marginLeft:20}}>修改一下文字</Button> */}
            <Button onClick={()=>{setText('我被修改成功了')}} type='primary' style={{marginLeft:20}}>修改一下文字</Button>
        </Fragment>        
    )
}
import React from 'react'
import {Card} from 'antd'
import A from './useState'
import B from './useEffect'
export default function Hooks(props){
    return(
        <div style={{padding:'20px'}}>
            <Card title='useState'>
                <A></A>
            </Card>
            <Card title='useEffect' style={{marginTop:10}}>
                <B></B>
            </Card>
        </div>        
    )
}
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import {HashRouter as Router} from 'react-router-dom';
import './index.less';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import 'moment/locale/zh-cn';

import RouterPage from './router'
import {DragDropContext} from 'react-dnd'

import HTML5Backend from 'react-dnd-html5-backend'
class App extends React.Component {
    render(){
        return (<LocaleProvider locale={zhCN}>
            <Provider store={store}>
                <Router>
                    <RouterPage />
                </Router>
            </Provider>
        </LocaleProvider>);
    }
} 

const render = Component =>{
    ReactDOM.render(
        <Component/>,
        document.getElementById('root')
    );
}

if (module.hot) {
    module.hot.accept(() => {
        render(App);
    })
}

render(DragDropContext(HTML5Backend)(App));
import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {Provider} from "mobx-react";

import Board from './Board';
import Profile from './Profile';
import Home from './Home';

import Stores from './Stores';

import './App.scss';

const App = () => (
    <Provider stores={Stores}>
        <BrowserRouter>
            <header className='app-header'>
                <ul className='menu-bar'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/board'>게시판</Link></li>
                    <li><Link to='/profile'>프로필</Link></li>
                </ul>
            </header>
            <section className='app-body'>
                <Route path='/' exact component={Home}/>
                <Route path='/board/:command?/:postId?' exact component={Board}/>
                <Route path='/profile/:command?' exact component={Profile}/>
            </section>
        </BrowserRouter>
    </Provider>
);

export default App;

import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom';

import BoardList from './BoardList';
import './Board.scss';
import PostView from "./PostView";
import PostAdd from "./PostAdd";

@inject('stores')
@observer
class Board extends Component {
    componentDidMount() {
        console.log(this.props);
        this.props.stores.PostStore.fetchItems();
    }

    render() {
        if (this.props.match && this.props.match.params.command === 'view')
            return <PostView postId={this.props.match.params.postId}/>;
        if (this.props.match && this.props.match.params.command === 'add')
            return <PostAdd />;
        if (this.props.match && this.props.match.params.command === 'edit')
            return <PostAdd postId={this.props.match.params.postId} />;

        let post = this.props.stores.PostStore;
        let profile = this.props.stores.ProfileStore;

        return (
            <div className='board'>
                {post.items && <BoardList items={post.items} />}
                {profile.item && <Link to='/board/add'><button>추가</button></Link>}
            </div>
        );
    }
}

export default Board;
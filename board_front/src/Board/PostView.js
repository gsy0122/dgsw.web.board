import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";

@inject('stores')
@observer
class PostView extends Component {
    state = {
        goToList: false,
        goToEdit: false,
    };
    componentDidMount() {
        this.props.stores.PostStore.fetchItem(this.props.postId);
    }
    render() {
        if (this.state.goToList) return <Redirect to='/board' />;
        if (this.state.goToEdit) return <Redirect to={`/board/edit/${this.props.postId}`} />;

        let post = this.props.stores.PostStore;
        let profile = this.props.stores.ProfileStore;
        console.log(post.item);
        if (! post.item) return <div/>;
        return (
            <div className='board board-view-item'>
                <div>제목 {post.item.title}</div>
                <div>
                    내용
                    <div className='board-view-item-content'
                         dangerouslySetInnerHTML={{__html:post.item.content}} />
                </div>
                <div>작성 시간 {new Date(post.item.created).toLocaleString()}</div>
                <div>
                    <Link to='/board'><button>목록</button></Link>
                    {profile.userId === post.item.userId && <button onClick={this.deletePost}>삭제</button>}
                    {profile.userId === post.item.userId && <button onClick={this.editPost}>수정</button>}
                </div>
            </div>
        );
    }
    editPost = () => {
        this.setState({goToEdit: true});
    }
    deletePost = async () => {
        if (window.confirm('삭제하시겠습니까?') === false) return;
        let id = this.props.postId;
        if (await this.props.stores.PostStore.deletePost(id)) {
            await this.props.stores.PostStore.fetchItems();
            this.setState({goToList: true});
        }
    }
};

export default PostView;
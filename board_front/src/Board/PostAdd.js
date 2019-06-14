import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@inject('stores')
@observer
class PostAdd extends Component {
    state = {
        userId: this.props.stores.ProfileStore.userId,
        title: '',
        content: '',
        goToList: false,
        goToPost: false,
    };
    constructor(props) {
        super(props);
        if (this.props.postId && this.props.stores.PostStore.item) {
            this.state = {
                ...this.state,
                title: this.props.stores.PostStore.item.title,
                content: this.props.stores.PostStore.item.content,
                id: this.props.stores.PostStore.item.id,
            }
        }
    }
    render() {
        if (this.state.goToList) return <Redirect to='/board'/>;
        if (this.state.goToPost) return <Redirect to={`/board/view/${this.props.postId}`}/>;
        return (
            <div className='board board-add'>
                <div className='board-add-header'>
                    <div>제목</div>
                    <input value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <div>내용
                    <div><CKEditor editor={ClassicEditor} data={this.state.content} onChange={this.updateContent}/></div>
                </div>
                <button onClick={this.addNewPost}>작성</button>
            </div>
        );
    }
    addNewPost = async () => {
        if (this.props.postId && await this.props.stores.PostStore.editPost(this.state)) {
            if (! window.confirm('수정하시겠습니까?')) return;
            if (this.props.stores.PostStore.item.userId === this.props.stores.ProfileStore.userId) {
                await this.props.stores.PostStore.fetchItems();
                this.setState({
                    ...this.state,
                    goToPost: true
                });
            } else alert('권한이 없습니다.');
        } else if (await this.props.stores.PostStore.addNewPost(this.state)) {
            if (! window.confirm('추가하시겠습니까?')) return;
            if (this.props.stores.PostStore.item.userId === this.props.stores.ProfileStore.userId) {
                await this.props.stores.PostStore.fetchItems();
                this.setState({
                    ...this.state,
                    goToList: true
                });
            } else alert('권한이 없습니다.');
        }
    };
    updateTitle = event => {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    };
    updateContent = (event, editor) => {
        this.setState({
            ...this.state,
            content: editor.getData()
        });
    };
}

export default PostAdd;
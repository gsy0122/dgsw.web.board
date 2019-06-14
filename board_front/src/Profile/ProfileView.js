import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class ProfileView extends Component {
    state = {
        goToLogin: false,
        goToEdit: false,
    };
    componentDidMount() {
        this.props.stores.ProfileStore.fetchItem(this.props.stores.ProfileStore.userId);
    }
    render() {
        if (this.state.goToLogin) return <Redirect to='/profile' />;
        if (this.state.goToEdit) return <Redirect to='/profile/edit' />;
        let p = this.props.stores.ProfileStore;
        console.log(p.item);
        if (! p.item) return <div/>;
        return (
            <div className='profile profile-view'>
                <div>아이디 {p.item.account}</div>
                <div>이메일 {p.item.email}</div>
                <div>사용자 이름 {p.item.username}</div><br/>
                <div>
                    <button onClick={this.editProfile}>수정</button>
                    <button onClick={this.logout}>로그아웃</button>
                </div>
            </div>
        );
    }
    editProfile = () => {
        this.setState({
            goToEdit: true,
        });
    }
    logout = () => {
        this.props.stores.ProfileStore.logout();
        this.setState({
            goToLogin: true,
        });
    }
}

export default ProfileView;
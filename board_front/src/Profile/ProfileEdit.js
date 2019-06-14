import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class ProfileEdit extends Component {
    state = {
        id: '',
        account: '',
        password: '1234',
        email: '',
        username: '',
        goToView: false,
    };
    constructor(props) {
        super(props);
        if (this.props.stores.ProfileStore.item) {
            this.state = {
                ...this.state,
                id: this.props.stores.ProfileStore.userId,
                account: this.props.stores.ProfileStore.item.account,
                email: this.props.stores.ProfileStore.item.email,
                username: this.props.stores.ProfileStore.item.username,
            }
        }
    }
    render() {
        if (this.state.goToView) return <Redirect to='/profile/view' />
        return (
            <div className='profile profile-edit'>
                <div>아이디 <input value={this.state.account} name='account' onChange={this.updateValue}/></div>
                <div>이메일 <input value={this.state.email} name='email' onChange={this.updateValue}/></div>
                <div>사용자 이름 <input value={this.state.username} name='username' onChange={this.updateValue}/></div><br/>
                <div><button onClick={this.editProfile}>수정</button></div>
            </div>
        );
    }
    updateValue = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    editProfile = async () => {
        if (! window.confirm('수정하시겠습니까?')) return;
        await this.props.stores.ProfileStore.editProfile(this.state);
        this.setState({
            ...this.state,
            goToView: true
        });
    }
}

export default ProfileEdit;
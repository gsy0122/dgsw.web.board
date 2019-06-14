import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";

@inject('stores')
@observer
class ProfileLogin extends Component {
    state = {
        account: '',
        password: '',
        goToView: false,
    };
    render() {
        if (this.props.stores.ProfileStore.userId !== null) return <Redirect to='/profile/view' />;
        return (
            <div className='profile profile-login'>
                <div>아이디 <input onChange={this.updateAccount}/></div>
                <div>비밀번호 <input type='password' onChange={this.updatePassword}/></div><br/>
                <div><button onClick={this.login}>로그인</button></div>
            </div>
        );
    }
    updateAccount = event => {
        this.setState({
            ...this.state,
            account: event.target.value
        });
    };
    updatePassword = (event, editor) => {
        this.setState({
            ...this.state,
            password: event.target.value
        })
    }
    login = async () => {
        await this.props.stores.ProfileStore.login(this.state.account, this.state.password);
        console.log(this.props.stores.ProfileStore.userId);
        if (this.props.stores.ProfileStore.userId !== null) {
            this.setState({
                ...this.state,
                goToView: true
            });
        } else {
            alert('존재하지 않는 사용자입니다.');
            return;
        }
    }
}

export default ProfileLogin;
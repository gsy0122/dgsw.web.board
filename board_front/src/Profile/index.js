import React, {Component} from 'react';

import ProfileView from "./ProfileView";
import ProfileLogin from "./ProfileLogin";
import ProfileEdit from "./ProfileEdit";

import './Profile.scss';

class Profile extends Component {
    render() {
        if (this.props.match && this.props.match.params.command === 'view')
            return <ProfileView />;
        if (this.props.match && this.props.match.params.command === 'edit')
            return <ProfileEdit />;
        return (
            <ProfileLogin />
        );
    }
}

export default Profile;
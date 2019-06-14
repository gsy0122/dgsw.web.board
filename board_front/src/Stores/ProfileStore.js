import {observable, action} from "mobx";
import axios from 'axios';

class ProfileStore {
    static __instance = null;
    static getInstance() {
        if (ProfileStore.__instance === null) {
            ProfileStore.__instance = new ProfileStore();
        }
        return ProfileStore.__instance;
    }
    constructor() {
        ProfileStore.__instance = this;
    }

    @observable item = null;
    @action fetchItem = async (id) => {
        try {
            this.item = null;
            let response = await axios({
                url: 'http://localhost:8080/api/user/id?id=' + id,
                method: 'get',
                headers : {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000
            });
            console.log(response);
            if (response.status === 200) {
                this.item = response.data;
            }
        } catch (e) {
            alert(e.toLocaleString());
        }
    }

    @observable userId = null;
    @action login = async (account, password) => {
        try {
            this.userId = null;
            let response = await axios({
                url: 'http://localhost:8080/api/user/login',
                method: 'post',
                headers : {
                    'Content-type': 'application/json; charset=utf-8'
                },
                data: {
                    account, password,
                },
                timeout: 3000
            });
            console.log(response);
            if (response.status === 200 && response.data !== "") {
                this.userId = response.data;
            }
        } catch (e) {
            alert(e.toLocaleString());
        }
    }

    @action logout = () => {
        this.userId = null;
        this.item = null;
    }

    @action editProfile = async (user) => {
        console.log(user);
        try {
            let response = await axios({
                url: `http://localhost:8080/api/user`,
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
                data: JSON.stringify(user)
            });
            return (response.status === 200);
        } catch(e) {
            alert(e.toLocaleString());
            return false;
        }
    };
};

export default ProfileStore.getInstance();
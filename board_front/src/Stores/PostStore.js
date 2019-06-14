import {observable, action} from "mobx";
import axios from 'axios';

class PostStore {
    static __instance = null;
    static getInstance() {
        if (PostStore.__instance === null) {
            PostStore.__instance = new PostStore();
        }
        return PostStore.__instance;
    }
    constructor() {
        PostStore.__instance = this;
    }
    @observable post_time = null;
    @action getTime = async () => this.current_time = await new Date().getTime();

    @observable items = null;
    @action fetchItems = async () => {
        try {
            this.items = null;
            let response = await axios({
                url: 'http://localhost:8080/api/post',
                method: 'get',
                headers : {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
            });
            console.log(response);
            if (response.status === 200) {
                this.items = response.data;
            }
        } catch (e) {
            alert(e.toLocaleString());
        }
    }

    @observable item = null;
    @action fetchItem = async (id) => {
        try {
            this.item = null;
            let response = await axios({
                url: 'http://localhost:8080/api/post/id?id=' + id,
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

    @action addNewPost = async (post) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/api/post`,
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(post)
            });
            return (response.status === 200);
        } catch(e) {
            alert(e.toLocaleString());
            return false;
        }
    };

    @action deletePost = async (postId) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/post?id=' + postId,
                method: 'delete',
                timeout: 3000
            });
            return (response.status === 200);
        } catch (e) {
            alert(e.toLocaleString());
            return false;
        }
    }

    @action editPost = async (post) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/api/post`,
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
                data: JSON.stringify(post)
            });
            return (response.status === 200);
        } catch(e) {
            alert(e.toLocaleString());
            return false;
        }
    };
}

export default PostStore.getInstance();
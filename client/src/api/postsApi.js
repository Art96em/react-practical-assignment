const URL = 'http://localhost:8080'

class PostsApi {

    async addPost(title, username) {
        const body = {
            title, username
        }
        const response = await fetch(`${URL}/post`, {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        return data
    }

    async getPosts() {
        const response = await fetch(`${URL}/post`, {
            method: "GET"
        })
        const data = await response.json();
        console.log(data);
        return data;
    }

    async getPagePosts(pageNumber) {
        const response = await fetch(`${URL}/post/page/${pageNumber}`, {
            method: "GET"
        })
        const data = await response.json();
        console.log(data);
        return data;
    }

    async editPost(id, post) {
        const response = await fetch(`${URL}/post/${id}`, {
            body: JSON.stringify(post),
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        console.log(data);
        return data;
    }
}

export default PostsApi
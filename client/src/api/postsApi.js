const URL = 'http://localhost:8080'

class PostsApi {

    async addPost(post) {
        console.log(post);
        const response = await fetch(`${URL}/post`, {
            body: JSON.stringify(post),
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
        return data;
    }

    async editPost(post) {
        const response = await fetch(`${URL}/post/${post.id}`, {
            body: JSON.stringify(post),
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        return data;
    }

    async searchPosts(filter) {
        const response = await fetch(`${URL}/post/search/${filter}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        return data;
    }

    async deletePost(id) {
        const response = await fetch(`${URL}/post/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        return data;
    }
}

export default PostsApi
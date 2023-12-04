import { useDispatch } from "react-redux"
import { authActions } from "../redux/AuthSlice";
import { useSelectorAuth } from "../redux/store";
import { useEffect, useState } from "react";
import PostsApi from "../api/postsApi";
import Post from "../components/Post";
import Paginator from "../components/Paginator";

const Main = () => {

    const dispatch = useDispatch();
    const userData = useSelectorAuth();
    const [posts, setPosts] = useState([]);
    const postsApi = new PostsApi();

    useEffect(() => {
        // postsApi.addPost('new post', userData)
        postsApi.getPosts().then(data => {
            console.log(data);
            setPosts(data.result)
        });
    }, [])

    const likeHandleClick = async (post) => {
        const prevDislikes = post.dislikes;
        const prevLikes = post.likes;
        if (prevLikes.includes(userData)) {
            prevLikes.splice(prevLikes.indexOf(userData))
        } else {
            if (prevDislikes.includes(userData)) {
                prevDislikes.splice(prevDislikes.indexOf(userData))
            }
            prevLikes.push(userData)
        }
        const postUpdated = { ...post, likes: prevLikes };
        const result = await postsApi.editPost(post.id, postUpdated);
        return result;
    }

    const dislikeHandleClick = async (post) => {
        const prevDislikes = post.dislikes;
        const prevLikes = post.likes;
        if (prevDislikes.includes(userData)) {
            prevDislikes.splice(prevDislikes.indexOf(userData))
        } else {
            if (prevLikes.includes(userData)) {
                prevLikes.splice(prevLikes.indexOf(userData))
            }
            prevDislikes.push(userData)
        }
        const postUpdated = { ...post, dislikes: prevDislikes };
        const result = await postsApi.editPost(post.id, postUpdated);
        return result;
    }

    return <body>
        <header>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 header'>
                        <label>{userData}</label>
                        <button className="logout-btn" onClick={() => dispatch(authActions.reset())}>Logout</button>
                    </div>
                </div>
            </div>
        </header>
        <section>
            <div className="text-uppercase">
                <h1>Main page</h1>
            </div>
            <div className="container">
                <div className="row">
                    {posts.map((post, idx) => {
                        console.log(post);
                        return <Post post={post} likeHandleClick={likeHandleClick} dislikeHandleClick={dislikeHandleClick} key={idx}></Post>
                    })}
                </div>
            </div>
        </section>
        <section>
            <div className="addPost">
                <button></button>
            </div>
        </section>
        <footer>
            <div>
                <Paginator></Paginator>
            </div>
        </footer>
    </body >
}

export default Main
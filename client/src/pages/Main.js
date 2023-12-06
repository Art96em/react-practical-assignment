import { useDispatch } from "react-redux"
import { authActions } from "../redux/AuthSlice";
import { useSelectorAuth } from "../redux/store";
import { useEffect, useState, memo, useCallback } from "react";
import PostsApi from "../api/postsApi";
import Post from "../components/Post";
import Pagination from "../components/Paginator";
import PostForm from "../components/PostForm";

const Main = () => {

    const dispatch = useDispatch();
    const userData = useSelectorAuth();
    const [posts, setPosts] = useState([]);
    const postsApi = new PostsApi();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [postFormOpened, setPostFormOpened] = useState(false)

    useEffect(() => {
        postsApi.getPagePosts(currentPage).then(data => {
            if (data.totalPages != totalPages) {
                console.log('total new');
                setTotalPages(data.totalPages);
            }
            setPosts(data.result)
        });
    }, [currentPage])

    const likeHandleClick = useCallback(async (post) => {
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
    }, [])

    const dislikeHandleClick = useCallback(async (post) => {
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
    }, [])

    const changePage = useCallback((pageNumber) => {
        if (pageNumber != currentPage) {
            setCurrentPage(pageNumber)
        }
    }, [setCurrentPage, currentPage])

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
                        return <Post post={post} likeHandleClick={likeHandleClick} dislikeHandleClick={dislikeHandleClick} key={idx}></Post>
                    })}
                </div>
            </div>
        </section>

        <section>
            <div className="test">
                <Pagination props={{ currentPage, totalPages, changePage }}></Pagination>
            </div>
        </section>

        <section>
            {postFormOpened && <PostForm onClose={() => setPostFormOpened(false)} />}
        </section>

        <footer>
            <div className="addPost" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                console.log('dialog');
                setPostFormOpened(true)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                    <g fill="none" fill-rule="evenodd">
                        <path d="M0 0h24v24H0z"></path>
                        <path d="M7 12L12 12M12 12L17 12M12 12L12 7M12 12L12 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="svg_1"></path>
                    </g>
                </svg>
            </div>
        </footer>
    </body >
}

export default Main
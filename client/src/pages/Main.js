import { useDispatch } from "react-redux"
import { authActions } from "../redux/AuthSlice";
import { useSelectorAuth } from "../redux/store";
import { useEffect, useState, memo, useCallback, useRef } from "react";
import PostsApi from "../api/postsApi";
import Post from "../components/Post";
import Pagination from "../components/Paginator";
import PostForm from "../components/PostForm";
import DeletePostForm from "../components/DeletePostForm";

const Main = () => {

    const postsApi = new PostsApi();

    const selectedPost = useRef(null);


    const dispatch = useDispatch();
    const username = useSelectorAuth();
    let debounce;

    const [filterText, setFilterText] = useState('')
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editPostFormOpened, setEditPostFormOpened] = useState(false)
    const [deletePostFormOpened, setDeletePostFormOpened] = useState(false)

    useEffect(() => {
        let response;
        if (!!filterText) {
            response = postsApi.searchPosts(filterText)
        } else {
            response = postsApi.getPagePosts(currentPage);
        }
        response.then(data => {
            if (data.totalPages != totalPages) {
                setTotalPages(data.totalPages);
            }
            setPosts(data.result);
        })
        return () => setPosts([])
    }, [currentPage, filterText])

    const likeHandleClick = useCallback(async (post) => {
        const prevDislikes = post.dislikes;
        const prevLikes = post.likes;
        if (prevLikes.includes(username)) {
            prevLikes.splice(prevLikes.indexOf(username))
        } else {
            if (prevDislikes.includes(username)) {
                prevDislikes.splice(prevDislikes.indexOf(username))
            }
            prevLikes.push(username)
        }
        const postUpdated = { ...post, likes: prevLikes };
        const result = await postsApi.editPost(post.id, postUpdated);
        return result;
    }, [])

    const dislikeHandleClick = useCallback(async (post) => {
        const prevDislikes = post.dislikes;
        const prevLikes = post.likes;
        if (prevDislikes.includes(username)) {
            prevDislikes.splice(prevDislikes.indexOf(username))
        } else {
            if (prevLikes.includes(username)) {
                prevLikes.splice(prevLikes.indexOf(username))
            }
            prevDislikes.push(username)
        }
        const postUpdated = { ...post, dislikes: prevDislikes };
        const result = await postsApi.editPost(post.id, postUpdated);
        return result;
    }, [])

    const editPostHandleOpen = (post) => {
        selectedPost.current = post;
        setEditPostFormOpened(true)
    }

    const newPostHandleClick = () => {
        setEditPostFormOpened(true)
    }

    const postCloseHandleClick = () => {
        selectedPost.current = null;
        setEditPostFormOpened(false)
    }

    const deletePostHandleOpen = (post) => {
        selectedPost.current = post;
        setDeletePostFormOpened(true)
    }

    const deletePostHandleClose = () => {
        selectedPost.current = null;
        setDeletePostFormOpened(false)
    }

    const postConfirmHandle = async (title, image) => {
        let response;
        if (selectedPost.current != null) {
            response = await postsApi.editPost({ ...selectedPost.current, title, image });
        } else {
            response = await postsApi.addPost({ title, image, username })
        }
        if (response.success) {
            if (selectedPost.current != null) {
                const newPosts = posts.map(post => post.id == selectedPost.current.id ? response.result : post)
                setPosts(newPosts)
            }
            postCloseHandleClick();
            // закинуть информацию popup об успехе
        } else {
            // закинуть информацию popup об неудаче с причиной
        }
    }

    const deletePostConfirmHandle = async () => {
        const response = await postsApi.deletePost(selectedPost.current.id)
        if (response.success) {
            const newPosts = posts.filter(post => post.id != selectedPost.current.id)
            setPosts(newPosts)
            deletePostHandleClose()
            // закинуть информацию popup об успехе
        } else {
            // закинуть информацию popup об неудаче с причиной
        }
    }

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
                        <label>{username}</label>
                        <button className="logout-btn" onClick={() => dispatch(authActions.reset())}>Logout</button>
                    </div>
                </div>
            </div>
        </header>

        <section>
            <div className="container">
                <div className="row py-1 my-1 search">
                    <input className="mx-2" placeholder="Search posts" onChange={(e) => {
                        if (debounce != null) {
                            clearTimeout(debounce)
                        }
                        debounce = setTimeout(() => setFilterText(e.target.value), 500)
                    }} />
                </div>
            </div>
        </section>

        <section>
            <div className="container">
                <div className="row">
                    {posts.map((post, idx) => <Post post={post} likeHandleClick={likeHandleClick} dislikeHandleClick={dislikeHandleClick} editPostHandleClick={editPostHandleOpen} deletePostHandleClick={deletePostHandleOpen} key={idx} />)}
                </div>
            </div>
        </section>

        <section>
            <div className="test">
                {totalPages && <Pagination props={{ currentPage, totalPages, changePage }} />}
            </div>
        </section>

        <section>
            {editPostFormOpened && <PostForm closeModalHandle={postCloseHandleClick} postConfirmHandle={postConfirmHandle} post={selectedPost} />}
            {deletePostFormOpened && <DeletePostForm closeModalHandle={deletePostHandleClose} deletePostConfirmHandle={deletePostConfirmHandle} />}
        </section>

        <footer>
            {!editPostFormOpened && <div className="addPost" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={newPostHandleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                    <g fill="none" fill-rule="evenodd">
                        <path d="M0 0h24v24H0z"></path>
                        <path d="M7 12L12 12M12 12L17 12M12 12L12 7M12 12L12 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="svg_1"></path>
                    </g>
                </svg>
            </div>}
        </footer>
    </body >
}

export default Main
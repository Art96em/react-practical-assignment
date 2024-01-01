import { useDispatch } from "react-redux"
import { authActions } from "../../redux/AuthSlice";
import { paginationActions } from "../../redux/PaginationSlice";
import { useSelectorAuth, useSelectorPaginatorCurrent, useSelectorPaginatorTotal } from "../../redux/store";
import { useEffect, useState, memo, useCallback, useRef } from "react";
import PostsApi from "../../api/postsApi";
import Post from "../forms/Post";
import Pagination from "../forms/Paginator";
import PostForm from "../forms/PostForm";
import DeletePostForm from "../forms/DeletePostForm";
import { LogoutIcon, PlusIcon } from "../icons/icons";

const Main = () => {

    const postsApi = new PostsApi();

    const selectedPost = useRef(null);

    const dispatch = useDispatch();
    const username = useSelectorAuth();
    const currentPage = useSelectorPaginatorCurrent();
    const totalPages = useSelectorPaginatorTotal();

    let debounce;

    const [filterText, setFilterText] = useState('')
    const [posts, setPosts] = useState([]);
    const [editPostFormOpened, setEditPostFormOpened] = useState(false)
    const [deletePostFormOpened, setDeletePostFormOpened] = useState(false)

    useEffect(() => {
        let response = !!filterText ? postsApi.searchPosts(filterText) : postsApi.getPagePosts(currentPage);
        response.then(data => {
            if (data.totalPages != totalPages) {
                dispatch(paginationActions.setTotalPages(!!data.totalPages ? +data.totalPages : 1))
            }
            setPosts(data.result);
        })
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
        const result = await postsApi.editPost(postUpdated);
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
        const result = await postsApi.editPost(postUpdated);
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

    const postConfirmHandle = async (title, imageSrc) => {
        let response = selectedPost.current != null ? await postsApi.editPost({ ...selectedPost.current, title }) : await postsApi.addPost({ title, username });
        if (response.success) {
            if (imageSrc && selectedPost.current?.imageSrc != imageSrc) {
                const postId = response.result.id;
                response = await postsApi.addImage(postId, imageSrc);
            }
            setPosts(prevPosts => {
                let res;
                if (selectedPost.current != null) {
                    res = prevPosts.map(post => post.id == selectedPost.current.id ? { ...response.result, comments: post.comments } : post);
                } else {
                    prevPosts.push({ ...response.result, comments: [] })
                    res = prevPosts.slice();
                }
                return res;
            })
            if (posts.length > 9) {
                dispatch(paginationActions.setCurrentPage(currentPage + 1))
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
            deletePostHandleClose()
            let postsLength;
            setPosts(prevPosts => {
                const newPosts = prevPosts.filter(post => post.id != response.result.id)
                postsLength = newPosts.length;
                return newPosts
            })
            if (!!!postsLength) {
                dispatch(paginationActions.setCurrentPage(currentPage + 1))
            }
            // закинуть информацию popup об успехе
        } else {
            // закинуть информацию popup об неудаче с причиной
        }
    }

    return <div>
        <header>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 header'>
                        <label>{username}</label>
                        <button className="logout-btn" onClick={() => dispatch(authActions.reset())}>Logout <LogoutIcon /></button>
                    </div>
                </div>
            </div>
        </header>

        <section>
            <div className="container">
                <div className="row p-1 search">
                    <input className="rounded" placeholder="Search posts" onChange={(e) => {
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
                <div className="row posts">
                    {posts.map((post, idx) => <Post post={post} likeHandleClick={likeHandleClick} dislikeHandleClick={dislikeHandleClick} editPostHandleClick={editPostHandleOpen} deletePostHandleClick={deletePostHandleOpen} key={post.id} />)}
                </div>
                <div className="row mp">
                    {totalPages && <Pagination />}
                </div>
            </div>
        </section>

        <section>
            {editPostFormOpened && <PostForm closeModalHandle={postCloseHandleClick} postConfirmHandle={postConfirmHandle} post={selectedPost} />}
            {deletePostFormOpened && <DeletePostForm closeModalHandle={deletePostHandleClose} deletePostConfirmHandle={deletePostConfirmHandle} />}
        </section>

        <footer>
            {!editPostFormOpened && <div className="addPost" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={newPostHandleClick}>
                <PlusIcon color="white" />
            </div>}
            <div class="toast-container position-absolute top-0 end-0 p-3">
                <div className="toast align-items-center show text-white bg-primary border-0 position-fixed bottom-0 start-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            Some text inside the toast body
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="d-flex">
                        <div className="toast-body">
                            Some text inside the toast body
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>

        </footer>


    </div >
}

export default Main